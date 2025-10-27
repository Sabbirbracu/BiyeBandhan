"use client";
import { logout } from "@/service/authService";
import { ChevronRight, Crown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserSidebarProps {
  userName?: string;
  isPremium?: boolean;
}

const UserSidebar = ({ userName = "User", isPremium = false }: UserSidebarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const menuItems = [
    "Edit Dashboard",
    "Edit Profile",
    "Photo Management",
    "Sent Messages (8)",
    "Partner Preferences",
    "Account Settings",
  ];

  return (
    <aside
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-gradient-to-br from-gray-950 to-rose-700 border-r border-gray-100 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center p-6 z-40"
    >

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6 mt-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold mb-3 ring-4 ring-white shadow-lg">
          {userName.charAt(0).toUpperCase()}
        </div>

        <h3 className="text-lg font-semibold text-gray-100">{userName}</h3>
        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full mt-1">
          online
        </span>
      </div>

      {/* Membership Progress */}
      <div className="w-full mb-5">
        <div className="flex justify-between text-xs text-gray-300 mb-1">
          <span>FREE Member</span>
          <span className="text-rose-500 font-semibold">Premium</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all"
            style={{ width: isPremium ? "100%" : "30%" }}
          ></div>
        </div>
      </div>

      {!isPremium && (
        <button className="w-full mb-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-rose-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2">
          <Crown className="h-4 w-4" />
          <span>Upgrade to Premium</span>
        </button>
      )}

      {/* Sidebar Menu */}
      <nav className="w-full space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item}
            className="w-full flex items-center justify-between text-gray-100 hover:text-rose-500 hover:bg-rose-50 py-2 px-3 rounded-lg transition-all text-sm font-medium"
          >
            <span>{item}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-between text-white hover:text-red-700 hover:bg-red-50 py-2 px-3 rounded-lg transition-all text-sm font-medium mt-6"
      >
        <span>Logout</span>
        <LogOut className="h-4 w-4" />
      </button>
    </aside>
  );
};

export default UserSidebar;
