import React from "react";
import { useAlerts } from "../contexts/AlertsContext";
import { AlertTriangle, CheckCircle2, MapPin, Clock, TrendingUp, Lightbulb } from "lucide-react";

export default function AlertsPage() {
  const { selectedAlert, alerts } = useAlerts();

  // If no alert is selected, show the list of all alerts
  if (!selectedAlert) {
    return (
      <div className="simple-page-container">
        <h2 className="simple-page-title">Alerts & Advisory</h2>
        <p className="simple-page-description">
          AI-generated alerts about weather anomalies, credit risk spikes, and agronomic advisories.
        </p>
        
        <div className="mt-6 space-y-4">
          {alerts.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">No alerts available. Click on an alert from the notification panel to view details.</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Alerts</h3>
              <p className="text-gray-600 text-sm">
                Click on an alert from the notification bell in the top-right corner to view detailed information.
              </p>
              <div className="mt-4 space-y-2">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${
                      alert.type === "warning"
                        ? "bg-yellow-50 border-yellow-400"
                        : "bg-green-50 border-green-500"
                    }`}
                  >
                    <p className="text-sm text-gray-800">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Display detailed alert information
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-full ${
              selectedAlert.type === "warning"
                ? "bg-yellow-100"
                : "bg-green-100"
            }`}
          >
            {selectedAlert.type === "warning" ? (
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            ) : (
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedAlert.severity === "High"
                    ? "bg-red-100 text-red-700"
                    : selectedAlert.severity === "Medium"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {selectedAlert.severity} Severity
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {selectedAlert.time}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedAlert.message}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{selectedAlert.region}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Alert Details
        </h2>
        <p className="text-gray-700 leading-relaxed">{selectedAlert.details}</p>
      </div>

      {/* Affected Areas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-600" />
          Affected Areas
        </h2>
        <div className="flex flex-wrap gap-2">
          {selectedAlert.affectedAreas.map((area, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-green-600" />
          Recommended Actions
        </h2>
        <ul className="space-y-3">
          {selectedAlert.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-xs font-semibold">
                  {index + 1}
                </span>
              </div>
              <p className="text-gray-700 flex-1">{recommendation}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Timestamp */}
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          <strong>Alert Generated:</strong>{" "}
          {new Date(selectedAlert.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
