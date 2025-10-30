import React from "react";
import { NavLink } from "react-router-dom";
import { BarChart3, Map, Bell, Brain, Settings, Users } from "lucide-react";

const Item = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `sidebar-nav-item ${isActive ? "active" : ""}`
    }
  >
    <Icon size={16} />
    {label}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <img src="/logo.png" alt="AgriRiskIQ Logo" className="sidebar-logo" />
          <h1 className="sidebar-title">AgriRiskIQ</h1>
        </div>
        <p className="sidebar-subtitle">Credit & Risk Intelligence</p>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-nav-section-title">
          Analytics
        </div>
        <Item to="/dashboard" icon={BarChart3} label="Dashboard" />
        <Item to="/portfolio" icon={Users} label="Credit Portfolio" />
        <Item to="/map" icon={Map} label="Map Intelligence" />
        <Item to="/alerts" icon={Bell} label="Alerts & Advisory" />
        <Item to="/explain" icon={Brain} label="Explainability" />

        <div className="sidebar-nav-section-title" style={{ marginTop: '1.5rem' }}>
          Account
        </div>
        <Item to="/settings" icon={Settings} label="Settings" />
      </nav>

      <div className="sidebar-footer">
        <p>Role: <span className="sidebar-footer-label">Lender</span></p>
        <p>Lang: EN</p>
      </div>
    </aside>
  );
}
