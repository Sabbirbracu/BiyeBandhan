"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCurrentUser } from "../../../../service/authService/index";
import {
    createLocation,
    getLocationByProfile,
    updateLocation,
} from "../../../../service/LocationService";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  present_address: string;
  permanent_address: string;
  city: string;
  address: string;
  nationality: string;
  residence_status: string;
  living_status: string;
}

export default function Step5Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    present_address: "",
    permanent_address: "",
    city: "",
    address: "",
    nationality: "",
    residence_status: "",
    living_status: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);

  useEffect(() => {
  const fetchLocation = async () => {
    const user = await getCurrentUser();
    if (!user?.id) return router.push("/login");

    const profile = await getProfileByUser(user.id);
    if (!profile?.id) return console.error("Profile not found");

    setProfileId(profile.id);

    const location = await getLocationByProfile(profile.id);
    console.log("Fetched location:", location); // <-- debug
    if (location) {
      setFormData({
        present_address: location.present_address || "",
        permanent_address: location.permanent_address || "",
        city: location.city || "",
        address: location.address || "",
        nationality: location.nationality || "",
        residence_status: location.residence_status || "",
        living_status: location.living_status || "",
      });
      setLocationId(location.id);
    }
  };

  fetchLocation();
}, [router]);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profileId) return;

    try {
      const payload = { ...formData, profile_id: profileId };

      let response;
      if (locationId) {
        response = await updateLocation(locationId, payload);
        console.log("Location updated:", response);
      } else {
        response = await createLocation(payload);
        console.log("Location created:", response);
        if (response?.id) setLocationId(response.id);
      }

      router.push("/user/profile/step6"); // next step
    } catch (error) {
      console.error("Location submission failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Step 5: Location Details</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">
        <div>
          <label className="block font-medium mb-1">Present Address</label>
          <input
            type="text"
            name="present_address"
            value={formData.present_address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Permanent Address</label>
          <input
            type="text"
            name="permanent_address"
            value={formData.permanent_address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Residence Status</label>
          <select
            name="residence_status"
            value={formData.residence_status}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select</option>
            <option value="citizen">Citizen</option>
            <option value="permanent_resident">Permanent Resident</option>
            <option value="work_permit">Work Permit</option>
            <option value="student_visa">Student Visa</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Living Status</label>
          <select
            name="living_status"
            value={formData.living_status}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select</option>
            <option value="renting">Renting</option>
            <option value="owned">Owned</option>
            <option value="with_family">With Family</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}
