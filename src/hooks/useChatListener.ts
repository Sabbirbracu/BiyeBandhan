"use client";

import { getEchoInstance } from "@/lib/echo";
import { ChatItem, Message } from "@/types";
import { useEffect } from "react";

interface UseChatListenerProps {
  currentUserId: number | null;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setChats: React.Dispatch<React.SetStateAction<ChatItem[]>>;
}

export const useChatListener = ({
  currentUserId,
  setMessages,
  setChats,
}: UseChatListenerProps) => {
  useEffect(() => {
    if (!currentUserId) {
      console.warn("⚠️ No currentUserId provided, skipping chat listener.");
      return;
    }

    const echo = getEchoInstance();

    // Backend channel definition: chat.{id}
    const channelName = `chat.${currentUserId}`;
    console.log(`%c🔔 Attempting to subscribe to private channel: ${channelName}`, "color: purple; font-weight: bold;");

    // Subscribe to private channel
    const channel = echo.private(channelName);

    // --- DEBUG: Listen for subscription success/failure ---
    channel.subscribed(() => {
      console.log(`✅ Successfully subscribed to channel: ${channelName}`);
    });

    channel.error((error: any) => {
      console.error(`❌ Channel subscription error on ${channelName}:`, error);
    });

    // Listen for incoming messages
    channel.listen(".message.sent", (payload: any) => {
  try {
    console.log("%c💬 Incoming message received:", "color: green; font-weight: bold;", payload);

    const newMsg: Message = {
      sender: payload.sender_id === currentUserId ? "me" : "them",
      text: payload.message,
      time: new Date(payload.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);

    setChats((prev) =>
      prev.map((chat) =>
        chat.userId === payload.sender_id || chat.userId === payload.receiver_id
          ? { ...chat, lastMsg: payload.message }
          : chat
      )
    );
  } catch (err) {
    console.error("Error processing incoming message:", err, payload);
  }
});


    // --- Debug Echo connection states ---
    const pusherConn = echo.connector.pusher.connection;

    pusherConn.bind("state_change", (states: any) => {
      console.log("🔄 Echo connection state changed:", states);
    });

    pusherConn.bind("connected", () => {
      console.log("%c✅ Echo connected successfully!", "color: green; font-weight: bold;");
      console.log("Socket ID:", echo.socketId());
    });

    pusherConn.bind("error", (err: any) => {
      console.error("%c❌ Echo connection error:", "color: red;", err);
    });

    pusherConn.bind("disconnected", () => {
      console.warn("⚠️ Echo disconnected from server.");
    });

    pusherConn.bind("failed", () => {
      console.error("❌ Echo connection failed completely.");
    });

    pusherConn.bind("unavailable", () => {
      console.warn("⚠️ Echo is temporarily unavailable.");
    });

    // Cleanup on unmount
    return () => {
      channel.stopListening("message.sent");
      console.log(`%c❌ Unsubscribed from channel: ${channelName}`, "color: orange; font-weight: bold;");
    };
  }, [currentUserId, setMessages, setChats]);
};