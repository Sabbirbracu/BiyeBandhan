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
    // ... (state initialization remains unchanged)
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
  const [profileId, setProfileId] = useState<number | null>(null);

  // ... (useEffect and handleChange logic remains unchanged)
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
        setProfileId(profile.id);
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
  
  // --- NEW: Handle Back Button Navigation ---
  const handleBack = () => {
    router.push("/user/dashboard");
  };
  // ------------------------------------------


  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* CARD CONTAINER with Dashboard Vibe */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* HEADER: Gradient Background for Title */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-rose-600 to-orange-400">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="opacity-90">Step 1:</span> Basic Profile Details
          </h2>
          <p className="mt-1 text-rose-50 text-sm opacity-90">
            Start building your profile—these details are key for matchmaking.
          </p>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
          
          {/* Section 1: Core Identity (Gender & DOB) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-7">
            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 appearance-none"
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>


          {/* Section 2: Physical & Marital Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-7">
            {/* Marital Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Marital Status</label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 appearance-none"
              >
                <option value="" disabled>Select</option>
                <option value="never_married">Never Married</option>
                <option value="divorced">Divorced</option>
                <option value="widow">Widow</option>
                <option value="separated">Separated</option>
              </select>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Height (in feet)</label>
              <input
                type="number"
                name="height_feet"
                value={formData.height_feet}
                onChange={handleChange}
                placeholder="e.g., 5.5 (for 5 feet 6 inches)"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight_kg"
                value={formData.weight_kg}
                onChange={handleChange}
                placeholder="e.g., 65"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          
          {/* Section 3: Background & Origin */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-7">
            {/* Mother Tongue */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mother Tongue</label>
              <input
                type="text"
                name="mother_tongue"
                value={formData.mother_tongue}
                onChange={handleChange}
                placeholder="e.g., Bengali"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>

            {/* Religion */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                placeholder="e.g., Muslim"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>

            {/* Caste */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Caste</label>
              <input
                type="text"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                placeholder="Optional"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
            
            {/* Sub-Caste */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sub-Caste</label>
              <input
                type="text"
                name="sub_caste"
                value={formData.sub_caste}
                onChange={handleChange}
                placeholder="Optional"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400"
              />
            </div>
          </div>
          
          {/* Section 4: Bio & Blood Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blood Group */}
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Blood Group</label>
              <select
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 appearance-none"
              >
                <option value="" disabled>Select</option>
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
            
            {/* Bio (takes up 2 columns) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Short Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition duration-150 ease-in-out hover:border-gray-400 resize-none"
                placeholder="Tell us something about yourself, your hobbies, and what you are looking for in a partner (max 500 characters)..."
              />
            </div>
          </div>


          {/* SUBMIT BUTTONS (Updated to include Back button) */}
          <div className="pt-6 flex justify-between gap-4">
            
            {/* Back Button */}
            <button
              type="button" // Important: use type="button" to prevent form submission
              onClick={handleBack}
              className="w-full sm:w-auto bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-bold text-lg 
                         hover:bg-gray-300 transition duration-300 ease-in-out shadow-md shadow-gray-400/30"
            >
              Back to Dashboard
            </button>
            
            {/* Save & Continue Button */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-rose-600 text-white px-8 py-3 rounded-lg font-bold text-lg 
                         hover:bg-rose-700 transition duration-300 ease-in-out shadow-lg shadow-rose-500/30 
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}






// "use client";

// import { useRouter } from "next/navigation";
// import { ChangeEvent, FormEvent, useState, useEffect } from "react";
// // Assuming you have a custom Button component, though I'll use raw Tailwind for simplicity here
// // import { Button } from "@/components/ui/button"; 
// // ... (imports remain unchanged)

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

// // Data for the Step Tracker (1 of 4 steps, for example)
// const steps = [
//     { id: '1', name: 'Basic Details', status: 'current' },
//     { id: '2', name: 'Education & Career', status: 'upcoming' },
//     { id: '3', name: 'Family & Contact', status: 'upcoming' },
//     { id: '4', name: 'Photos', status: 'upcoming' },
// ];

// export default function Step1Page() {
//   const router = useRouter();
//   // ... (State and logic remains unchanged)
  
//   const [formData, setFormData] = useState<FormData>({
//     gender: "", dob: "", marital_status: "", height_feet: "", weight_kg: "",
//     blood_group: "", mother_tongue: "", religion: "", caste: "", sub_caste: "",
//     bio: "",
//   });

//   const [userId, setUserId] = useState<number | null>(null);
//   const [profileId, setProfileId] = useState<number | null>(null);

//   // ... (useEffect, handleChange, and handleSubmit logic remains unchanged)
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const user = await getCurrentUser();
//       if (!user?.id) return router.push("/login");

//       setUserId(user.id);

//       const profile = await getProfileByUser(user.id);
//       if (profile) {
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
//         setProfileId(profile.id);
//       }
//     };

//     fetchProfile();
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

//     try {
//       let response;
//       if (profileId) {
//         response = await updateProfileStep1(profileId, { ...formData, user_id: userId });
//       } else {
//         response = await createProfileStep1({ ...formData, user_id: userId });
//         if (response?.id) setProfileId(response.id);
//       }

//       if (response) router.push("/user/profile/step2");
//     } catch (error) {
//       console.error("Profile submission failed:", error);
//     }
//   };


//   // --- REDESIGN STARTS HERE ---
//   return (
//     <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
//       {/* Step Tracker / Breadcrumbs */}
//       <nav className="flex items-center justify-between mb-8 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
//         <h2 className="text-2xl font-bold text-gray-800">
//             Profile Completion
//         </h2>
//         <ol className="flex space-x-4">
//             {steps.map((step) => (
//                 <li key={step.id}>
//                     <div className="flex items-center">
//                         <div 
//                             className={`size-8 flex items-center justify-center rounded-full text-sm font-semibold 
//                                 ${step.status === 'current' ? 'bg-rose-600 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}
//                         >
//                             {step.id}
//                         </div>
//                         <span className={`ml-2 hidden sm:block text-sm ${step.status === 'current' ? 'font-semibold text-rose-600' : 'text-gray-500'}`}>
//                             {step.name}
//                         </span>
//                     </div>
//                 </li>
//             ))}
//         </ol>
//       </nav>

//       {/* FORM CARD CONTAINER */}
//       <div className="bg-white rounded-xl shadow-lg border border-gray-200 divide-y divide-gray-200">
        
//         {/* HEADER */}
//         <div className="p-6 sm:p-8">
//           <h3 className="text-xl font-semibold text-gray-800">
//             Basic Profile Details (Step 1)
//           </h3>
//           <p className="mt-1 text-gray-500 text-sm">
//             Please fill out your fundamental personal information accurately.
//           </p>
//         </div>

//         {/* FORM BODY */}
//         <form onSubmit={handleSubmit}>
          
//           {/* Section 1: Core Identity */}
//           <div className="p-6 sm:p-8 space-y-7">
//             <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Core Identity</h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Gender */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400 appearance-none"
//                     required
//                   >
//                     <option value="" disabled>Select gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Date of Birth */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
//                   <input
//                     type="date"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleChange}
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400"
//                   />
//                 </div>
//             </div>
//           </div>


//           {/* Section 2: Physical & Marital Status */}
//           <div className="p-6 sm:p-8 space-y-7">
//             <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Physical & Marital</h4>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Marital Status */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
//                   <select
//                     name="marital_status"
//                     value={formData.marital_status}
//                     onChange={handleChange}
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400 appearance-none"
//                   >
//                     <option value="" disabled>Select</option>
//                     <option value="never_married">Never Married</option>
//                     <option value="divorced">Divorced</option>
//                     <option value="widow">Widow</option>
//                     <option value="separated">Separated</option>
//                   </select>
//                 </div>

//                 {/* Height */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Height (in feet)</label>
//                   <input
//                     type="number"
//                     name="height_feet"
//                     value={formData.height_feet}
//                     onChange={handleChange}
//                     placeholder="e.g., 5.5"
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400"
//                   />
//                 </div>

//                 {/* Weight */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
//                   <input
//                     type="number"
//                     name="weight_kg"
//                     value={formData.weight_kg}
//                     onChange={handleChange}
//                     placeholder="e.g., 65"
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400"
//                   />
//                 </div>
//             </div>
//           </div>
          
//           {/* Section 3: Background & Origin */}
//           <div className="p-6 sm:p-8 space-y-7">
//             <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Background</h4>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 {/* Mother Tongue */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Mother Tongue</label>
//                   <input
//                     type="text"
//                     name="mother_tongue"
//                     value={formData.mother_tongue}
//                     onChange={handleChange}
//                     placeholder="e.g., Bengali"
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400"
//                   />
//                 </div>

//                 {/* Religion */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
//                   <input
//                     type="text"
//                     name="religion"
//                     value={formData.religion}
//                     onChange={handleChange}
//                     placeholder="e.g., Muslim"
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400"
//                   />
//                 </div>

//                 {/* Caste */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Caste</label>
//                   <input
//                     type="text"
//                     name="caste"
//                     value={formData.caste}
//                     onChange={handleChange}
//                     placeholder="Optional"
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400"
//                   />
//                 </div>
                
//                 {/* Sub-Caste */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Caste</label>
//                   <input
//                     type="text"
//                     name="sub_caste"
//                     value={formData.sub_caste}
//                     onChange={handleChange}
//                     placeholder="Optional"
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400"
//                   />
//                 </div>
//             </div>
//           </div>
          
//           {/* Section 4: Bio & Blood Group */}
//           <div className="p-6 sm:p-8 space-y-7">
//             <h4 className="text-lg font-bold text-gray-700 pb-2 border-b border-gray-100">Other Details</h4>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Blood Group */}
//                 <div className="md:col-span-1">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
//                   <select
//                     name="blood_group"
//                     value={formData.blood_group}
//                     onChange={handleChange}
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400 appearance-none"
//                   >
//                     <option value="" disabled>Select</option>
//                     <option value="A+">A+</option>
//                     <option value="A-">A-</option>
//                     <option value="B+">B+</option>
//                     <option value="B-">B-</option>
//                     <option value="O+">O+</option>
//                     <option value="O-">O-</option>
//                     <option value="AB+">AB+</option>
//                     <option value="AB-">AB-</option>
//                   </select>
//                 </div>
                
//                 {/* Bio (takes up 2 columns) */}
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
//                   <textarea
//                     name="bio"
//                     value={formData.bio}
//                     onChange={handleChange}
//                     rows={4}
//                     className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 transition hover:border-gray-400 resize-none"
//                     placeholder="Tell us something about yourself, your hobbies, and what you are looking for in a partner (max 500 characters)..."
//                   />
//                 </div>
//             </div>
//           </div>


//           {/* SUBMIT BUTTON FOOTER */}
//           <div className="flex justify-end p-6 sm:p-8 bg-gray-50 rounded-b-xl border-t border-gray-200">
//             <button
//               type="submit"
//               className="w-full sm:w-auto bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold text-base 
//                          hover:bg-rose-700 transition duration-300 shadow-md 
//                          disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Save & Continue
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }







// "use client";

// import { useRouter } from "next/navigation";
// import { ChangeEvent, FormEvent, useState, useEffect } from "react";
// import { createProfileStep1, getProfileByUser, updateProfileStep1 } from "../../../../service/ProfileService";
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
//   const [profileId, setProfileId] = useState<number | null>(null); // store existing profile ID

//   useEffect(() => {
//   const fetchProfile = async () => {
//     const user = await getCurrentUser();
//     if (!user?.id) return router.push("/login");

//     setUserId(user.id);

//     const profile = await getProfileByUser(user.id);
//     if (profile) {
//       setFormData({
//         gender: profile.gender || "",
//         dob: profile.dob || "",
//         marital_status: profile.marital_status || "",
//         height_feet: profile.height_feet?.toString() || "",
//         weight_kg: profile.weight_kg?.toString() || "",
//         blood_group: profile.blood_group || "",
//         mother_tongue: profile.mother_tongue || "",
//         religion: profile.religion || "",
//         caste: profile.caste || "",
//         sub_caste: profile.sub_caste || "",
//         bio: profile.bio || "",
//       });
//       setProfileId(profile.id); // store for update
//     }
//   };

//   fetchProfile();
// }, [router]);


//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   if (!userId) return;

//   try {
//     let response;
//     if (profileId) {
//       response = await updateProfileStep1(profileId, { ...formData, user_id: userId });
//     } else {
//       response = await createProfileStep1({ ...formData, user_id: userId });
//       if (response?.id) setProfileId(response.id);
//     }

//     if (response) router.push("/user/profile/step2");
//   } catch (error) {
//     console.error("Profile submission failed:", error);
//   }
// };


//   return (
//     <div className="max-w-2xl mx-auto py-10">
//       <h2 className="text-2xl font-bold mb-6">Step 1: Basic Profile Details</h2>
//       <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-5">
//         {/* Form fields like before */}
//                 {/* Gender */}
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
