"use client";

import { useEffect, useState } from "react";
import { getEchoInstance } from "@/lib/echo";

interface ChatMessage {
  id: number;
  sender: { id: number; name: string };
  receiver: { id: number; name: string };
  content: string;
  created_at: string;
}

export const useChat = (receiverId: number) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let channel: any = null; // store the channel for cleanup

    const subscribe = async () => {
      try {
        const echoInstance = await getEchoInstance(); // await the promise

        // Subscribe to the private chat channel
        channel = echoInstance.private(`chat.${receiverId}`);

        // Listen to the broadcasted 'message.sent' event
        channel.listen(".message.sent", (message: ChatMessage) => {
          setMessages((prev) => [...prev, message]);
        });

      } catch (err: any) {
        console.error("Echo subscription error:", err);
        setError(err.message || "Failed to connect to chat");
      }
    };

    subscribe();

    // Cleanup: unsubscribe when component unmounts
    return () => {
      if (channel) {
        channel.stopListening(".message.sent");
        channel.unsubscribe();
      }
    };
  }, [receiverId]);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  return { messages, addMessage, error };
};
