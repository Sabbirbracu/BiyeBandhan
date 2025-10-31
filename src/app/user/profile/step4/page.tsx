"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import {
  createFamilyDetail,
  getFamilyDetailByProfile,
  updateFamilyDetail,
} from "../../../../service/FamilyDetailService";
import { getCurrentUser } from "../../../../service/authService/index";
import { getProfileByUser } from "../../../../service/ProfileService";

interface FormData {
  father_name: string;
  father_occupation: string;
  mother_name: string;
  mother_occupation: string;
  brothers_unmarried: number;
  brothers_married: number;
  sisters_unmarried: number;
  sisters_married: number;
  family_details: string;
}

export default function Step4Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    father_name: "",
    father_occupation: "",
    mother_name: "",
    mother_occupation: "",
    brothers_unmarried: 0,
    brothers_married: 0,
    sisters_unmarried: 0,
    sisters_married: 0,
    family_details: "",
  });

  const [profileId, setProfileId] = useState<number | null>(null);
  const [familyId, setFamilyId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFamily = async () => {
      const user = await getCurrentUser();
      if (!user?.id) return router.push("/login");

      const profile = await getProfileByUser(user.id);
      if (!profile?.id) return console.error("Profile not found");

      setProfileId(profile.id);

      const family = await getFamilyDetailByProfile(profile.id);
      if (family) {
        setFormData({
          father_name: family.father_name || "",
          father_occupation: family.father_occupation || "",
          mother_name: family.mother_name || "",
          mother_occupation: family.mother_occupation || "",
          brothers_unmarried: family.brothers_unmarried || 0,
          brothers_married: family.brothers_married || 0,
          sisters_unmarried: family.sisters_unmarried || 0,
          sisters_married: family.sisters_married || 0,
          family_details: family.family_details || "",
        });
        setFamilyId(family.id);
      }
    };

    fetchFamily();
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
      if (familyId) {
        response = await updateFamilyDetail(familyId, payload);
        console.log("Family detail updated:", response);
      } else {
        response = await createFamilyDetail(payload);
        console.log("Family detail created:", response);
        if (response?.id) setFamilyId(response.id);
      }

      router.push("/user/profile/step5"); // next step
    } catch (error) {
      console.error("Family detail submission failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Step 4: Family Details</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">
        <div>
          <label className="block font-medium mb-1">Father's Name</label>
          <input
            type="text"
            name="father_name"
            value={formData.father_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Father's Occupation</label>
          <input
            type="text"
            name="father_occupation"
            value={formData.father_occupation}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mother's Name</label>
          <input
            type="text"
            name="mother_name"
            value={formData.mother_name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mother's Occupation</label>
          <input
            type="text"
            name="mother_occupation"
            value={formData.mother_occupation}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Brothers Unmarried</label>
            <input
              type="number"
              name="brothers_unmarried"
              value={formData.brothers_unmarried}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Brothers Married</label>
            <input
              type="number"
              name="brothers_married"
              value={formData.brothers_married}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Sisters Unmarried</label>
            <input
              type="number"
              name="sisters_unmarried"
              value={formData.sisters_unmarried}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Sisters Married</label>
            <input
              type="number"
              name="sisters_married"
              value={formData.sisters_married}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Additional Family Details</label>
          <textarea
            name="family_details"
            value={formData.family_details}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            rows={4}
          ></textarea>
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
