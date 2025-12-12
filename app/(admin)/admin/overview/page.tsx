/** @format */

import { Button } from "@/shared/ui/button";
import { Sparkles, Calendar, TrendingUp, Plus } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your event
          </p>
        </div>
        {/* <Button className="px-6 py-3 transition-all flex items-center gap-2 shadow-lg bg-pilot-purple-primary">
          <Plus className="w-5 h-5" />
Create event        </Button> */}
      </div>

     
    </div>
  );
}
