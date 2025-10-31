"use client";

import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

interface ChatItem {
  id: number;
  name: string;
  lastMsg: string; // Used for the sub-text (e.g., 'M:10')
  image: string;
  status?: 'online' | 'offline'; 
  timeOrDate: string; 
  isActive: boolean; 
}

interface ChatListProps {
  chats: ChatItem[];
}

const ChatList = ({ chats }: ChatListProps) => {
  return (
    // The main container for the left-hand chats section. Removed p-4 to let the card handle padding.
    // The width should be determined by its parent container, but we'll keep the utility classes for structure.
    <div className="w-full space-y-4 pt-6 pl-6 pr-4"> 
        
      {/* Title section - "Chats" with Search Icon (Matching the image) */}
      <div className="flex items-center gap-2 text-gray-800">
        <Search className="h-5 w-5 text-rose-500" />
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
      </div>
      
      {/* Chats List Container */}
      {/* Added top-0 relative positioning for potential absolute elements later. Removed shadow-lg and border for a flatter look based on the image's chat list container. */}
      <Card className="p-0 bg-white rounded-xl overflow-hidden max-h-[80vh] overflow-y-auto">
        
        {/* The Search Input (Moving it inside the Card for a unified look, or keep it outside and style it to float above the card - I'll keep the current structure but remove the dedicated search input to match the image which only shows a search icon next to the title "Chats") */}

        {/* --- List of Chats --- */}
        {chats.map((chat, index) => (
          <div
            key={chat.id}
            // Active chat: bg-rose-50 (or a custom pink like #FFEBEB) and a strong border on the right
            className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0
              ${chat.isActive 
                ? 'bg-[#ffebee] rounded-t-lg' // Custom light pink background for active chat
                : 'hover:bg-gray-50' // Hover styling
              }
              ${index === 0 && chat.isActive ? 'rounded-t-xl' : ''} // Optional: rounded top edge for the very first item if active
            `}
            // Applying a separate element for the border on the right to match the visual line break/accent.
            style={chat.isActive ? {borderRight: '4px solid #F44369'} : {}}
          >
            {/* Profile Image & Status Dot */}
            <div className="relative flex-shrink-0">
                <img
                    src={chat.image}
                    alt={chat.name}
                    // h-12 w-12 is slightly large; h-10 w-10 or h-11 w-11 might be closer
                    className="h-11 w-11 rounded-full object-cover border border-gray-100" 
                    onError={(e) =>
                        (e.currentTarget.src =
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png")
                    }
                />
                {/* Online Status Dot (The design shows a pink dot if not online, and a green dot for online) */}
                {chat.status === 'online' ? (
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                ) : (
                    // Assuming 'offline' or 'away' is represented by a pink dot in the design image
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-rose-500 rounded-full border-2 border-white"></div>
                )}
            </div>

            {/* Name and Last Message/Details */}
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="font-semibold text-gray-800 text-sm truncate block">
                {chat.name}
              </span>
              {/* This span holds the M:10 or date of birth details */}
              <span className="text-gray-500 text-xs block">
                {chat.lastMsg}
              </span>
            </div>

            {/* Time/Date */}
            <div className="flex-shrink-0 text-right h-full pt-1"> 
                <span className="text-xs text-gray-400">
                    {chat.timeOrDate}
                </span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ChatList;


// ChatList.jsx

// "use client";

// import { Card } from "@/components/ui/card";
// import { Search } from "lucide-react";

// interface ChatItem {
//   id: number;
//   name: string;
//   lastMsg: string; // e.g., 'M:10'
//   image: string;
//   status?: "online" | "offline";
//   timeOrDate: string;
//   isActive?: boolean;
// }

// interface ChatListProps {
//   chats: ChatItem[];
//   onSelectChat?: (chat: ChatItem) => void;
// }

// const ChatList = ({ chats, onSelectChat }: ChatListProps) => {
//   return (
//     <div className="w-full space-y-4 pt-6 pl-6 pr-4">
//       {/* Header Section */}
//       <div className="flex items-center gap-2 text-gray-800">
//         <Search className="h-5 w-5 text-rose-500" />
//         <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
//       </div>

//       {/* Chat List */}
//       <Card className="p-0 bg-white gap-0 rounded-xl overflow-hidden max-h-[80vh] overflow-y-auto">
//         {chats.map((chat, index) => (
//           <div
//             key={chat.id}
//             onClick={() => onSelectChat?.(chat)}
//             className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0
//               ${
//                 chat.isActive
//                   ? "bg-[#ffebee] rounded-t-lg"
//                   : "hover:bg-gray-50"
//               }
//               ${index === 0 && chat.isActive ? "rounded-t-xl" : ""}
//             `}
//             style={
//               chat.isActive
//                 ? { borderRight: "4px solid #F44369" }
//                 : {}
//             }
//           >
//             {/* Profile Image + Status */}
//             <div className="relative flex-shrink-0">
//               <img
//                 src={chat.image}
//                 alt={chat.name}
//                 className="h-11 w-11 rounded-full object-cover border border-gray-100"
//                 onError={(e) =>
//                   (e.currentTarget.src =
//                     "https://cdn-icons-png.flaticon.com/512/847/847969.png")
//                 }
//               />
//               {chat.status === "online" ? (
//                 <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
//               ) : (
//                 <div className="absolute bottom-0 right-0 h-3 w-3 bg-rose-500 rounded-full border-2 border-white"></div>
//               )}
//             </div>

//             {/* Chat Info */}
//             <div className="flex-1 min-w-0 flex flex-col">
//               <span className="font-semibold text-gray-800 text-sm truncate block">
//                 {chat.name}
//               </span>
//               <span className="text-gray-500 text-xs block">
//                 {chat.lastMsg}
//               </span>
//             </div>

//             {/* Time / Date */}
//             <div className="flex-shrink-0 text-right h-full pt-1">
//               <span className="text-xs text-gray-400">
//                 {chat.timeOrDate}
//               </span>
//             </div>
//           </div>
//         ))}
//       </Card>
//     </div>
//   );
// };

// export default ChatList;




// "use client";

// import { Card } from "@/components/ui/card";
// import { Search } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// interface ChatItem {
//   id: number;
//   chat_id: string;
//   name: string;
//   lastMsg: string;
//   image: string;
//   status?: "online" | "offline";
//   timeOrDate: string;
//   isActive?: boolean;
// }

// interface ChatListProps {
//   onSelectChat?: (chat: ChatItem) => void;
// }

// const ChatList = ({ onSelectChat }: ChatListProps) => {
//   const [chats, setChats] = useState<ChatItem[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         // Use relative URL for same-origin (Next.js + Laravel)
//         const res = await axios.get("/api/chat/list", {
//           withCredentials: true, // ✅ crucial for Sanctum cookies
//         });

//         const data = res.data;

//         const formattedChats: ChatItem[] = data.map((chat: any) => ({
//           id: chat.id,
//           chat_id: chat.chat_id,
//           name: chat.other_user?.name || "Unknown",
//           image:
//             chat.other_user?.avatar ||
//             "https://cdn-icons-png.flaticon.com/512/847/847969.png",
//           lastMsg: chat.last_message || "",
//           timeOrDate: chat.last_message_at
//             ? new Date(chat.last_message_at).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })
//             : "",
//           status: "online",
//         }));

//         setChats(formattedChats);
//       } catch (error) {
//         console.error("Failed to fetch chats:", error);
//         setChats([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChats();
//   }, []);

//   return (
//     <div className="w-full space-y-4 pt-6 pl-6 pr-4">
//       <div className="flex items-center gap-2 text-gray-800">
//         <Search className="h-5 w-5 text-rose-500" />
//         <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
//       </div>

//       <Card className="p-0 bg-white gap-0 rounded-xl overflow-hidden max-h-[80vh] overflow-y-auto">
//         {loading ? (
//           <div className="p-4 text-center text-gray-400">Loading chats...</div>
//         ) : chats.length === 0 ? (
//           <div className="p-4 text-center text-gray-400">
//             No chats yet. Start a conversation!
//           </div>
//         ) : (
//           chats.map((chat, index) => (
//             <div
//               key={chat.id}
//               onClick={() => onSelectChat?.(chat)}
//               className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0
//                 ${chat.isActive ? "bg-[#ffebee] rounded-t-lg" : "hover:bg-gray-50"}
//                 ${index === 0 && chat.isActive ? "rounded-t-xl" : ""}`}
//               style={chat.isActive ? { borderRight: "4px solid #F44369" } : {}}
//             >
//               <div className="relative flex-shrink-0">
//                 <img
//                   src={chat.image}
//                   alt={chat.name}
//                   className="h-11 w-11 rounded-full object-cover border border-gray-100"
//                   onError={(e) =>
//                     (e.currentTarget.src =
//                       "https://cdn-icons-png.flaticon.com/512/847/847969.png")
//                   }
//                 />
//                 {chat.status === "online" ? (
//                   <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
//                 ) : (
//                   <div className="absolute bottom-0 right-0 h-3 w-3 bg-rose-500 rounded-full border-2 border-white"></div>
//                 )}
//               </div>

//               <div className="flex-1 min-w-0 flex flex-col">
//                 <span className="font-semibold text-gray-800 text-sm truncate block">
//                   {chat.name}
//                 </span>
//                 <span className="text-gray-500 text-xs block">{chat.lastMsg}</span>
//               </div>

//               <div className="flex-shrink-0 text-right h-full pt-1">
//                 <span className="text-xs text-gray-400">{chat.timeOrDate}</span>
//               </div>
//             </div>
//           ))
//         )}
//       </Card>
//     </div>
//   );
// };

// export default ChatList;
