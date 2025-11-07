"use client";

import ChatList from "@/components/ui/Message/ChatList";
// import ChatWindow from "@/components/ui/Message/ChatWindow";
import { useEffect, useState } from "react";

// Message and ChatItem Types
interface Message {
  sender: "me" | "them";
  text: string;
  time: string;
}

interface ChatItem {
  id: number;
  name: string;
  lastMsg: string;
  image: string;
  status?: "online" | "offline";
  timeOrDate: string;
  isActive: boolean;
}

export default function MessagePage() {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const res = await fetch("/api/user/chat", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken || ""}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch chats");

        const rawData = await res.json();
        const chatArray = rawData?.data || [];

        // Map backend data to your ChatItem structure
        const formatted: ChatItem[] = chatArray.map((item: any, index: number) => ({
          id: item.id,
          name: item.other_user?.name || "Unknown",
          lastMsg: item.last_message || "No messages yet",
          image:
            item.other_user?.avatar ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png",
          status: "offline", // optional, can be updated dynamically later
          timeOrDate: item.last_message_at
            ? new Date(item.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : "",
          isActive: index === 0, // first chat is active by default
        }));

        setChats(formatted);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const activeChat = chats.find((c) => c.isActive);

  // Placeholder messages for now; you can replace with actual chat messages fetching later
  const messages: Message[] = [
    { sender: "them", text: "Hey Sabbir, how have you been?", time: "10:00 AM" },
    { sender: "me", text: "Hey! I’m doing great, just busy with projects.", time: "10:02 AM" },
    { sender: "them", text: "That’s awesome! Let’s catch up soon.", time: "10:05 AM" },
    { sender: "me", text: "Sure! Looking forward to it.", time: "10:07 AM" },
  ];

  if (loading) return <div className="p-10 text-gray-500">Loading chats...</div>;

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
      {/* Chat List */}
      <div className="w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
        <ChatList chats={chats} />
      </div>

      {/* Chat Window */}
      {/* <div className="flex-1 bg-white">
        <ChatWindow
          chatId={activeChat?.id?.toString() || ""}
          messages={messages}
          activeUser={{
            name: activeChat?.name || "Select Chat",
            image: activeChat?.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
          }}
        />
      </div> */}
    </div>
  );
}