"use client";

import { getEchoInstance } from "@/lib/echo";
import { ChatItem, Message } from "@/types";
import { useEffect } from "react";

interface UseChatListenerProps {
  currentUserId: number | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setChats: React.Dispatch<React.SetStateAction<ChatItem[]>>;
  pendingMessages?: Set<string>;
  setPendingMessages?: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const useChatListener = ({
  currentUserId,
  setMessages,
  setChats,
  pendingMessages = new Set(),
  setPendingMessages
}: UseChatListenerProps) => {
  useEffect(() => {
    if (!currentUserId) {
      console.warn("⚠️ No currentUserId provided, skipping chat listener.");
      return;
    }

    const echo = getEchoInstance();

    const channelName = `chat.${currentUserId}`;
    console.log(`%c🔔 Attempting to subscribe to private channel: ${channelName}`, "color: purple; font-weight: bold;");

    const channel = echo.private(channelName);

    // --- DEBUG: Listen for subscription success/failure ---
    channel.subscribed(() => {
      console.log(`%c✅ Successfully subscribed to channel: ${channelName}`, "color: green; font-weight: bold;");
    });

    channel.error((error: any) => {
      console.error(`%c❌ Channel subscription error on ${channelName}:`, "color: red;", error);
    });

    // --- Enhanced Echo connection debugging (FROM OLD VERSION) ---
    const pusherConn = echo.connector.pusher.connection;

    const connectionStates = {
      "connected": "✅ Connected",
      "disconnected": "⚠️ Disconnected", 
      "failed": "❌ Failed",
      "connecting": "🔄 Connecting",
      "unavailable": "🔴 Unavailable"
    };

    pusherConn.bind("state_change", (states: any) => {
      console.log("%c🔄 Echo connection state changed:", "color: blue;", {
        previous: connectionStates[states.previous as keyof typeof connectionStates] || states.previous,
        current: connectionStates[states.current as keyof typeof connectionStates] || states.current
      });
    });

    pusherConn.bind("connected", () => {
      console.log("%c✅ Echo connected successfully!", "color: green; font-weight: bold;");
      console.log("Socket ID:", echo.socketId());
    });

    pusherConn.bind("error", (err: any) => {
      console.error("%c❌ Echo connection error:", "color: red;", err);
    });

    pusherConn.bind("disconnected", () => {
      console.warn("%c⚠️ Echo disconnected from server.", "color: orange;");
    });

    pusherConn.bind("failed", () => {
      console.error("❌ Echo connection failed completely.");
    });

    pusherConn.bind("unavailable", () => {
      console.warn("⚠️ Echo is temporarily unavailable.");
    });

    // Listen for incoming messages (NEW DEDUPLICATION LOGIC)
    channel.listen(".message.sent", (payload: any) => {
      try {
        console.log("%c💬 Incoming message received:", "color: green; font-weight: bold;", payload);

        const messageId = payload.id?.toString();
        const messageText = payload.message;
        
        // Check if this is a duplicate of an optimistic message
        const isDuplicate = Array.from(pendingMessages).some(tempId => {
          // Simple content-based deduplication
          const isSameContent = messageText === payload.message;
          const isRecent = Math.abs(Date.now() - parseInt(tempId.split('-')[0])) < 5000; // Within 5 seconds
          
          console.log("%c🔍 Duplicate check:", "color: gray;", {
            isSameContent,
            isRecent,
            tempId,
            messageText,
            payloadMessage: payload.message
          });
          
          return isSameContent && isRecent;
        });

        if (isDuplicate) {
          console.log("%c🔄 Skipping duplicate real-time message (already optimistic)", "color: orange;");
          
          // Remove from pending set
          if (setPendingMessages) {
            setPendingMessages(prev => {
              const newSet = new Set(prev);
              // Find and remove the matching tempId
              Array.from(prev).forEach(tempId => {
                if (Math.abs(Date.now() - parseInt(tempId.split('-')[0])) < 5000) {
                  newSet.delete(tempId);
                }
              });
              return newSet;
            });
          }
          return;
        }

        const newMsg: Message = {
          sender: payload.sender_id === currentUserId ? "me" : "them",
          text: payload.message,
          time: new Date(payload.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        console.log("%c📨 Adding real-time message to UI:", "color: lightgreen;", newMsg);

        setMessages((prev) => [...prev, newMsg]);

        setChats((prev) =>
          prev.map((chat) =>
            chat.userId === payload.sender_id || chat.userId === payload.receiver_id
              ? { 
                  ...chat, 
                  lastMsg: payload.message,
                  updated_at: new Date().toISOString()
                }
              : chat
          )
        );
      } catch (err) {
        console.error("Error processing incoming message:", err, payload);
      }
    });

    // Cleanup on unmount
    return () => {
      console.log(`%c🧹 Cleaning up chat listener for channel: ${channelName}`, "color: gray;");
      if (channel) {
        channel.stopListening(".message.sent");
        echo.leave(channelName);
      }
    };
  }, [currentUserId, setMessages, setChats, pendingMessages, setPendingMessages]);
};