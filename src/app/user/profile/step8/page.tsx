"use client";

import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getProfilePictures, uploadProfilePicture } from "../../../../service/ProfilePictureService";

export default function Step8ProfileUpload() {
  const [pictures, setPictures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const fetchPictures = async () => {
    try {
      setLoading(true);
      const res = await getProfilePictures();
      if (res?.success && Array.isArray(res.data)) {
        setPictures(res.data);
      }
    } catch (err) {
      console.error("Error fetching pictures:", err);
      toast.error("Failed to load profile pictures.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await uploadProfilePicture(formData);
      if (res?.success) {
        toast.success("Profile picture uploaded successfully!");
        fetchPictures(); // Refresh list
      } else {
        toast.error(res?.message || "Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    router.push("/user/dashboard"); // Navigate to dashboard
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-blue-600" size={28} />
      </div>
    );

  return (
    <div className="max-w-lg mx-auto text-center py-10">
      <h1 className="text-2xl font-semibold mb-6">Profile Picture</h1>

      {pictures.length > 0 ? (
        <div className="flex flex-col items-center gap-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${pictures[0]?.url || '/placeholder.png'}`}
            alt="Profile Picture"
            width={250}
            height={250}
            className="rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
          <p className="text-gray-500 text-sm">
            You can update your profile picture if you want.
          </p>
        </div>
      ) : (
        <p className="text-gray-500 mb-4">No profile picture yet. Please upload one.</p>
      )}

      <label
        className={`inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition mt-6 ${
          uploading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {uploading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Uploading...
          </>
        ) : (
          <>
            <Upload size={18} />
            Upload Picture
          </>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>

      {/* 🔹 Submit button */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Submit & Continue
      </button>
    </div>
  );
}
