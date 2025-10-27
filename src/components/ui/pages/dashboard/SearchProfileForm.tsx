"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, User, Calendar, Droplet, Heart } from "lucide-react"; // Added Droplet and Heart for better icons
import { useState } from "react";

// Helper component for consistent input styling
const InputShell = ({ children, icon: Icon, label }: { children: React.ReactNode, icon: React.ElementType, label: string }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
      <Icon className="h-4 w-4 text-rose-500" />
      {label}
    </label>
    {children}
  </div>
);

const SearchProfileForm = () => {
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState(25);
  const [religion, setReligion] = useState("Muslim");
  const [maritalStatus, setMaritalStatus] = useState("UnMarried");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ gender, age, religion, maritalStatus });
  };

  // Define a consistent style for select/input fields
  const baseInputStyle = "w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:border-rose-500 text-sm bg-white transition-all shadow-inner hover:border-rose-300";

  return (
    <div className="space-y-2"> {/* Increased spacing for better separation */}
      
      {/* Title with a clearer look */}
      <h2 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
        <Search className="h-6 w-6 text-rose-500" />
        Find Your Match
      </h2>

      {/* Card with a cleaner, more professional appearance */}
      <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="p-6 grid gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-4 items-center"
        >
          {/* 1. Gender (Looking For) - More visual/button-like */}
          <div className="col-span-2 md:col-span-1">
            <InputShell label="Looking For" icon={User}>
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                {["Female", "Male"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                      gender === g
                        ? "bg-white text-rose-600 shadow-md ring-1 ring-rose-500" // Highlighted state is cleaner
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </InputShell>
          </div>

          {/* 2. Age Slider - Integrated with value in label */}
          <div className="col-span-2 md:col-span-1">
            <InputShell label={`Age: ${age} Years`} icon={Calendar}>
              <input
                type="range"
                min={20}
                max={40}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                // Applied the base input style for a consistent height and rounded corners
                className="w-full h-2 rounded-xl accent-rose-500 cursor-pointer appearance-none bg-gray-200 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
              />
              <div className="flex justify-between text-xs text-gray-500 px-1 mt-0.5">
                <span>20</span>
                <span>40</span>
              </div>
            </InputShell>
          </div>

          {/* 3. Religion Select */}
          <InputShell label="Religion" icon={Droplet}>
            <select
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className={baseInputStyle} // Consistent style applied
            >
              <option>Muslim</option>
              <option>Christian</option>
              <option>Hindu</option>
              <option>Buddhist</option>
              <option>Other</option>
            </select>
          </InputShell>

          {/* 4. Marital Status Select */}
          <InputShell label="Marital Status" icon={Heart}>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className={baseInputStyle} // Consistent style applied
            >
              <option>UnMarried</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </InputShell>

          {/* 5. Search Button - Full width, spanning all columns */}
          <div className="lg:col-span-4 col-span-2 mt-2">
            <Button
              type="submit"
              // Adjusted gradient for a slightly deeper, more formal look
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-lg text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl rounded-xl"
            >
              <Search className="h-5 w-5" />
              <span>Search Profiles</span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SearchProfileForm;