"use client";

import SearchProfileForm from "@/components/ui/dashboard/SearchProfileForm";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-10 overflow-hidden">
          <SearchProfileForm />
        </main>
      </div>
    </div>
  );
}
