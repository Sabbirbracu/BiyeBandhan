"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Bell,
    CircleDot,
    Image,
    MoreVertical,
    Paperclip,
    Send,
    Smile,
} from "lucide-react";

interface Message {
  sender: "me" | "them";
  text: string;
  time: string;
}

interface ChatWindowProps {
  messages: Message[];
  activeUser: {
    name: string;
    image: string;
  };
}

const ChatWindow = ({ messages, activeUser }: ChatWindowProps) => {
  const myBubbleColor = "bg-[#4CAF50]";
  const theirBubbleColor = "bg-[#9C274B]";
  const messageTextColor = "text-white";
  const myAvatar = "https://i.pravatar.cc/100?img=1";

  return (
    <Card className="flex py-0 flex-col h-[calc(100vh-100px)] bg-gray-200 shadow-lg rounded-2xl overflow-hidden mt-8 mx-12">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <img
            src={activeUser.image}
            alt={activeUser.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">{activeUser.name}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <CircleDot className="h-2 w-2 fill-green-500 text-green-500" /> Online
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="rounded-md h-8 w-8 p-0 text-gray-400 hover:bg-gray-200"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 overflow-y-auto space-y-5">
        <div className="flex justify-center text-xs text-gray-400">
          Today, 10:30 AM
        </div>

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "them" && (
              <img
                src={activeUser.image}
                alt={activeUser.name}
                className="h-7 w-7 rounded-full object-cover mr-2 flex-shrink-0"
              />
            )}

            <div
              className={`px-4 py-2 max-w-sm text-sm leading-relaxed shadow-sm ${
                msg.sender === "me"
                  ? `${myBubbleColor} ${messageTextColor} rounded-t-lg rounded-bl-lg`
                  : `${theirBubbleColor} ${messageTextColor} rounded-t-lg rounded-br-lg`
              }`}
            >
              {msg.text}
              <div
                className={`text-[10px] mt-1 ${
                  msg.sender === "me"
                    ? "text-white/80 text-right"
                    : "text-white/70 text-left"
                }`}
              >
                {msg.time}
              </div>
            </div>

            {msg.sender === "me" && (
              <img
                src={myAvatar}
                alt="You"
                className="h-7 w-7 rounded-full object-cover ml-2 flex-shrink-0"
              />
            )}
          </div>
        ))}

        <div className="flex justify-center text-xs text-gray-400 pt-2">
          End of conversation
        </div>
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-rose-400 transition-all">
          <Smile className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
          <Paperclip className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
          <Input
            placeholder="Type a message..."
            className="flex-1 border-none focus-visible:ring-0 text-sm px-2"
          />
          <div className="flex items-center gap-3 pr-2">
            <Bell className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
            <Image className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
          </div>
          <Button className="bg-rose-500 hover:bg-rose-600 text-white h-10 w-10 rounded-md flex items-center justify-center shadow-md transition">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatWindow;


// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Bell,
//   CircleDot,
//   Image,
//   MoreVertical,
//   Paperclip,
//   Send,
//   Smile,
// } from "lucide-react";

// interface Message {
//   id?: number;
//   sender_id: number;
//   receiver_id: number;
//   message: string;
//   created_at: string;
// }

// interface ActiveUser {
//   id?: number;
//   name: string;
//   image: string;
// }

// interface ChatWindowProps {
//   messages: Message[];
//   activeUser: ActiveUser;
//   currentUserId: number;
//   onSend: (message: string) => void;
// }

// export default function ChatWindow({
//   messages,
//   activeUser,
//   currentUserId,
//   onSend,
// }: ChatWindowProps) {
//   const [input, setInput] = useState("");

//   const myBubbleColor = "bg-[#4CAF50]";
//   const theirBubbleColor = "bg-[#9C274B]";
//   const messageTextColor = "text-white";
//   const myAvatar = "https://i.pravatar.cc/100?img=1";

//   const handleSend = () => {
//     if (!input.trim()) return;
//     onSend(input);
//     setInput("");
//   };

//   return (
//     <Card className="flex py-0 flex-col h-[calc(100vh-100px)] bg-gray-200 shadow-lg rounded-2xl overflow-hidden mt-8 mx-12">
//       {/* ===== Header ===== */}
//       <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
//         <div className="flex items-center gap-3">
//           <img
//             src={activeUser.image}
//             alt={activeUser.name}
//             className="h-10 w-10 rounded-full object-cover"
//           />
//           <div>
//             <p className="font-semibold text-gray-800">{activeUser.name}</p>
//             <p className="text-xs text-green-600 flex items-center gap-1">
//               <CircleDot className="h-2 w-2 fill-green-500 text-green-500" />{" "}
//               Online
//             </p>
//           </div>
//         </div>

//         <Button
//           variant="ghost"
//           className="rounded-md h-8 w-8 p-0 text-gray-400 hover:bg-gray-200"
//         >
//           <MoreVertical className="h-5 w-5" />
//         </Button>
//       </div>

//       {/* ===== Messages ===== */}
//       <div className="flex-1 p-6 overflow-y-auto space-y-5">
//         <div className="flex justify-center text-xs text-gray-400">
//           Today, 10:30 AM
//         </div>

//         {messages.map((msg, i) => {
//           const isMine = msg.sender_id === currentUserId;
//           return (
//             <div
//               key={msg.id ?? i}
//               className={`flex items-end ${
//                 isMine ? "justify-end" : "justify-start"
//               }`}
//             >
//               {!isMine && (
//                 <img
//                   src={activeUser.image}
//                   alt={activeUser.name}
//                   className="h-7 w-7 rounded-full object-cover mr-2 flex-shrink-0"
//                 />
//               )}

//               <div
//                 className={`px-4 py-2 max-w-sm text-sm leading-relaxed shadow-sm ${
//                   isMine
//                     ? `${myBubbleColor} ${messageTextColor} rounded-t-lg rounded-bl-lg`
//                     : `${theirBubbleColor} ${messageTextColor} rounded-t-lg rounded-br-lg`
//                 }`}
//               >
//                 {msg.message}
//                 <div
//                   className={`text-[10px] mt-1 ${
//                     isMine
//                       ? "text-white/80 text-right"
//                       : "text-white/70 text-left"
//                   }`}
//                 >
//                   {new Date(msg.created_at).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>
//               </div>

//               {isMine && (
//                 <img
//                   src={myAvatar}
//                   alt="You"
//                   className="h-7 w-7 rounded-full object-cover ml-2 flex-shrink-0"
//                 />
//               )}
//             </div>
//           );
//         })}

//         <div className="flex justify-center text-xs text-gray-400 pt-2">
//           End of conversation
//         </div>
//       </div>

//       {/* ===== Input Field ===== */}
//       <div className="p-4 border-t border-gray-100 bg-gray-50">
//         <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-rose-400 transition-all">
//           <Smile className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
//           <Paperclip className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
//           <Input
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             className="flex-1 border-none focus-visible:ring-0 text-sm px-2"
//           />
//           <div className="flex items-center gap-3 pr-2">
//             <Bell className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
//             <Image className="h-5 w-5 text-gray-400 cursor-pointer hover:text-rose-500" />
//           </div>
//           <Button
//             onClick={handleSend}
//             className="bg-rose-500 hover:bg-rose-600 text-white h-10 w-10 rounded-md flex items-center justify-center shadow-md transition"
//           >
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }
