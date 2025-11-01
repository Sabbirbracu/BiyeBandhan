"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompleteProfileBanner from "../../../components/ui/dashboard/CompleteProfileBanner";
import DailyMatchesSection from "../../../components/ui/dashboard/DailyMatchesSection";
import Header from "../../../components/ui/dashboard/Header";
import MyShortlistedCard from "../../../components/ui/dashboard/MyShortlistedCard";
import SearchProfileForm from "../../../components/ui/dashboard/SearchProfileForm";
import TipsCard from "../../../components/ui/dashboard/TipCard";
import UserSidebar from "../../../components/ui/dashboard/UserSidebar";
import WhoViewedProfileCard from "../../../components/ui/dashboard/WhoViewedProfileCard";
import Modal from "../../../components/ui/Modal";
import PaymentForm from "../../../components/ui/dashboard/PaymentForm";

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // modal state
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
      {/* Full-width Header */}
      <Header user={user} />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar
          user={user}
          onPaymentClick={() => setIsPaymentModalOpen(true)} // pass callback
        />

        {/* Main Content */}
        <main className="flex-1 ml-72 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <CompleteProfileBanner />
                <SearchProfileForm />
                <DailyMatchesSection />
              </div>

              <div className="lg:col-span-4 space-y-6">
                <TipsCard />
                <WhoViewedProfileCard />
                <MyShortlistedCard />
              </div>
            </div>
          </div>
        </main>
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

export default DashboardPage;
