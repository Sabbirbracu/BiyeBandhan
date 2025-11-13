// "use client";

// import ChatList from "@/components/ui/Message/ChatList";
// import ChatWindow from "@/components/ui/Message/ChatWindow";
// import { getEchoInstance } from "@/lib/echo";
// import { useEffect, useState } from "react";

// interface Message {
//   sender: "me" | "them";
//   text: string;
//   time: string;
// }

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

//         if (!res.ok) {
//           console.error("❌ Failed to fetch conversations, status:", res.status);
//           return;
//         }

//         const data = await res.json();
//         console.log("✅ Conversations fetched:", data);

//         if (!Array.isArray(data)) return;

//         const apiCurrentUserId = data[0]?.current_user_id;
//         console.log("🧩 Current User ID from API:", apiCurrentUserId);
//         if (apiCurrentUserId) setCurrentUserId(apiCurrentUserId);

//         const formatted: ChatItem[] = data.map((conv: any, i: number) => {
//           const otherUser = conv.other_user;
//           return {
//             id: conv.id,
//             name: otherUser?.name || "Unknown User",
//             image:
//               otherUser?.profile_photo ||
//               "https://cdn-icons-png.flaticon.com/512/847/847969.png",
//             lastMsg: conv.last_message || "No messages yet",
//             timeOrDate: conv.updated_at
//               ? new Date(conv.updated_at).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })
//               : "",
//             isActive: i === 0,
//             userId: otherUser?.id || 0,
//           };
//         });

//         setChats(formatted);
//         if (formatted.length) setActiveChatId(formatted[0].id);
//       } catch (error) {
//         console.error("💥 Error fetching conversations:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConversations();
//   }, []);

//   // Fetch messages when chat is selected
//   useEffect(() => {
//     if (!activeChatId || !currentUserId) return;

//     const fetchMessages = async () => {
//       try {
//         const chat = chats.find((c) => c.id === activeChatId);
//         if (!chat) return;

//         console.log(`📥 Fetching messages for chat ID: ${activeChatId}`);
//         const res = await fetch(`/api/user/chat/messages/${chat.userId}`, {
//           credentials: "include",
//           cache: "no-store",
//         });

//         if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
//         const data = await res.json();

//         console.log(`✅ Messages for chat ${activeChatId}:`, data);

//         const formatted: Message[] = Array.isArray(data)
//           ? data.map((m: any) => ({
//               sender: m.sender_id === currentUserId ? "me" : "them",
//               text: m.message,
//               time: new Date(m.created_at).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               }),
//             }))
//           : [];

//         setMessages(formatted);
//       } catch (err) {
//         console.error("💥 Error loading messages:", err);
//       }
//     };

//     fetchMessages();
//   }, [activeChatId, currentUserId, chats]);

//   // Live listener
//   useEffect(() => {
//     const subscribeToEcho = async () => {
//       try {
//         const echo = getEchoInstance();
//         const userDataStr = localStorage.getItem("userData");
//         if (!userDataStr) {
//           console.warn("⚠️ No userData found in localStorage — skipping Echo setup");
//           return;
//         }

//         const user = JSON.parse(userDataStr);
//         console.log(`📡 Subscribing to private channel: chat.${user.id}`);

//         const channel = echo.private(`chat.${user.id}`);

//         channel.listen("MessageSent", (event: any) => {
//           console.log("📬 New message event received:", event);

//           const newMsg: Message = {
//             sender: event.sender_id === user.id ? "me" : "them",
//             text: event.message,
//             time: new Date(event.created_at).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//           };

//           setMessages((prev) => [...prev, newMsg]);
//           setChats((prev) =>
//             prev.map((chat) =>
//               chat.userId === event.sender_id || chat.userId === event.receiver_id
//                 ? { ...chat, lastMsg: event.message }
//                 : chat
//             )
//           );
//         });

//         channel.error((error: any) => {
//           console.error("🚨 Echo channel error:", error);
//         });

//         echo.connector.pusher.connection.bind("connected", () => {
//           console.log("✅ Echo successfully connected");
//         });

//         echo.connector.pusher.connection.bind("error", (err: any) => {
//           console.error("❌ Echo connection error:", err);
//         });

//         echo.connector.pusher.connection.bind("state_change", (state: any) => {
//           console.log("🔄 Echo state changed:", state);
//         });
//       } catch (err) {
//         console.error("💥 Echo subscription failed:", err);
//       }
//     };

//     subscribeToEcho();
//   }, []);

//   const handleSelectChat = (chatId: number) => {
//     setActiveChatId(chatId);
//     setChats((prev) =>
//       prev.map((c) => ({ ...c, isActive: c.id === chatId }))
//     );
//   };

//   if (loading)
//     return <div className="p-10 text-gray-500">Loading your chats...</div>;

//   return (
//     <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
//       <div className="w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
//         {chats.length > 0 ? (
//           <ChatList chats={chats} onSelect={handleSelectChat} />
//         ) : (
//           <div className="p-10 text-gray-400 text-center">
//             You don’t have any conversations yet.
//           </div>
//         )}
//       </div>

