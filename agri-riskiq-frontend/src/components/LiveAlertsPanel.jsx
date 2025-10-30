import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAlerts } from "../contexts/AlertsContext";

export default function LiveAlertsPanel() {
  const { alerts, addAlert, clearAlerts, isPanelOpen, closePanel, openPanel, selectAlert } = useAlerts();
  const navigate = useNavigate();
  const [toasts, setToasts] = useState([]);
  const [hasNewAlert, setHasNewAlert] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  // Separate audio refs for different tones
  const warningSoundRef = useRef(null);
  const successSoundRef = useRef(null);

  // Simulate live alerts every 15s
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();
      const newAlert = {
        id: Date.now(),
        type: random > 0.5 ? "warning" : "success",
        message:
          random > 0.5
            ? "🔥 Heatwave alert detected in Kitui region"
            : "🌱 NDVI levels improving in Meru",
        time: "moments ago",
      };
      addAlert(newAlert);

      // 🔔 Toast popup for new alert
      setToasts((prev) => [newAlert, ...prev]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newAlert.id));
      }, 4000);

      // 🔊 Play sound
      if (soundOn) {
        const audio =
          newAlert.type === "warning"
            ? warningSoundRef.current
            : successSoundRef.current;
        audio && audio.play().catch(() => {});
      }

      if (!isPanelOpen) setHasNewAlert(true);
    }, 15000);

    return () => clearInterval(interval);
  }, [isPanelOpen, soundOn, addAlert]);

  const handleOpen = () => {
    openPanel();
    setHasNewAlert(false);
  };

  const handleClearAll = () => {
    clearAlerts();
  };

  const handleAlertClick = (alert) => {
    selectAlert(alert);
    closePanel();
    navigate("/alerts");
  };

  return (
    <>
      {/* 🎧 Notification Sounds */}
      <audio
        ref={warningSoundRef}
        src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        preload="auto"
      />
      <audio
        ref={successSoundRef}
        src="https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg"
        preload="auto"
      />

      {/* 🪶 Toast Notifications */}
      <div className="fixed top-4 right-6 z-[60] space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 50, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-2 px-4 py-3 rounded-lg shadow-lg border ${
                toast.type === "warning"
                  ? "bg-yellow-50 border-yellow-300"
                  : "bg-green-50 border-green-300"
              }`}
            >
              {toast.type === "warning" ? (
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
              )}
              <div className="text-sm">
                <p className="text-gray-800">{toast.message}</p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Toggle Button removed - use topbar bell instead */}

      {/* 📡 Alerts Panel */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-xl rounded-xl border border-gray-200 p-4 w-80 fixed top-24 right-6 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-green-700 flex items-center gap-2">
                🔔 Live AI Alerts
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundOn(!soundOn)}
                  className="text-gray-400 hover:text-gray-600 transition"
                  title={soundOn ? "Mute alerts" : "Unmute alerts"}
                >
                  {soundOn ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={closePanel}
                  className="text-gray-400 hover:text-gray-600 transition"
                  title="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {alerts.length === 0 ? (
                <p className="text-gray-500 text-sm">No active alerts.</p>
              ) : (
                alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleAlertClick(alert)}
                    className={`flex items-start gap-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                      alert.type === "warning"
                        ? "bg-yellow-50 border-l-4 border-yellow-400 hover:bg-yellow-100"
                        : "bg-green-50 border-l-4 border-green-500 hover:bg-green-100"
                    }`}
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                    )}
                    <div className="flex-1 text-sm">
                      <p className="text-gray-800">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="mt-3 text-right">
              <button
                onClick={handleClearAll}
                className="text-xs text-gray-500 hover:text-red-500 transition"
              >
                Clear All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}