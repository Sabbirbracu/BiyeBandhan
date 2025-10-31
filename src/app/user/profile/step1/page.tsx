// "use client";

// import { useRouter } from "next/navigation";
// import { ChangeEvent, FormEvent, useState, useEffect } from "react";
// import { createProfileStep1 } from "../../../../service/ProfileService";
// import { getCurrentUser } from "../../../../service/authService/index";

// interface FormData {
//   gender: string;
//   dob: string;
//   marital_status: string;
//   height_feet: string;
//   weight_kg: string;
//   blood_group: string;
//   mother_tongue: string;
//   religion: string;
//   caste: string;
//   sub_caste: string;
//   bio: string;
// }

// export default function Step1Page() {
//   const router = useRouter();

//   const [formData, setFormData] = useState<FormData>({
//     gender: "",
//     dob: "",
//     marital_status: "",
//     height_feet: "",
//     weight_kg: "",
//     blood_group: "",
//     mother_tongue: "",
//     religion: "",
//     caste: "",
//     sub_caste: "",
//     bio: "",
//   });

//   const [userId, setUserId] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const user = await getCurrentUser();
//       if (user?.id) {
//         setUserId(user.id);
//       } else {
//         console.error("No logged-in user found. Redirect to login.");
//         router.push("/login");
//       }
//     };
//     fetchUser();
//   }, [router]);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!userId) {
//       console.error("User ID not available. Cannot submit form.");
//       return;
//     }

//     try {
//       const response = await createProfileStep1({
//         ...formData,
//         user_id: userId,
//       });

//       if (response && response.id) {
//         router.push("/user/profile/step2");
//       } else {
//         console.error("Profile creation failed:", response.message);
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-10">
//       <h2 className="text-2xl font-bold mb-6">Step 1: Basic Profile Details</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-md p-6 space-y-5"
//       >
//         {/* Gender */}
//         <div>
//           <label className="block font-medium mb-1">Gender</label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//             required
//           >
//             <option value="">Select gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {/* Date of Birth */}
//         <div>
//           <label className="block font-medium mb-1">Date of Birth</label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           />
//         </div>

//         {/* Marital Status */}
//         <div>
//           <label className="block font-medium mb-1">Marital Status</label>
//           <select
//             name="marital_status"
//             value={formData.marital_status}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           >
//             <option value="">Select</option>
//             <option value="never_married">Never Married</option>
//             <option value="divorced">Divorced</option>
//             <option value="widow">Widow</option>
//             <option value="separated">Separated</option>
//           </select>
//         </div>

//         {/* Height */}
//         <div>
//           <label className="block font-medium mb-1">Height (in feet)</label>
//           <input
//             type="number"
//             name="height_feet"
//             value={formData.height_feet}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           />
//         </div>

//         {/* Weight */}
//         <div>
//           <label className="block font-medium mb-1">Weight (kg)</label>
//           <input
//             type="number"
//             name="weight_kg"
//             value={formData.weight_kg}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           />
//         </div>

//         {/* Blood Group */}
//         <div>
//           <label className="block font-medium mb-1">Blood Group</label>
//           <select
//             name="blood_group"
//             value={formData.blood_group}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           >
//             <option value="">Select</option>
//             <option value="A+">A+</option>
//             <option value="A-">A-</option>
//             <option value="B+">B+</option>
//             <option value="B-">B-</option>
//             <option value="O+">O+</option>
//             <option value="O-">O-</option>
//             <option value="AB+">AB+</option>
//             <option value="AB-">AB-</option>
//           </select>
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block font-medium mb-1">Short Bio</label>
//           <textarea
//             name="bio"
//             value={formData.bio}
//             onChange={handleChange}
//             rows={4}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//             placeholder="Tell us something about yourself..."
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition"
//         >
//           Save & Continue
//         </button>
//       </form>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState, ChangeEvent, FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import {
//   createOrUpdateProfileStep1,
//   getProfileStep1,
//   ProfileStep1Response,
// } from "../../../../service/ProfileService";
// import { getCurrentUser } from "../../../../service/authService";

// interface FormData {
//   gender: string;
//   dob: string;
//   marital_status: string;
//   height_feet: string;
//   weight_kg: string;
//   blood_group: string;
//   mother_tongue: string;
//   religion: string;
//   caste: string;
//   sub_caste: string;
//   bio: string;
// }

// export default function Step1Page() {
//   const router = useRouter();

//   const [formData, setFormData] = useState<FormData>({
//     gender: "",
//     dob: "",
//     marital_status: "",
//     height_feet: "",
//     weight_kg: "",
//     blood_group: "",
//     mother_tongue: "",
//     religion: "",
//     caste: "",
//     sub_caste: "",
//     bio: "",
//   });

//   const [userId, setUserId] = useState<number | null>(null);
//   const [profileId, setProfileId] = useState<number | null>(null);

//   // ✅ Fetch current user & profile
//   useEffect(() => {
//     const fetchUserAndProfile = async () => {
//       const user = await getCurrentUser();
//       if (!user?.id) {
//         router.push("/login");
//         return;
//       }
//       setUserId(user.id);

//       const profile: ProfileStep1Response | null = await getProfileStep1(user.id);
//       if (profile?.id) {
//         setProfileId(profile.id);
//         setFormData({
//           gender: profile.gender || "",
//           dob: profile.dob || "",
//           marital_status: profile.marital_status || "",
//           height_feet: profile.height_feet?.toString() || "",
//           weight_kg: profile.weight_kg?.toString() || "",
//           blood_group: profile.blood_group || "",
//           mother_tongue: profile.mother_tongue || "",
//           religion: profile.religion || "",
//           caste: profile.caste || "",
//           sub_caste: profile.sub_caste || "",
//           bio: profile.bio || "",
//         });
//       }
//     };

