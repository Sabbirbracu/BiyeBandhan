"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookUser, Calendar, Eye, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Profile {
  id: number;
  user_name: string;
  user_id: number;
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

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const fallbackImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const getAge = (dob: string) => {
    const birth = new Date(dob);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
  };

  const profession = profile.career?.[0]?.profession || profile.career?.[0]?.job_title || "N/A";
  const education = profile.education?.[0]?.Heighets_degree || profile.education?.[0]?.institute_name || "N/A";
  const locationName = profile.location?.city || profile.location?.present_address || "N/A";

  return (
    <Card className="flex flex-col sm:flex-row w-full p-0 bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden">
      
      {/* Avatar - Centered on mobile, left aligned on desktop */}
      <div className="flex justify-center items-center sm:items-start sm:justify-start w-full sm:w-48 p-4 sm:p-5 relative">
        <div className="relative">
          <img
            src={profile.photo || fallbackImage}
            alt={profile.user_name || `Profile ${profile.id}`}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-rose-500 object-cover object-center shadow-md"
          />
          {profile.verified && (
            <div className="absolute bottom-1 right-1 bg-green-500 p-1.5 rounded-full shadow-md">
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Details - Stacked on mobile, normal on desktop */}
      <CardContent className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div className="space-y-3 sm:space-y-0">
          {/* Name */}
          <h3 className="text-lg font-bold text-gray-900 truncate text-center sm:text-left">{profile.user_name}</h3>

          {/* Key Info - Stacked on mobile, inline on desktop */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-gray-700 text-sm">
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <Calendar className="h-4 w-4 text-rose-500" /> {getAge(profile.dob)} yrs
            </span>
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <ShieldCheck className="h-4 w-4 text-rose-500" /> {profile.marital_status || "N/A"}
            </span>
          </div>

          {/* Career / Education / Location - Stacked on mobile, inline on desktop */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-gray-600 text-sm">
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <BookUser className="h-4 w-4 text-purple-500" /> 
              <span className="truncate max-w-[200px] sm:max-w-none">{profession}</span>
            </span>
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <GraduationCap className="h-4 w-4 text-purple-500" /> 
              <span className="truncate max-w-[200px] sm:max-w-none">{education}</span>
            </span>
            <span className="flex items-center gap-1.5 justify-center sm:justify-start">
              <MapPin className="h-4 w-4 text-purple-500" /> 
              <span className="truncate max-w-[200px] sm:max-w-none">{locationName}</span>
            </span>
          </div>
        </div>
      </CardContent>

      {/* View Profile Button - Full width on mobile, normal on desktop */}
      <div className="w-full sm:w-1/5 flex p-4 sm:p-5">
        <Link href={`/user/view-profile/${profile.user_id}`} className="w-full">
          <Button
            size="sm"
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-200 text-sm"
          >
            <Eye className="h-4 w-4" /> 
            <span className="sm:inline">View Profile</span>
          </Button>
        </Link>
      </div>
    </Card>
  );
}