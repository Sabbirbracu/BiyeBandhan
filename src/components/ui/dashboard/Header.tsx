"use client";

import { logout } from "@/service/authService";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface UserType {
  name?: string;
  email?: string;
  profileImage?: string;
}

interface HeaderProps {
  user?: UserType | null;
  onLogout?: () => void; // Optional logout handler
}

const Header: React.FC<HeaderProps> = ({ user}) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLink = [
    { name: "Search", path: "/user/search" },
    { name: "Success Stories", path: "/stories" },
    { name: "Packages", path: "/packages" },
    { name: "Help", path: "/help" },
  ];

  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  const fallbackAvatar = "/fallback-avatar.png"; // Place in /public

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <header className="bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-rose-500" />
            <span className="text-2xl font-extrabold text-gray-200">
              BiyeBandhan
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLink.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-gray-200 font-bold hover:text-rose-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Profile Section */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              {user?.profileImage ? (
                <Image
                  src={user.profileImage}
                  alt={user.name || "User Avatar"}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-gray-700 shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center text-white font-semibold shadow-sm">
                  {userInitial}
                </div>
              )}
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100"
                >
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-2 text-gray-500" />
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition"
                  >
                    <LogOut className="h-4 w-4 mr-2 text-rose-500" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