//     fetchUserAndProfile();
//   }, [router]);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!userId) return;

//     const response = await createOrUpdateProfileStep1(
//       { ...formData, user_id: userId },
//       profileId || undefined
//     );

//     if (response?.id) {
//       router.push("/user/profile/step2");
//     } else {
//       console.error("Profile save failed:", response.message);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-10">
//       <h2 className="text-2xl font-bold mb-6">Step 1: Basic Profile Details</h2>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-md p-6 space-y-5"
//       >
//         {/* Gender */}
//         <div>
//           <label className="block font-medium mb-1">Gender</label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//             required
//           >
//             <option value="">Select gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {/* Date of Birth */}
//         <div>
//           <label className="block font-medium mb-1">Date of Birth</label>
//           <input
//             type="date"
//             name="dob"
//             value={formData.dob}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           />
//         </div>

//         {/* Marital Status */}
//         <div>
//           <label className="block font-medium mb-1">Marital Status</label>
//           <select
//             name="marital_status"
//             value={formData.marital_status}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           >
//             <option value="">Select</option>
//             <option value="never_married">Never Married</option>
//             <option value="divorced">Divorced</option>
//             <option value="widow">Widow</option>
//             <option value="separated">Separated</option>
//           </select>
//         </div>

//         {/* Height */}
//         <div>
//           <label className="block font-medium mb-1">Height (in feet)</label>
//           <input
//             type="number"
//             name="height_feet"
//             value={formData.height_feet}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           />
//         </div>

//         {/* Weight */}
//         <div>
//           <label className="block font-medium mb-1">Weight (kg)</label>
//           <input
//             type="number"
//             name="weight_kg"
//             value={formData.weight_kg}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           />
//         </div>

//         {/* Blood Group */}
//         <div>
//           <label className="block font-medium mb-1">Blood Group</label>
//           <select
//             name="blood_group"
//             value={formData.blood_group}
//             onChange={handleChange}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//           >
//             <option value="">Select</option>
//             <option value="A+">A+</option>
//             <option value="A-">A-</option>
//             <option value="B+">B+</option>
//             <option value="B-">B-</option>
//             <option value="O+">O+</option>
//             <option value="O-">O-</option>
//             <option value="AB+">AB+</option>
//             <option value="AB-">AB-</option>
//           </select>
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="block font-medium mb-1">Short Bio</label>
//           <textarea
//             name="bio"
//             value={formData.bio}
//             onChange={handleChange}
//             rows={4}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full"
//             placeholder="Tell us something about yourself..."
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition"
//         >
//           Save & Continue
//         </button>
//       </form>
//     </div>
//   );
// }





"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { createProfileStep1, getProfileByUser, updateProfileStep1 } from "../../../../service/ProfileService";
import { getCurrentUser } from "../../../../service/authService/index";

interface FormData {
  gender: string;
  dob: string;
  marital_status: string;
  height_feet: string;
  weight_kg: string;
  blood_group: string;
  mother_tongue: string;
  religion: string;
  caste: string;
  sub_caste: string;
  bio: string;
}

export default function Step1Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    gender: "",
    dob: "",
    marital_status: "",
    height_feet: "",
    weight_kg: "",
    blood_group: "",
    mother_tongue: "",
    religion: "",
    caste: "",
    sub_caste: "",
    bio: "",
  });

  const [userId, setUserId] = useState<number | null>(null);
  const [profileId, setProfileId] = useState<number | null>(null); // store existing profile ID

  useEffect(() => {
  const fetchProfile = async () => {
    const user = await getCurrentUser();
    if (!user?.id) return router.push("/login");

    setUserId(user.id);

    const profile = await getProfileByUser(user.id);
    if (profile) {
      setFormData({
        gender: profile.gender || "",
        dob: profile.dob || "",
        marital_status: profile.marital_status || "",
        height_feet: profile.height_feet?.toString() || "",
        weight_kg: profile.weight_kg?.toString() || "",
        blood_group: profile.blood_group || "",
        mother_tongue: profile.mother_tongue || "",
        religion: profile.religion || "",
        caste: profile.caste || "",
        sub_caste: profile.sub_caste || "",
        bio: profile.bio || "",
      });
      setProfileId(profile.id); // store for update
    }
  };

  fetchProfile();
}, [router]);


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!userId) return;

  try {
    let response;
    if (profileId) {
      response = await updateProfileStep1(profileId, { ...formData, user_id: userId });
    } else {
      response = await createProfileStep1({ ...formData, user_id: userId });
      if (response?.id) setProfileId(response.id);
    }

    if (response) router.push("/user/profile/step2");
  } catch (error) {
    console.error("Profile submission failed:", error);
  }
};


  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Step 1: Basic Profile Details</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">
        {/* Form fields like before */}
                {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        {/* Marital Status */}
        <div>
          <label className="block font-medium mb-1">Marital Status</label>
          <select
            name="marital_status"
            value={formData.marital_status}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select</option>
            <option value="never_married">Never Married</option>
            <option value="divorced">Divorced</option>
            <option value="widow">Widow</option>
            <option value="separated">Separated</option>
          </select>
        </div>

        {/* Height */}
        <div>
          <label className="block font-medium mb-1">Height (in feet)</label>
          <input
            type="number"
            name="height_feet"
            value={formData.height_feet}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block font-medium mb-1">Weight (kg)</label>
          <input
            type="number"
            name="weight_kg"
            value={formData.weight_kg}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-medium mb-1">Blood Group</label>
          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium mb-1">Short Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            placeholder="Tell us something about yourself..."
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
