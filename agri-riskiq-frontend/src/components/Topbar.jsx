import React, { useState } from "react";
import { Bell } from "lucide-react";

export default function Topbar() {
  const [notificationCount, setNotificationCount] = useState(5); // Example: 5 notifications

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="AgriRiskIQ Logo" className="w-8 h-8 md:hidden" />
          <div>
            <div className="text-xs text-gray-500">Season</div>
            <div className="text-lg font-semibold text-green-700">2025 Long Rains</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>
          
          <div className="text-sm text-gray-600">Demo User</div>
          <div className="rounded-full w-9 h-9 bg-gray-100 flex items-center justify-center font-semibold">FO</div>
        </div>
      </div>
    </header>
  );
}
