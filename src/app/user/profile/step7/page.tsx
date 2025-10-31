"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCurrentUser } from "../../../../service/authService/index";
import { getProfileByUser } from "../../../../service/ProfileService";
import { getPreferenceByProfile, createPreference, updatePreference } from "../../../../service/PartnerPreferenceService";

interface FormData {
  preferred_age_min: number | "";
  preferred_age_max: number | "";
  preferred_height_min: number | "";
  preferred_height_max: number | "";
  preferred_religion: string;
  preferred_caste: string;
  preferred_education: string;
  preferred_country: string;
  preferred_profession: string;
  other_expectations: string;
}

export default function Step7Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    preferred_age_min: "",
    preferred_age_max: "",
    preferred_height_min: "",
    preferred_height_max: "",
    preferred_religion: "",
    preferred_caste: "",
    preferred_education: "",
    preferred_country: "",
    preferred_profession: "",
    other_expectations: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [preferenceId, setPreferenceId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPreference = async () => {
      const user = await getCurrentUser();
      if (!user?.id) return router.push("/login");

      const profile = await getProfileByUser(user.id);
      if (!profile?.id) return console.error("Profile not found");

      setProfileId(profile.id);

      const preference = await getPreferenceByProfile(profile.id);
      if (preference) {
        setFormData({
          preferred_age_min: preference.preferred_age_min || "",
          preferred_age_max: preference.preferred_age_max || "",
          preferred_height_min: preference.preferred_height_min || "",
          preferred_height_max: preference.preferred_height_max || "",
          preferred_religion: preference.preferred_religion || "",
          preferred_caste: preference.preferred_caste || "",
          preferred_education: preference.preferred_education || "",
          preferred_country: preference.preferred_country || "",
          preferred_profession: preference.preferred_profession || "",
          other_expectations: preference.other_expectations || "",
        });
        setPreferenceId(preference.id);
      }
    };

    fetchPreference();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profileId) return;

    try {
      const payload = { ...formData, profile_id: profileId };

      if (preferenceId) {
        await updatePreference(preferenceId, payload);
      } else {
        const response = await createPreference(payload);
        if (response?.id) setPreferenceId(response.id);
      }

      router.push("/user/profile/step8"); // next step
    } catch (error) {
      console.error("Preference submission failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Step 7: Partner Preferences</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Preferred Age (Min)</label>
            <input
              type="number"
              name="preferred_age_min"
              value={formData.preferred_age_min}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Preferred Age (Max)</label>
            <input
              type="number"
              name="preferred_age_max"
              value={formData.preferred_age_max}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Preferred Height (Min)</label>
            <input
              type="number"
              name="preferred_height_min"
              value={formData.preferred_height_min}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Preferred Height (Max)</label>
            <input
              type="number"
              name="preferred_height_max"
              value={formData.preferred_height_max}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Preferred Religion</label>
          <input
            type="text"
            name="preferred_religion"
            value={formData.preferred_religion}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Preferred Caste</label>
          <input
            type="text"
            name="preferred_caste"
            value={formData.preferred_caste}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Preferred Education</label>
          <input
            type="text"
            name="preferred_education"
            value={formData.preferred_education}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Preferred Country</label>
          <input
            type="text"
            name="preferred_country"
            value={formData.preferred_country}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Preferred Profession</label>
          <input
            type="text"
            name="preferred_profession"
            value={formData.preferred_profession}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Other Expectations</label>
          <textarea
            name="other_expectations"
            value={formData.other_expectations}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            rows={3}
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
