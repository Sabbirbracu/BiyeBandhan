"use client";
import { ProfileData } from "@/types";
import { MapPin } from "lucide-react";
import React from "react";
import DetailCard from "./DetailCard";

interface Props { profile: ProfileData; age: string; }

const LocationBackground: React.FC<Props> = ({ profile, age }) => (
  <DetailCard icon={<MapPin className="text-rose-600" size={24} />} title="Location & Background" accentColorClass="text-rose-600">
    <div>Gender: {profile.gender}</div>
    <div>Age: {age} years</div>
    <div>Religion: {profile.religion}</div>
    <div>Marital Status: {profile.marital_status || "N/A"}</div>
    <div>Present Address: {profile.location?.present_address || "N/A"}</div>
    <div>Nationality: {profile.location?.nationality || "N/A"}</div>
  </DetailCard>
);

export default LocationBackground;