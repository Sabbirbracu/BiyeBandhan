"use client";
import { ChevronRight, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/service/authService";
import { toast } from "sonner";

const SidebarNavigation = () => {
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
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item}
            className="w-full flex items-center justify-between text-gray-700 hover:text-rose-500 hover:bg-rose-50 py-2 px-3 rounded-lg transition-all text-sm font-medium"
          >
            <span>{item}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ))}
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between text-red-600 hover:text-red-700 hover:bg-red-50 py-2 px-3 rounded-lg transition-all text-sm font-medium mt-4"
        >
          <span>Logout</span>
          <LogOut className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
};

export default SidebarNavigation;

