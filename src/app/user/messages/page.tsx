// "use client";

// import ChatList from "@/components/ui/Message/ChatList";
// import ChatWindow, { Message } from "@/components/ui/Message/ChatWindow";
// import { useEffect, useState } from "react";
// import { useChatListener } from "@/hooks/useChatListener";

// interface ChatItem {
//   id: number;
//   name: string;
//   lastMsg: string;
//   image: string;
//   timeOrDate: string;
//   isActive: boolean;
//   userId: number;
// }

// export default function MessagePage() {
//   const [chats, setChats] = useState<ChatItem[]>([]);
//   const [activeChatId, setActiveChatId] = useState<number | null>(null);
//   const [currentUserId, setCurrentUserId] = useState<number | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch conversations
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const res = await fetch("/api/user/chat/conversation", {
//           credentials: "include",
//           cache: "no-store",
//         });
//         if (!res.ok) return;

//         const data = await res.json();
//         if (!Array.isArray(data)) return;

//         const apiCurrentUserId = data[0]?.current_user_id;
//         if (apiCurrentUserId) setCurrentUserId(apiCurrentUserId);

//         const formatted: ChatItem[] = data.map((conv: any, i: number) => ({
//           id: conv.id,
//           name: conv.other_user?.name || "Unknown User",
//           image:
//             conv.other_user?.profile_photo ||
//             "https://cdn-icons-png.flaticon.com/512/847/847969.png",
//           lastMsg: conv.last_message || "No messages yet",
//           timeOrDate: conv.updated_at
//             ? new Date(conv.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//             : "",
//           isActive: i === 0,
//           userId: conv.other_user?.id || 0,
//         }));

//         setChats(formatted);
//         if (formatted.length) setActiveChatId(formatted[0].id);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConversations();
//   }, []);

//   // Fetch messages for selected chat
//   useEffect(() => {
//     if (!activeChatId || !currentUserId) return;

//     const fetchMessages = async () => {
//       try {
//         const chat = chats.find(c => c.id === activeChatId);
//         if (!chat) return;

//         const res = await fetch(`/api/user/chat/messages/${chat.userId}`, {
//           credentials: "include",
//           cache: "no-store",
//         });
//         if (!res.ok) return;

//         const data = await res.json();
//         if (!Array.isArray(data)) return;

//         const formatted: Message[] = data.map((m: any) => ({
//           sender: m.sender_id === currentUserId ? "me" : "them",
//           text: m.message,
//           time: new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         }));

//         setMessages(formatted);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchMessages();
//   }, [activeChatId, currentUserId, chats]);


//   useChatListener({ currentUserId, setMessages, setChats });


//   const handleSelectChat = (chatId: number) => {
//     setActiveChatId(chatId);
//     setChats(prev => prev.map(c => ({ ...c, isActive: c.id === chatId })));
//   };

//   const handleSendMessage = async (text: string) => {
//     if (!activeChatId || !currentUserId) return;
//     const chat = chats.find(c => c.id === activeChatId);
//     if (!chat) return;

//     const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     const newMessage: Message = { sender: "me", text, time: timestamp };

//     setMessages(prev => [...prev, newMessage]);

//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await fetch("/api/user/chat/send", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
//         body: JSON.stringify({ receiver_id: chat.userId, message: text }),
//       });
//       if (!res.ok) throw new Error("Send failed");
//     } catch (err) {
//       console.error(err);
//       setMessages(prev => prev.filter(m => m !== newMessage));
//     }
//   };

//   if (loading) return <div className="p-10 text-gray-500">Loading your chats...</div>;

//   return (
//     <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
//       <div className="w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
//         {chats.length ? (
//           <ChatList chats={chats} onSelect={handleSelectChat} />
//         ) : (
//           <div className="p-10 text-gray-400 text-center">You don’t have any conversations yet.</div>
//         )}
//       </div>

//       <div className="flex-1 bg-white">
//         {activeChatId ? (
//           <ChatWindow
//             messages={messages}
//             activeUser={{
//               name: chats.find(c => c.id === activeChatId)?.name || "Unknown User",
//               image: chats.find(c => c.id === activeChatId)?.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
//               id: chats.find(c => c.id === activeChatId)?.userId || 0,
//             }}
//             currentUserId={currentUserId || 0}
//             onSendMessage={handleSendMessage}
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full text-gray-400">
//             Select a chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import ChatList from "@/components/ui/Message/ChatList";
import ChatWindow, { Message } from "@/components/ui/Message/ChatWindow";
import { useEffect, useState } from "react";
import { useChatListener } from "@/hooks/useChatListener";

interface ChatItem {
  id: number;
  name: string;
  lastMsg: string;
  image: string;
  timeOrDate: string;
  isActive: boolean;
  userId: number;
}

// Logger utility
const log = {
  info: (msg: string, ...args: any[]) => console.info(`%cℹ️ ${msg}`, "color: blue; font-weight: bold;", ...args),
  success: (msg: string, ...args: any[]) => console.log(`%c✅ ${msg}`, "color: green; font-weight: bold;", ...args),
  warn: (msg: string, ...args: any[]) => console.warn(`%c⚠️ ${msg}`, "color: orange; font-weight: bold;", ...args),
  error: (msg: string, ...args: any[]) => console.error(`%c❌ ${msg}`, "color: red; font-weight: bold;", ...args),
};

export default function MessagePage() {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch conversations on mount ---
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch("/api/user/chat/conversation", {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch conversations");

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid conversation data format");

        const apiCurrentUserId = data[0]?.current_user_id ?? null;
        setCurrentUserId(apiCurrentUserId);

        const formatted: ChatItem[] = data.map((conv: any, i: number) => ({
          id: conv.id,
          name: conv.other_user?.name || "Unknown User",
          image:
            conv.other_user?.profile_photo ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png",
          lastMsg: conv.last_message || "No messages yet",
          timeOrDate: conv.updated_at
            ? new Date(conv.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "",
          isActive: i === 0,
          userId: conv.other_user?.id || 0,
        }));

        setChats(formatted);
        if (formatted.length) setActiveChatId(formatted[0].id);

        log.success("Conversations loaded successfully", formatted);
      } catch (err) {
        log.error("Error fetching conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // --- Fetch messages for the active chat ---
  useEffect(() => {
    if (!activeChatId || !currentUserId) return;

    const fetchMessages = async () => {
      try {
        const chat = chats.find(c => c.id === activeChatId);
        if (!chat) return;

        const res = await fetch(`/api/user/chat/messages/${chat.userId}`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch messages");

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid messages data format");

        const formatted: Message[] = data.map((m: any) => ({
          sender: m.sender_id === currentUserId ? "me" : "them",
          text: m.message,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));

        setMessages(formatted);
        log.success(`Messages loaded for chat ${chat.id}`, formatted);
      } catch (err) {
        log.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [activeChatId, currentUserId, chats]);

  // --- Real-time chat listener ---
  useChatListener({ currentUserId, setMessages, setChats });

  // --- Select chat ---
  const handleSelectChat = (chatId: number) => {
    setActiveChatId(chatId);
    setChats(prev => prev.map(c => ({ ...c, isActive: c.id === chatId })));
    log.info(`Chat selected: ${chatId}`);
  };

  // --- Send message ---
  const handleSendMessage = async (text: string) => {
    if (!activeChatId || !currentUserId) return;

    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessage: Message = { sender: "me", text, time: timestamp };

    // Optimistic UI update
    setMessages(prev => [...prev, newMessage]);
    log.info("Sending message:", newMessage);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/user/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
        body: JSON.stringify({ receiver_id: chat.userId, message: text }),
      });
      if (!res.ok) throw new Error("Send failed");

      log.success("Message sent successfully", newMessage);
    } catch (err) {
      log.error("Error sending message:", err);
      setMessages(prev => prev.filter(m => m !== newMessage)); // rollback
    }
  };

  if (loading) return <div className="p-10 text-gray-500">Loading your chats...</div>;

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
      <div className="w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
        {chats.length ? (
          <ChatList chats={chats} onSelect={handleSelectChat} />
        ) : (
          <div className="p-10 text-gray-400 text-center">
            You don’t have any conversations yet.
          </div>
        )}
      </div>

      <div className="flex-1 bg-white">
        {activeChatId ? (
          <ChatWindow
            messages={messages}
            activeUser={{
              name: chats.find(c => c.id === activeChatId)?.name || "Unknown User",
              image: chats.find(c => c.id === activeChatId)?.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
              id: chats.find(c => c.id === activeChatId)?.userId || 0,
            }}
            currentUserId={currentUserId || 0}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
