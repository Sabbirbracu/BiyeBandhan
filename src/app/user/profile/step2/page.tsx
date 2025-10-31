"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getCurrentUser } from "../../../../service/authService/index";
import { createEducation, getEducationByProfile, updateEducation } from "../../../../service/EducationService";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  Heighets_degree: string;
  institute_name: string;
  graduation_year: number;
  additional_certificates?: string;
}

export default function Step2Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    Heighets_degree: "",
    institute_name: "",
    graduation_year: new Date().getFullYear(),
    additional_certificates: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [educationId, setEducationId] = useState<number | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      const user = await getCurrentUser();
      if (!user?.id) return router.push("/login");

      // Get user's profile
      const profile = await getProfileByUser(user.id);
      if (!profile?.id) return console.error("Profile not found");

      setProfileId(profile.id);

      // Get existing education by profile
      const edu = await getEducationByProfile(profile.id);
      if (edu) {
        setFormData({
          Heighets_degree: edu.Heighets_degree,
          institute_name: edu.institute_name,
          graduation_year: edu.graduation_year,
          additional_certificates: edu.additional_certificates || "",
        });
        setEducationId(edu.id);
      }
    };

    fetchEducation();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profileId) return;

    try {
      const payload = { ...formData, profile_id: profileId };

      let response;
      if (educationId) {
        response = await updateEducation(educationId, payload);
        console.log("Education updated:", response);
      } else {
        response = await createEducation(payload);
        console.log("Education created:", response);
        if (response?.id) setEducationId(response.id);
      }

      router.push("/user/profile/step3");
    } catch (error) {
      console.error("Education submission failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Step 2: Education Details</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">
        <div>
          <label className="block font-medium mb-1">Highest Degree</label>
          <input
            type="text"
            name="Heighets_degree"
            value={formData.Heighets_degree}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Institute Name</label>
          <input
            type="text"
            name="institute_name"
            value={formData.institute_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Graduation Year</label>
          <input
            type="number"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Certificates</label>
          <textarea
            name="additional_certificates"
            value={formData.additional_certificates || ""}
            onChange={handleChange}
            rows={3}
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
