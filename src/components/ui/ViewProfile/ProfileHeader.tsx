// "use client";
// import { ProfileData } from "@/types";
// import { MessageSquare, Phone } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React from "react";

// interface ProfileHeaderProps {
//   profile: ProfileData;
//   primaryPhotoUrl: string;
//   age: string;
// }

// const ProfileHeader: React.FC<ProfileHeaderProps> = ({
//   profile,
//   primaryPhotoUrl,
//   age,
// }) => {
//   const router = useRouter();

//   const handleGetPhoneNumber = () =>
//     alert(`Phone number request sent for ${profile?.user?.name || "this user"}.`);

//   const handleChat = async () => {
//     try {
//       const token = localStorage.getItem("accessToken") || "";
//       const res = await fetch("/api/user/chat", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ other_user_id: profile?.user?.id }),
//       });

//       if (!res.ok) throw new Error("Failed to create chat");

//       const data = await res.json();
//       router.push("/user/messages/");
//     } catch (error) {
//       console.error("Chat creation error:", error);
//       alert("Failed to start chat. Please try again.");
//     }
//   };

//   // ✅ Safe fallbacks for optional fields
//   const name = profile?.user?.name || "Unknown User";
//   const profession = profile?.career?.profession || "Not Specified";
//   const bio =
//     typeof profile?.bio === "string" && profile.bio.trim() !== ""
//       ? profile.bio
//       : "No bio provided yet.";

//   return (
//     <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 mb-10">
//       <div className="p-8 sm:p-10 bg-gradient-to-br from-rose-100 to-orange-200 flex flex-col md:flex-row items-center gap-8">
//         <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex-shrink-0 transform hover:scale-[1.05] transition duration-300">
//           <img
//             src={primaryPhotoUrl}
//             alt={name}
//             className="rounded-full object-cover border-4 border-rose-600 shadow-2xl w-full h-full"
//           />
//         </div>
//         <div className="flex-grow text-center md:text-left">
//           <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
//             {name}
//             <span className="ml-3 inline-block bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full align-middle">
//               Verified
//             </span>
//           </h1>

//           <p className="text-2xl text-rose-700 font-bold mt-2">
//             {profession} | {age || "N/A"} Years Old
//           </p>

//           <p className="text-gray-600 mt-3 italic max-w-xl mx-auto md:mx-0 text-lg">
//             "{bio.substring(0, 150)}{bio.length > 150 ? "..." : ""}"
//           </p>

//           <div className="mt-8 flex justify-center md:justify-start space-x-4">
//             <button
//               onClick={handleGetPhoneNumber}
//               className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition shadow-xl"
//             >
//               <Phone size={20} /> Get Phone Number
//             </button>

//             <button
//               onClick={handleChat}
//               className="flex items-center gap-2 border border-orange-500 text-orange-600 bg-white px-6 py-3 rounded-full hover:bg-orange-50 transition shadow-lg"
//             >
//               <MessageSquare size={20} /> Send Message
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileHeader;



"use client";

import AlertModal from "@/components/share/AlertModal";
import { ProfileData } from "@/types";
import { MessageSquare, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ProfileHeaderProps {
  profile: ProfileData;
  primaryPhotoUrl: string;
  age: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  primaryPhotoUrl,
  age,
}) => {
  const router = useRouter();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    actionLabel: "",
  });

  const handleGetPhoneNumber = () =>
    alert(`Phone number request sent for ${profile?.user?.name || "this user"}.`);

  const handleChat = async () => {
    try {
      const res = await fetch("/api/user/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ other_user_id: profile?.user?.id }),
      });

      // ✅ Restriction for Basics Plan
      if (res.status === 403) {
        setAlertData({
          title: "Chat Restricted",
          message:
            "Sorry, you are not allowed to send messages. Please upgrade your membership to access chat features.",
          actionLabel: "Upgrade Now",
        });
        setAlertOpen(true);
        return;
      }

      if (!res.ok) throw new Error("Failed to create chat");

      const data = await res.json();
      router.push("/user/messages/");
    } catch (error) {
      console.error("Chat creation error:", error);
      alert("Failed to start chat. Please try again.");
    }
  };

  // ✅ Safe fallbacks
  const name = profile?.user?.name || "Unknown User";
  const profession = profile?.career?.profession || "Not Specified";
  const bio =
    typeof profile?.bio === "string" && profile.bio.trim() !== ""
      ? profile.bio
      : "No bio provided yet.";

  return (
    <>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 mb-10">
        <div className="p-8 sm:p-10 bg-gradient-to-br from-rose-100 to-orange-200 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex-shrink-0 transform hover:scale-[1.05] transition duration-300">
            <img
              src={primaryPhotoUrl}
              alt={name}
              className="rounded-full object-cover border-4 border-rose-600 shadow-2xl w-full h-full"
            />
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {name}
              <span className="ml-3 inline-block bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full align-middle">
                Verified
              </span>
            </h1>

            <p className="text-2xl text-rose-700 font-bold mt-2">
              {profession} | {age || "N/A"} Years Old
            </p>

            <p className="text-gray-600 mt-3 italic max-w-xl mx-auto md:mx-0 text-lg">
              "{bio.substring(0, 150)}{bio.length > 150 ? "..." : ""}"
            </p>

            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <button
                onClick={handleGetPhoneNumber}
                className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition shadow-xl"
              >
                <Phone size={20} /> Get Phone Number
              </button>

              <button
                onClick={handleChat}
                className="flex items-center gap-2 border border-orange-500 text-orange-600 bg-white px-6 py-3 rounded-full hover:bg-orange-50 transition shadow-lg"
              >
                <MessageSquare size={20} /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🚨 Unified Alert Modal */}
      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        title={alertData.title}
        message={alertData.message}
        actionLabel={alertData.actionLabel}
        onAction={() => {
          setAlertOpen(false);
          router.push("/user/dashboard");
        }}
      />
    </>
  );
};

export default ProfileHeader;
