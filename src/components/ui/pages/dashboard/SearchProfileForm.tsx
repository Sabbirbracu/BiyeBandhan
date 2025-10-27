"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchProfileForm = () => {
  const [gender, setGender] = useState("Female");
  const [age, setAge] = useState(25);
  const [religion, setReligion] = useState("Muslim");
  const [maritalStatus, setMaritalStatus] = useState("UnMarried");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ gender, age, religion, maritalStatus });
  };

  return (
    <Card className="shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Search Profile</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Looking for */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Looking for:
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-gray-700">Female</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-gray-700">Male</span>
              </label>
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Age: {age}
            </label>
            <input
              type="range"
              min="20"
              max="40"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>20</span>
              <span>40</span>
            </div>
          </div>

          {/* Religion */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Religion:
            </label>
            <select
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
            >
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddhist">Buddhist</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Marital Status:
            </label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
            >
              <option value="UnMarried">UnMarried</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 flex items-center justify-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default SearchProfileForm;

