"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { createCareer, getCareerByProfile, updateCareer } from "../../../../service/CareerService";
import { getCurrentUser } from "../../../../service/authService/index";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  profession: string;
  job_title: string;
  company: string;
  annual_income: number;
}

export default function Step3Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    profession: "",
    job_title: "",
    company: "",
    annual_income: 0,
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [careerId, setCareerId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCareer = async () => {
      const user = await getCurrentUser();
      if (!user?.id) return router.push("/login");

      const profile = await getProfileByUser(user.id);
      if (!profile?.id) return console.error("Profile not found");

      setProfileId(profile.id);

      const career = await getCareerByProfile(profile.id);
      if (career) {
        setFormData({
          profession: career.profession,
          job_title: career.job_title,
          company: career.company,
          annual_income: career.annual_income,
        });
        setCareerId(career.id);
      }
    };

    fetchCareer();
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      if (careerId) {
        response = await updateCareer(careerId, payload);
        console.log("Career updated:", response);
      } else {
        response = await createCareer(payload);
        console.log("Career created:", response);
        if (response?.id) setCareerId(response.id);
      }

      router.push("/user/profile/step4"); // next step
    } catch (error) {
      console.error("Career submission failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Step 3: Career Details</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">
        <div>
          <label className="block font-medium mb-1">Profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Job Title</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Annual Income</label>
          <input
            type="number"
            name="annual_income"
            value={formData.annual_income}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
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
