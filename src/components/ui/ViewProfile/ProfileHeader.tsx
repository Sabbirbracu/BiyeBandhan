"use client";

import AlertModal from "@/components/share/AlertModal";
import ChatModal from "@/components/share/ChatModal";
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

  // 🔔 Alert modal for restricted users
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    actionLabel: "",
  });

  // 💬 Chat modal visibility
  const [chatModalOpen, setChatModalOpen] = useState(false);

  const handleGetPhoneNumber = () =>
    alert(`Phone number request sent for ${profile?.user?.name || "this user"}.`);

  // ✅ Only opens modal — no API call here
  const handleChat = () => {
    setChatModalOpen(true);
  };

  // --- Safe data fallbacks ---
  const name = profile?.user?.name || "Unknown User";
  const userId = profile?.user_id || 0;
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
              "{bio.substring(0, 150)}
              {bio.length > 150 ? "..." : ""}"
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

      {/* 🚨 Alert Modal */}
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

      {/* 💬 Chat Modal */}
      {chatModalOpen && (
        <ChatModal
          onClose={() => setChatModalOpen(false)}
          receiverId={userId} // only receiver id passed
        />
      )}
    </>
  );
};

export default ProfileHeader;
