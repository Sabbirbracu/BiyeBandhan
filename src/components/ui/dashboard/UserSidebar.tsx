"use client";

import { logout } from "@/service/authService";
import clsx from "clsx";
import { ChevronRight, Crown, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserSidebarProps {
  userName?: string;
  isPremium?: boolean;
}

const UserSidebar = ({ userName = "User", isPremium = false }: UserSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "Edit Profile", path: "/user/edit-profile" },
    { name: "Photo Management", path: "/user/photos" },
    { name: "Messages (8)", path: "/user/messages" },
    { name: "Partner Preferences", path: "/user/preferences" },
    { name: "Account Settings", path: "/user/settings" },
  ];

  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-gradient-to-br from-gray-950 to-rose-700 border-r border-gray-100 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center p-6 z-40" >
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6 mt-3">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold mb-2 ring-4 ring-white/10 shadow-lg">
          {userName.charAt(0).toUpperCase()}
        </div>
        <h3 className="text-base font-semibold text-gray-100">{userName}</h3>
        <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full mt-1">
          Online
        </span>
      </div>

      {/* Membership Progress */}
      <div className="w-full mb-4">
        <div className="flex justify-between text-xs text-gray-300 mb-1">
          <span>Membership</span>
          <span className="text-amber-400 font-semibold">
            {isPremium ? "Premium" : "Free"}
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full"
            style={{ width: isPremium ? "100%" : "30%" }}
          ></div>
        </div>
      </div>

      {!isPremium && (
        <button className="w-full mb-5 bg-gradient-to-r from-rose-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-rose-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2 text-sm shadow-sm">
          <Crown className="h-4 w-4" />
          <span>Upgrade to Premium</span>
        </button>
      )}

      {/* Sidebar Menu */}
      <nav className="w-full space-y-1 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path}>
              <button
                className={clsx(
                  "w-full flex items-center justify-between py-2 px-3 rounded-md text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-gray-300 hover:bg-rose-50/10 hover:text-rose-300"
                )}
              >
                <span>{item.name}</span>
                <ChevronRight
                  className={clsx(
                    "h-4 w-4 transition-transform duration-200",
                    isActive && "rotate-90"
                  )}
                />
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-between text-white hover:text-red-600 hover:bg-red-50/10 py-2 px-3 rounded-md transition-all text-sm font-medium"
      >
        <span>Logout</span>
        <LogOut className="h-4 w-4" />
      </button>
    </aside>
  );
};

export default UserSidebar;
