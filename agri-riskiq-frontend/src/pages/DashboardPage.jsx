import React from "react";
import { Users, FolderKanban, Brain, Calendar, TrendingUp, Activity, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
//import LiveAlertsPanel from "../components/LiveAlertsPanel";

// Demo data for platform usage (line graph)
const platformUsageData = [
  { date: "Jan 1", users: 120 },
  { date: "Jan 5", users: 145 },
  { date: "Jan 10", users: 180 },
  { date: "Jan 15", users: 165 },
  { date: "Jan 20", users: 210 },
  { date: "Jan 25", users: 245 },
  { date: "Jan 30", users: 280 },
];

// Demo data for project creation (bar graph)
const projectActivityData = [
  { day: "Mon", projects: 12 },
  { day: "Tue", projects: 19 },
  { day: "Wed", projects: 15 },
  { day: "Thu", projects: 22 },
  { day: "Fri", projects: 28 },
  { day: "Sat", projects: 8 },
  { day: "Sun", projects: 5 },
];

// Demo data for recent activity
const recentActivities = [
  { id: 1, user: "John Doe", action: "Created new project", project: "Farm Risk Analysis", time: "5 min ago", type: "create" },
  { id: 2, user: "Sarah Smith", action: "Completed AI processing", project: "Crop Yield Prediction", time: "12 min ago", type: "complete" },
  { id: 3, user: "Mike Johnson", action: "Updated risk assessment", project: "Drought Monitoring", time: "25 min ago", type: "update" },
  { id: 4, user: "Emily Brown", action: "Exported report", project: "Portfolio Analysis", time: "1 hour ago", type: "export" },
  { id: 5, user: "System", action: "Scheduled maintenance", project: "Database Backup", time: "2 hours ago", type: "system" },
];

// Demo data for system health
const systemMetrics = [
  { name: "API Response Time", value: "145ms", status: "good", percentage: 92 },
  { name: "Database Performance", value: "98%", status: "good", percentage: 98 },
  { name: "AI Model Accuracy", value: "94.2%", status: "good", percentage: 94 },
  { name: "Storage Usage", value: "67%", status: "warning", percentage: 67 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div className={`stat-card-icon ${color}`}>
        <Icon />
      </div>
      {trend && (
        <div className={`stat-card-trend ${trend}`}>
          <TrendingUp />
          <span>{trendValue}</span>
        </div>
      )}
    </div>
    <h3 className="stat-card-title">{title}</h3>
    <p className="stat-card-value">{value}</p>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div>
        <h2 className="dashboard-header-title">Dashboard Overview</h2>
        <p className="dashboard-header-subtitle">
          Monitor credit and risk trends, portfolio health, and satellite-based insights
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Active Users"
          value="1,284"
          icon={Users}
          trend="up"
          trendValue="+12.5%"
          color="bg-blue-500"
        />
        <StatCard
          title="Active Projects"
          value="342"
          icon={FolderKanban}
          trend="up"
          trendValue="+8.2%"
          color="bg-agrigreen"
        />
        <StatCard
          title="AI Processing Status"
          value="94.2%"
          icon={Brain}
          trend="up"
          trendValue="+2.1%"
          color="bg-purple-500"
        />
        <StatCard
          title="Upcoming Expiration"
          value="23"
          icon={Calendar}
          color="bg-accent"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Activity Chart (Left) */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">Project Activity</h3>
            <p className="chart-card-subtitle">Daily new project creation this week</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                cursor={{ fill: 'rgba(46, 125, 50, 0.1)' }}
              />
              <Bar dataKey="projects" fill="#2e7d32" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Usage Chart (Right) */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">Platform Usage</h3>
            <p className="chart-card-subtitle">Active user trends over time</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={platformUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#1565c0"
                strokeWidth={3}
                dot={{ fill: '#1565c0', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Feed (Left) */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">Recent Activity</h3>
            <p className="chart-card-subtitle">Timeline of recent user and system actions</p>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'create' && <FolderKanban />}
                  {activity.type === 'complete' && <CheckCircle />}
                  {activity.type === 'update' && <Activity />}
                  {activity.type === 'export' && <TrendingUp />}
                  {activity.type === 'system' && <AlertCircle />}
                </div>
                <div className="activity-content">
                  <p className="activity-user">{activity.user}</p>
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-project">{activity.project}</p>
                </div>
                <div className="activity-time">
                  <Clock />
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health Panel (Right) */}
        <div className="chart-card">
          <div className="chart-card-header">
            <h3 className="chart-card-title">System Health</h3>
            <p className="chart-card-subtitle">Real-time system performance overview</p>
          </div>
          <div className="space-y-6">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="system-metric">
                <div className="system-metric-header">
                  <span className="system-metric-name">{metric.name}</span>
                  <span className={`system-metric-value ${metric.status}`}>
                    {metric.value}
                  </span>
                </div>
                <div className="system-metric-bar-container">
                  <div
                    className={`system-metric-bar ${metric.status}`}
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="system-status">
              <div className="system-status-container">
                <div className="system-status-label-container">
                  <div className="system-status-indicator"></div>
                  <span className="system-status-label">System Status</span>
                </div>
                <span className="system-status-value">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
