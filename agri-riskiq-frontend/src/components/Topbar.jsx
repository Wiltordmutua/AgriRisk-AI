import React from "react";

export default function Topbar() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">Season</div>
          <div className="text-lg font-semibold text-green-700">2025 Long Rains</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">Demo User</div>
          <div className="rounded-full w-9 h-9 bg-gray-100 flex items-center justify-center font-semibold">FO</div>
        </div>
      </div>
    </header>
  );
}
