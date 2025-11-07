"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// Assuming you renamed the final horizontal card to a clearer name
import ProfileCard from "@/components/ui/ProfileCard";

interface Profile {
  id: number;
  user_name: string;
  user_id:number;
  name?: string;
  dob: string;
  gender: string;
  religion: string;
  marital_status: string;
  verified?: boolean;
  photo?: string;
  education?: { id: number; profile_id: number; Heighets_degree?: string; institute_name?: string; graduation_year?: string }[];
  location?: { id: number; profile_id: number; present_address?: string; permanent_address?: string; city?: string; nationality?: string };
  career?: { id: number; profile_id: number; profession?: string; designation?: string; company_name?: string; job_title?: string }[];
}

// ... (fetchProfiles logic remains the same) ...

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setError("");

      const params = {
        gender: searchParams.get("gender") || "",
        age_from: Number(searchParams.get("age_from") || 18),
        age_to: Number(searchParams.get("age_to") || 40),
        religion: searchParams.get("religion") || "",
        marital_status: searchParams.get("marital_status") || "",
      };

      const token = localStorage.getItem("accessToken") || "";

      try {
        const res = await fetch("/api/user/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          const profileList = Array.isArray(data.data?.data) ? data.data.data : [];
          setProfiles(profileList);
        } else {
          setProfiles([]);
          setError(data.message || "No profiles found");
        }
      } catch (err) {
        console.error(err);
        setProfiles([]);
        setError("Failed to fetch profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [searchParams]);

  if (loading)
    return (
      <div className="flex justify-center p-12">
          <p className="text-center text-gray-500 font-semibold text-lg">
            Loading profiles...
          </p>
      </div>
    );

  if (error || profiles.length === 0)
    return (
      <div className="flex justify-center p-12">
          <p className="text-center text-red-500 font-semibold text-lg">
            {error || "No matching profiles found. Try broadening your search criteria."}
          </p>
      </div>
    );

  return (
    // Outer container: Added `min-h-screen` and adjusted padding
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Showing {profiles.length} Matched Profiles
      </h2>
      
      {/* List Container: Uses a flex column with a fixed gap between cards */}
      <div className="flex flex-col gap-5">
        {profiles.map((profile) => (
          // Use the final horizontal card component
          <ProfileCard 
            key={profile.id} 
            profile={profile} 
          />
        ))}
      </div>
    </div>
  );
}