"use client";

import Header from "@/components/ui/dashboard/Header";
import UserSidebar from "@/components/ui/dashboard/UserSidebar";
import { getCurrentUser } from "@/service/authService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchProfileForm from "../../../components/ui/dashboard/SearchProfileForm";


export default function SearchPage(){
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

      const userName = user?.name || user?.email?.split("@")[0] || "User";
    return (
        <>
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex flex-1">
                <UserSidebar user={user}/>

                <main className="flex-1 ml-72 px-10 py-10 overflow-hidden">
                    <SearchProfileForm />
                </main>

            </div>

        </div>
        </>
    )
}

