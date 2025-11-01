"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/dashboard/Header";
import UserSidebar from "@/components/ui/dashboard/UserSidebar";
import Modal from "@/components/ui/Modal";
import PaymentForm from "@/components/ui/dashboard/PaymentForm";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const res = await fetch("/api/user/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        console.error("Error fetching user:", err);
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Header user={user} />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        <UserSidebar
          user={user}
          onPaymentClick={() => setIsPaymentModalOpen(true)}
        />

        {/* Page-specific content */}
        <main className="flex-1 ml-72 overflow-y-auto">{children}</main>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      >
        <h2 className="text-xl font-semibold mb-4">Submit Payment</h2>
        <PaymentForm onSuccess={() => setIsPaymentModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default UserLayout;
