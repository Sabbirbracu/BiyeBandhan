"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const DailyMatchesSection = () => {
  // Mock data - replace with actual data from API
  const matches = [
    { id: "EIMOSS4", age: 23, education: "B.Sc", location: "Dhaka" },
    { id: "EIW31554", age: 25, education: "M.Sc", location: "Chittagong" },
    { id: "EIMOSS5", age: 24, education: "B.A", location: "Sylhet" },
    { id: "EIMOSS6", age: 26, education: "BBA", location: "Rajshahi" },
  ];

  return (
    <Card className="shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Daily Matches</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-rose-300 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-300 to-pink-300 flex items-center justify-center text-white font-bold text-lg">
                  {match.id.charAt(match.id.length - 1)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{match.id}</h4>
                  <p className="text-sm text-gray-600">
                    {match.age} years, {match.education}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full text-xs"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DailyMatchesSection;