//       <div className="flex-1 bg-white">
//         {activeChatId ? (
//           <ChatWindow
//             chatId={activeChatId.toString()}
//             messages={messages}
//             activeUser={{
//               name:
//                 chats.find((c) => c.id === activeChatId)?.name || "Unknown User",
//               image:
//                 chats.find((c) => c.id === activeChatId)?.image ||
//                 "https://cdn-icons-png.flaticon.com/512/847/847969.png",
//               id: chats.find((c) => c.id === activeChatId)?.userId || 0,
//             }}
//             currentUserId={currentUserId || 0}
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
import { getEchoInstance } from "@/lib/echo";
import { useEffect, useState } from "react";

interface ChatItem {
  id: number;
  name: string;
  lastMsg: string;
  image: string;
  timeOrDate: string;
  isActive: boolean;
  userId: number;
}

export default function MessagePage() {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await fetch("/api/user/chat/conversation", {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) return;

        const data = await res.json();
        if (!Array.isArray(data)) return;

        const apiCurrentUserId = data[0]?.current_user_id;
        if (apiCurrentUserId) setCurrentUserId(apiCurrentUserId);

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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages for selected chat
  useEffect(() => {
    if (!activeChatId || !currentUserId) return;

    const fetchMessages = async () => {
      try {
        const chat = chats.find((c) => c.id === activeChatId);
        if (!chat) return;

        const res = await fetch(`/api/user/chat/messages/${chat.userId}`, {
          credentials: "include",
          cache: "no-store",
        });
        if (!res.ok) return;

        const data = await res.json();
        if (!Array.isArray(data)) return;

        const formatted: Message[] = data.map((m: any) => ({
          sender: m.sender_id === currentUserId ? "me" : "them",
          text: m.message,
          time: new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));

        setMessages(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [activeChatId, currentUserId, chats]);

  // Live listener via Echo
  // useEffect(() => {
  //   const subscribeToEcho = async () => {
  //     try {
  //       const echo = getEchoInstance();
  //       const userDataStr = localStorage.getItem("userData");
  //       if (!userDataStr) return;

  //       const user = JSON.parse(userDataStr);
  //       const channel = echo.private(`chat.${user.id}`);

  //       channel.listen("message.sent", (event: any) => {
  //         const newMsg: Message = {
  //           sender: event.sender_id === user.id ? "me" : "them",
  //           text: event.message,
  //           time: new Date(event.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  //         };

  //         setMessages(prev => [...prev, newMsg]);

  //         setChats(prev =>
  //           prev.map(chat =>
  //             chat.userId === event.sender_id || chat.userId === event.receiver_id
  //               ? { ...chat, lastMsg: event.message }
  //               : chat
  //           )
  //         );
  //       });
  //     } catch (err) {
  //       console.error("Echo error:", err);
  //     }
  //   };

  //   subscribeToEcho();
  // }, []);

  // Live listener via Echo with logging
useEffect(() => {
  const subscribeToEcho = async () => {
    try {
      const echo = getEchoInstance();
      const userDataStr = localStorage.getItem("userData");

      if (!userDataStr) {
        console.warn("⚠️ No userData found in localStorage — skipping Echo setup");
        return;
      }

      const user = JSON.parse(userDataStr);
      console.log("📌 Logged-in user:", user); // log current user

      const channelName = `chat.${user.id}`;
      console.log("📡 Subscribing to Echo private channel:", channelName);

      const channel = echo.private(channelName);

      channel.listen("message.sent", (event: any) => {
        console.log("📬 Event received on channel:", channelName, event);

        const newMsg: Message = {
          sender: event.sender_id === user.id ? "me" : "them",
          text: event.message,
          time: new Date(event.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        console.log("💬 Updating messages state with:", newMsg);
        setMessages(prev => [...prev, newMsg]);

        setChats(prev =>
          prev.map(chat =>
            chat.userId === event.sender_id || chat.userId === event.receiver_id
              ? { ...chat, lastMsg: event.message }
              : chat
          )
        );
      });

      channel.error((error: any) => {
        console.error("🚨 Echo channel error:", error);
      });

      echo.connector.pusher.connection.bind("connected", () => {
        console.log("✅ Echo successfully connected");
      });

      echo.connector.pusher.connection.bind("error", (err: any) => {
        console.error("❌ Echo connection error:", err);
      });

      echo.connector.pusher.connection.bind("state_change", (state: any) => {
        console.log("🔄 Echo state changed:", state);
      });

    } catch (err) {
      console.error("💥 Echo subscription failed:", err);
    }
  };

  subscribeToEcho();
}, []);


  const handleSelectChat = (chatId: number) => {
    setActiveChatId(chatId);
    setChats(prev => prev.map(c => ({ ...c, isActive: c.id === chatId })));
  };

  // Send message handler (optimistic UI)
  const handleSendMessage = async (text: string) => {
    if (!activeChatId || !currentUserId) return;
    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessage: Message = { sender: "me", text, time: timestamp };

    // Optimistic update
    setMessages(prev => [...prev, newMessage]);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("/api/user/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token || ""}` },
        body: JSON.stringify({ receiver_id: chat.userId, message: text }),
      });
      if (!res.ok) throw new Error("Send failed");
    } catch (err) {
      console.error(err);
      setMessages(prev => prev.filter(m => m !== newMessage));
    }
  };

  if (loading) return <div className="p-10 text-gray-500">Loading your chats...</div>;

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
      <div className="w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
        {chats.length ? (
          <ChatList chats={chats} onSelect={handleSelectChat} />
        ) : (
          <div className="p-10 text-gray-400 text-center">You don’t have any conversations yet.</div>
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
