import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Map, Bell, Brain, Settings, Users } from "lucide-react";

const Item = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-4 py-2.5 rounded-lg mb-1 text-sm transition-colors ${
        isActive
          ? "bg-green-600 text-white"
          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
      }`
    }
  >
    <Icon size={16} />
    {label}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-2">
          <img src="/logo.png" alt="AgriRiskIQ Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-green-700">AgriRiskIQ</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">Credit & Risk Intelligence</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">
          Analytics
        </div>
        <Item to="/dashboard" icon={BarChart3} label="Dashboard" />
        <Item to="/portfolio" icon={Users} label="Credit Portfolio" />
        <Item to="/map" icon={Map} label="Map Intelligence" />
        <Item to="/alerts" icon={Bell} label="Alerts & Advisory" />
        <Item to="/explain" icon={Brain} label="Explainability" />

        <div className="mt-6 text-xs font-semibold text-gray-400 uppercase mb-1">
          Account
        </div>
        <Item to="/settings" icon={Settings} label="Settings" />
      </nav>

      <div className="p-4 text-xs text-gray-500 border-t">
        <p>Role: <span className="font-medium text-gray-700">Lender</span></p>
        <p>Lang: EN</p>
      </div>
    </aside>
  );
}
