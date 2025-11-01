"use client";

import ChatList from "@/components/ui/Message/ChatList";
import ChatWindow from "@/components/ui/Message/ChatWindow";

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
  // Demo chats
  const chats: ChatItem[] = [
    { id: 1, name: "Ayesha Rahman", lastMsg: "M:101", image: "https://i.pravatar.cc/100?img=47", status: "online", timeOrDate: "Yesterday", isActive: true },
    { id: 2, name: "Nusrat Hossain", lastMsg: "M:10", image: "https://i.pravatar.cc/100?img=12", status: "offline", timeOrDate: "19:39 PM", isActive: false },
    { id: 3, name: "Farhana Karim", lastMsg: "00 AU, 2012", image: "https://i.pravatar.cc/100?img=33", status: "online", timeOrDate: "19:32 PM", isActive: false },
    { id: 4, name: "Ahmed Khan", lastMsg: "M:12", image: "https://i.pravatar.cc/100?img=3", status: "offline", timeOrDate: "19:38 PM", isActive: false },
  ];

  const messages: Message[] = [
    { sender: "them", text: "Hey Sabbir, how have you been?", time: "10:00 AM" },
    { sender: "me", text: "Hey! I’m doing great, just busy with projects.", time: "10:02 AM" },
    { sender: "them", text: "That’s awesome! Let’s catch up soon.", time: "10:05 AM" },
    { sender: "me", text: "Sure! Looking forward to it.", time: "10:07 AM" },
  ];

  const activeChat = chats.find((c) => c.isActive);

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
      {/* Chat List */}
      <div className="w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
        <ChatList chats={chats} />
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white">
        <ChatWindow
          messages={messages}
          activeUser={{
            name: activeChat?.name || "Select Chat",
            image: activeChat?.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
          }}
        />
      </div>
    </div>
  );
}
