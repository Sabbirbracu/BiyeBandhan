"use client";

import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

// ✅ Export ChatItem type for use in other files
export interface ChatItem {
  id: number;
  name: string;
  lastMsg: string; // e.g., 'M:10'
  image: string;
  status?: "online" | "offline";
  timeOrDate: string;
  isActive: boolean; // non-optional now
}

interface ChatListProps {
  chats: ChatItem[];
  onSelectChat?: (chat: ChatItem) => void;
}

const ChatList = ({ chats, onSelectChat }: ChatListProps) => {
  return (
    <div className="w-full space-y-4 pt-6 pl-6 pr-4">
      {/* Header Section */}
      <div className="flex items-center gap-2 text-gray-800">
        <Search className="h-5 w-5 text-rose-500" />
        <h2 className="text-xl font-semibold text-gray-800">Chats</h2>
      </div>

      {/* Chat List */}
      <Card className="p-0 bg-white gap-0 rounded-xl overflow-hidden max-h-[80vh] overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat?.(chat)}
            className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0
              ${
                chat.isActive
                  ? "bg-[#ffebee] rounded-t-lg"
                  : "hover:bg-gray-50"
              }
              ${index === 0 && chat.isActive ? "rounded-t-xl" : ""}
            `}
            style={
              chat.isActive
                ? { borderRight: "4px solid #F44369" }
                : {}
            }
          >
            {/* Profile Image + Status */}
            <div className="relative flex-shrink-0">
              <img
                src={chat.image}
                alt={chat.name}
                className="h-11 w-11 rounded-full object-cover border border-gray-100"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png")
                }
              />
              {chat.status === "online" ? (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              ) : (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-rose-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="font-semibold text-gray-800 text-sm truncate block">
                {chat.name}
              </span>
              <span className="text-gray-500 text-xs block">
                {chat.lastMsg}
              </span>
            </div>

            {/* Time / Date */}
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




// "use client";

// import { Card } from "@/components/ui/card";
// import { Search } from "lucide-react";

// // ✅ Export ChatItem type for use in other files
// export interface ChatItem {
//   id: number;
//   chat_id: string; // add chat_id from API
//   name: string;
//   lastMsg: string; // e.g., 'M:10'
//   image: string;
//   status?: "online" | "offline";
//   timeOrDate: string;
//   isActive: boolean; // required
//   other_user: { id: number; name: string; image: string }; // API provides this
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
