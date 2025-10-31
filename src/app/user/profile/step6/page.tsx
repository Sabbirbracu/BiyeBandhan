"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCurrentUser } from "../../../../service/authService/index";
import {
  createLifestyle,
  getLifestyleByProfile,
  updateLifestyle,
} from "../../../../service/LifestyleService";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  diet: string;
  smoking: string;
  drinking: string;
  hobbies: string;
}

export default function Step6Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    diet: "",
    smoking: "",
    drinking: "",
    hobbies: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [lifestyleId, setLifestyleId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLifestyle = async () => {
      const user = await getCurrentUser();
      if (!user?.id) return router.push("/login");

      const profile = await getProfileByUser(user.id);
      if (!profile?.id) return console.error("Profile not found");

      setProfileId(profile.id);

      const lifestyle = await getLifestyleByProfile(profile.id);
      if (lifestyle) {
        setFormData({
          diet: lifestyle.diet || "",
          smoking: lifestyle.smoking || "",
          drinking: lifestyle.drinking || "",
          hobbies: lifestyle.hobbies || "",
        });
        setLifestyleId(lifestyle.id);
      }
    };

    fetchLifestyle();
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
      if (lifestyleId) {
        response = await updateLifestyle(lifestyleId, payload);
        console.log("Lifestyle updated:", response);
      } else {
        response = await createLifestyle(payload);
        console.log("Lifestyle created:", response);
        if (response?.id) setLifestyleId(response.id);
      }

      router.push("/user/profile/step7"); // next step
    } catch (error) {
      console.error("Lifestyle submission failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Step 6: Lifestyle Details</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">
        <div>
          <label className="block font-medium mb-1">Diet</label>
          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non_vegetarian">Non-Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="halal">Halal</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Smoking</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="occasionally">Occasionally</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Drinking</label>
          <select
            name="drinking"
            value={formData.drinking}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="occasionally">Occasionally</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Hobbies</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
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
