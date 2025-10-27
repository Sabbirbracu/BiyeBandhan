"use client";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const CompleteProfileBanner = () => {
  return (
    <div className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-lg p-6 mb-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-8 w-8" />
          <div>
            <h3 className="text-xl font-bold">Complete Your Profile!</h3>
            <p className="text-white/90 text-sm">Add more details to get better matches</p>
          </div>
        </div>
        <Link 
          href="/profile/edit"
          className="bg-white text-rose-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
        >
          <span>Finish Now</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CompleteProfileBanner;

