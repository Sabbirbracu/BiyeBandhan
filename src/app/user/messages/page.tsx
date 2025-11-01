// "use client";

// import Header from "@/components/ui/dashboard/Header";
// import UserSidebar from "@/components/ui/dashboard/UserSidebar";
// import ChatList from "@/components/ui/Message/ChatList";
// import ChatWindow from "@/components/ui/Message/ChatWindow";
// import { getCurrentUser } from "@/service/authService";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// // Message and ChatItem Types
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
//   status?: "online" | "offline";
//   timeOrDate: string;
//   isActive: boolean;
// }

// export default function MessagePage() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await getCurrentUser();
//         if (userData) setUser(userData);
//         else router.push("/login");
//       } catch {
//         router.push("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
//           <p className="mt-4 text-gray-400">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const userName = user?.name || user?.email?.split("@")[0] || "User";

//   // Demo chats
//   const chats: ChatItem[] = [
//     {
//       id: 1,
//       name: "Ayesha Rahman",
//       lastMsg: "M:101",
//       image: "https://i.pravatar.cc/100?img=47",
//       status: "online",
//       timeOrDate: "Yesterday",
//       isActive: true,
//     },
//     {
//       id: 2,
//       name: "Nusrat Hossain",
//       lastMsg: "M:10",
//       image: "https://i.pravatar.cc/100?img=12",
//       status: "offline",
//       timeOrDate: "19:39 PM",
//       isActive: false,
//     },
//     {
//       id: 3,
//       name: "Farhana Karim",
//       lastMsg: "00 AU, 2012",
//       image: "https://i.pravatar.cc/100?img=33",
//       status: "online",
//       timeOrDate: "19:32 PM",
//       isActive: false,
//     },
//     {
//       id: 4,
//       name: "Ahmed Khan",
//       lastMsg: "M:12",
//       image: "https://i.pravatar.cc/100?img=3",
//       status: "offline",
//       timeOrDate: "19:38 PM",
//       isActive: false,
//     },
//   ];

//   const messages: Message[] = [
//     { sender: "them", text: "Hey Sabbir, how have you been?", time: "10:00 AM" },
//     { sender: "me", text: "Hey! I’m doing great, just busy with projects.", time: "10:02 AM" },
//     { sender: "them", text: "That’s awesome! Let’s catch up soon.", time: "10:05 AM" },
//     { sender: "me", text: "Sure! Looking forward to it.", time: "10:07 AM" },
//   ];

//   const activeChat = chats.find((c) => c.isActive);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
//       <Header user={user} />

//       {/* Main Layout */}
//       <div className="flex flex-1">
//         {/* Fixed Sidebar */}
//         <UserSidebar userName={userName} />

//         {/* Main Chat Area */}
//         <main className="flex-1 ml-72 overflow-hidden">
//           <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
//             {/* Chat List */}
//             <div className="w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
//               <ChatList chats={chats} />
//             </div>

//             {/* Chat Window */}
//             <div className="flex-1 bg-white">
//               <ChatWindow
//                 messages={messages}
//                 activeUser={{
//                   name: activeChat?.name || "Select Chat",
//                   image: activeChat?.image || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
//                 }}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// // "use client";

// // import Header from "@/components/ui/dashboard/Header";
// // import UserSidebar from "@/components/ui/dashboard/UserSidebar";
// // import ChatList from "@/components/ui/Message/ChatList";
// // import ChatWindow from "@/components/ui/Message/ChatWindow";
// // import { getCurrentUser } from "@/service/authService";
// // import { sendMessage } from "@/utils/sendMessage";
// // import { useChatListener } from "@/hooks/useChatListener";
// // import { useRouter } from "next/navigation";
// // import { useEffect, useState } from "react";

// // // Define ChatMessage type
// // export interface ChatMessage {
// //   id: number;
// //   sender_id: number;
// //   receiver_id: number;
// //   message: string;
// //   created_at: string;
// //   updated_at: string;
// // }

// // export interface ChatItem {
// //   id: number;
// //   chat_id: string;
// //   name: string;
// //   lastMsg: string;
// //   image: string;
// //   status?: "online" | "offline";
// //   timeOrDate: string;
// //   isActive?: boolean;
// // }

// // export default function MessagePage() {
// //   const [user, setUser] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [activeChat, setActiveChat] = useState<ChatItem | null>(null);
// //   const [messages, setMessages] = useState<ChatMessage[]>([]);
// //   const router = useRouter();

// //   // Fetch current user
// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const userData = await getCurrentUser();
// //         if (userData) setUser(userData);
// //         else router.push("/login");
// //       } catch {
// //         router.push("/login");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchUser();
// //   }, [router]);

// //   // Chat listener
// //   const chatId =
// //     activeChat && user
// //       ? [user.id, activeChat.id].sort((a, b) => a - b).join("_")
// //       : null;

// //   useChatListener(chatId, setMessages);

// //   const handleSendMessage = async (text: string) => {
// //     if (!text.trim() || !activeChat) return;
// //     await sendMessage({
// //       receiverId: activeChat.id,
// //       message: text,
// //       currentUserId: user.id,
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
// //           <p className="mt-4 text-gray-400">Loading...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const userName = user?.name || user?.email?.split("@")[0] || "User";

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col">
// //       <Header user={user} />

// //       <div className="flex flex-1">
// //         <UserSidebar userName={userName} />

// //         <main className="flex-1 ml-72 overflow-hidden">
// //           <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
// //             {/* Chat List */}
// //             <div className="w-[360px] border-r border-gray-200 bg-white overflow-y-auto">
// //               <ChatList onSelectChat={setActiveChat} />
// //             </div>

// //             {/* Chat Window */}
// //             <div className="flex-1 bg-white">
// //               {activeChat ? (
// //                 <ChatWindow
// //                   messages={messages}
// //                   activeUser={{
// //                     id: activeChat.id,
// //                     name: activeChat.name,
// //                     image: activeChat.image,
// //                   }}
// //                   currentUserId={user.id}
// //                   onSend={handleSendMessage}
// //                 />
// //               ) : (
// //                 <div className="flex items-center justify-center h-full text-gray-400">
// //                   Select a chat to start messaging
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }



"use client";

import Header from "@/components/ui/dashboard/Header";
import UserSidebar from "@/components/ui/dashboard/UserSidebar";
import ChatList from "@/components/ui/Message/ChatList";
import ChatWindow from "@/components/ui/Message/ChatWindow";
import { getCurrentUser } from "@/service/authService";
import { useRouter } from "next/navigation";
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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) setUser(userData);
        else router.push("/login");
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header user={user} />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <UserSidebar user={user} />

        {/* Main Chat Area */}
        <main className="flex-1 ml-72 overflow-hidden">
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
        </main>
      </div>
    </div>
  );
}
