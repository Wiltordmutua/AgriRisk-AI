import React, { createContext, useContext, useState } from "react";

const AlertsContext = createContext();

export function useAlerts() {
  const context = useContext(AlertsContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertsProvider");
  }
  return context;
}

export function AlertsProvider({ children }) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "⚠ Drought stress increasing in Makueni (82% risk)",
      time: "Just now",
      region: "Makueni County",
      severity: "High",
      details: "Prolonged drought conditions detected in Makueni region. Soil moisture levels have dropped to 15%, significantly below the critical threshold of 30%. NDVI readings show vegetation stress index at 0.28, indicating severe crop stress. Immediate irrigation recommended for vulnerable crops.",
      recommendations: [
        "Implement emergency irrigation for high-value crops",
        "Consider drought-resistant crop varieties for next season",
        "Monitor livestock water sources daily",
        "Apply mulching to conserve soil moisture"
      ],
      affectedAreas: ["Kibwezi", "Makindu", "Wote"],
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      type: "success",
      message: "🌧 Rainfall improving in Kisumu (+25 mm)",
      time: "3 min ago",
      region: "Kisumu County",
      severity: "Low",
      details: "Positive rainfall trends observed in Kisumu region. Cumulative rainfall over the past 7 days reached 25mm, bringing soil moisture levels back to optimal range. NDVI readings show improvement in vegetation health with index rising to 0.65.",
      recommendations: [
        "Resume normal farming activities",
        "Prepare for planting season",
        "Monitor for potential waterlogging in low-lying areas",
        "Apply fertilizers as soil moisture is adequate"
      ],
      affectedAreas: ["Kisumu Central", "Nyando", "Muhoroni"],
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const addAlert = (alert) => {
    // Generate detailed info for new alerts
    const detailedAlert = {
      ...alert,
      region: alert.region || "Unknown Region",
      severity: alert.type === "warning" ? "High" : "Low",
      details: alert.details || "Additional details will be provided as more information becomes available.",
      recommendations: alert.recommendations || ["Monitor the situation closely", "Follow standard agricultural practices"],
      affectedAreas: alert.affectedAreas || ["Multiple areas"],
      timestamp: new Date().toISOString(),
    };
    setAlerts((prev) => [detailedAlert, ...prev].slice(0, 5));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const openPanel = () => {
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const selectAlert = (alert) => {
    setSelectedAlert(alert);
  };

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        setAlerts,
        addAlert,
        clearAlerts,
        isPanelOpen,
        togglePanel,
        openPanel,
        closePanel,
        selectedAlert,
        selectAlert,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
}
