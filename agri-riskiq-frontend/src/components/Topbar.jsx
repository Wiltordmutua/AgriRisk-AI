import React from "react";
import { Bell } from "lucide-react";
import { useAlerts } from "../contexts/AlertsContext";
import LiveAlertsPanel from "./LiveAlertsPanel";

export default function Topbar() {
  const { alerts, togglePanel } = useAlerts();
  const notificationCount = alerts.length;

  return (
    <>
      <header className="topbar">
        <div className="topbar-container">
          <div className="topbar-left">
            <img src="/logo.png" alt="AgriRiskIQ Logo" className="topbar-logo-mobile" />
            <div>
              <div className="topbar-season-label">Season</div>
              <div className="topbar-season-value">2025 Long Rains</div>
            </div>
          </div>
          <div className="topbar-right">
            {/* Notification Bell */}
            <button className="topbar-notification-btn" onClick={togglePanel}>
              <Bell />
              {notificationCount > 0 && (
                <span className="topbar-notification-badge">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
            
            <div className="topbar-user-name">Demo User</div>
            <div className="topbar-user-avatar">FO</div>
          </div>
        </div>
      </header>
      
      {/* Live Alerts Panel */}
      <LiveAlertsPanel />
    </>
  );
}
