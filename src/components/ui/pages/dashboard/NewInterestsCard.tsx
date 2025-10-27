"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const NewInterestsCard = () => {
  return (
    <Card className="shadow-sm">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
        <MessageCircle className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold text-gray-900">New Interests Received</h3>
      </div>
      <div className="p-6">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">💌</div>
          <p className="text-sm text-gray-600">new interests</p>
        </div>

        {/* Interest card */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-cyan-300 flex items-center justify-center text-white font-bold">
              MP
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm">Marta Pspoctian</h4>
              <p className="text-xs text-gray-600">Dhaka, 1995</p>
            </div>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 flex items-center justify-center space-x-2">
          <MessageCircle className="h-4 w-4" />
          <span>Respond Now</span>
        </Button>
      </div>
    </Card>
  );
};

export default NewInterestsCard;

