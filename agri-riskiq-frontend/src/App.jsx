import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import MapPage from "./pages/MapPage";
import AlertsPage from "./pages/AlertsPage";
import ExplainPage from "./pages/ExplainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PortfolioPage from "./pages/PortfolioPage";

export default function App() {
  return (
    <Routes>
      {/* Auth Routes - No Sidebar/Topbar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Dashboard Routes - With Sidebar/Topbar */}
      <Route
        path="/*"
        element={
          <div className="app-layout">
            <Sidebar />
            <div className="app-content">
              <Topbar />
              <main className="app-main">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/alerts" element={<AlertsPage />} />
                  <Route path="/explain" element={<ExplainPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
