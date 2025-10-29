import React from "react";
import { Users, FolderKanban, Brain, Calendar, TrendingUp, Activity, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="w-4 h-4" />
          <span>{trendValue}</span>
        </div>
      )}
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 text-sm mt-1">
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
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Project Activity</h3>
            <p className="text-sm text-gray-600">Daily new project creation this week</p>
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
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Platform Usage</h3>
            <p className="text-sm text-gray-600">Active user trends over time</p>
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
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-600">Timeline of recent user and system actions</p>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'create' ? 'bg-green-100' :
                  activity.type === 'complete' ? 'bg-blue-100' :
                  activity.type === 'update' ? 'bg-yellow-100' :
                  activity.type === 'export' ? 'bg-purple-100' :
                  'bg-gray-100'
                }`}>
                  {activity.type === 'create' && <FolderKanban className="w-4 h-4 text-green-600" />}
                  {activity.type === 'complete' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'update' && <Activity className="w-4 h-4 text-yellow-600" />}
                  {activity.type === 'export' && <TrendingUp className="w-4 h-4 text-purple-600" />}
                  {activity.type === 'system' && <AlertCircle className="w-4 h-4 text-gray-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.project}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health Panel (Right) */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
            <p className="text-sm text-gray-600">Real-time system performance overview</p>
          </div>
          <div className="space-y-6">
            {systemMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                  <span className={`text-sm font-semibold ${
                    metric.status === 'good' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {metric.value}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      metric.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">System Status</span>
                </div>
                <span className="text-sm font-semibold text-green-600">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
