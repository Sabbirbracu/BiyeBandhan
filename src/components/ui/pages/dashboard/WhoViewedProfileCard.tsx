"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Users } from "lucide-react";

const WhoViewedProfileCard = () => {
  return (
    <Card className="shadow-sm">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
        <Eye className="h-5 w-5 text-rose-500" />
        <h3 className="font-semibold text-gray-900">Who Viewed Your Profile</h3>
      </div>
      <div className="p-6">
        <div className="text-center mb-4">
          <div className="text-5xl font-bold text-rose-500 mb-2">17</div>
          <p className="text-sm text-gray-600">new viewers</p>
        </div>
        
        {/* Viewer avatars */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-pink-300 flex items-center justify-center text-white font-semibold"
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-semibold">
            +14
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center space-x-2">
          <Users className="h-4 w-4" />
          <span>View All</span>
        </Button>
      </div>
    </Card>
  );
};

export default WhoViewedProfileCard;

