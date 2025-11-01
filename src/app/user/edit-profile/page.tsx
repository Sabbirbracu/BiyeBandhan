"use client";

import Header from "@/components/ui/dashboard/Header";
import UserSidebar from "@/components/ui/dashboard/UserSidebar";
// import EditProfileForm from "@/components/ui/dashboard/EditProfileForm";
import { getCurrentUser } from "@/service/authService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfilePage() {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <div className="flex flex-1">

        <main className="flex-1 ml-72 p-10 overflow-hidden">
          {/* <EditProfileForm user={user} /> */}
        </main>
      </div>
    </div>
  );
}
