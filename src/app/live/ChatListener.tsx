"use client";

import useReverbListener from "@/lib/reverb-listener";

interface ChatListenerProps {
  chatId: string;
  onMessageReceived: (message: any) => void;
}

export default function ChatListener({ chatId, onMessageReceived }: ChatListenerProps) {
  useReverbListener(
    chatId ? `chat.${chatId}` : "",
    "message.sent",
    (e: any) => {
      console.log("📩 New message received:", e);
      onMessageReceived(e.message);
    }
  );

  return null; // no UI
}
