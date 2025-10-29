import React, { useEffect, useState } from "react";
import { mockPortfolio } from "../utils/mockData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";

const COLORS = ["#34A853", "#FB8C00", "#E53935"]; // green, orange, red

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(mockPortfolio());
  const [insight, setInsight] = useState("");

  // 🧠 Simulate live credit score updates every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolio((prev) =>
        prev.map((p) => {
          const delta = Math.random() * 10 - 5; // -5 to +5
          return {
            ...p,
            creditScore: Math.max(20, Math.min(100, p.creditScore + delta)),
          };
        })
      );
      updateInsight();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🧩 Count borrowers by risk category
  const healthy = portfolio.filter((p) => p.creditScore >= 70).length;
  const watch = portfolio.filter((p) => p.creditScore < 70 && p.creditScore >= 45).length;
  const risk = portfolio.filter((p) => p.creditScore < 45).length;

  const data = [
    { name: "Healthy", value: healthy },
    { name: "Watchlist", value: watch },
    { name: "At Risk", value: risk },
  ];

  // 🧠 Generate AI insight message
  const updateInsight = () => {
    const rand = Math.random();
    if (rand < 0.3) setInsight("AI Insight: Slight improvement in credit health observed across Machakos County.");
    else if (rand < 0.6)
      setInsight("AI Insight: Drought risk increased — watchlist farmers may rise by 10% next cycle.");
    else setInsight("AI Insight: Overall portfolio stable. Continuous monitoring in progress...");
  };

  const avgScore = (portfolio.reduce((a, b) => a + b.creditScore, 0) / portfolio.length).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-green-700">Credit Portfolio Monitoring</h2>
        <p className="text-sm text-gray-500">
          AI-driven continuous credit risk tracking for smallholder farmers.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-xs text-gray-500">Average Credit Score</div>
          <div className="text-2xl font-bold text-green-700">{avgScore}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-xs text-gray-500">Active Farmers</div>
          <div className="text-2xl font-bold text-green-700">{portfolio.length}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow flex items-center gap-2">
          <AlertTriangle className="text-orange-500" size={20} />
          <div>
            <div className="text-xs text-gray-500">At-Risk Borrowers</div>
            <div className="text-lg font-bold text-orange-600">{risk}</div>
          </div>
        </div>
      </div>

      {/* Chart + AI Insight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold mb-2 text-gray-700">
            Portfolio Risk Distribution
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <motion.div
          className="bg-white p-5 rounded-lg shadow flex flex-col justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-700">AI Monitoring Insight</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{insight}</p>
          <p className="text-xs text-gray-400 mt-2">Auto-updating every 5 seconds</p>
        </motion.div>
      </div>
    </div>
  );
}
