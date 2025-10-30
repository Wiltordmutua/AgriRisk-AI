import React, { useEffect, useState } from "react";
import { mockPortfolio } from "../utils/mockData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle } from "lucide-react";

const COLORS = ["#34A853", "#FBBC04", "#FB8C00", "#E53935"]; // green, yellow, orange, red

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState(mockPortfolio());
  const [insight, setInsight] = useState("");

  // 🧠 Simulate live credit score updates every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolio((prev) =>
        prev.map((p) => {
          const delta = (Math.random() * 2 - 1); // -1 to +1
          return {
            ...p,
            creditScore: Math.max(0, Math.min(10, p.creditScore + delta)),
          };
        })
      );
      updateInsight();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🧩 Count borrowers by risk category (0-10 scale)
  const lowRisk = portfolio.filter((p) => p.creditScore >= 7.5).length;
  const moderateRisk = portfolio.filter((p) => p.creditScore >= 5 && p.creditScore < 7.5).length;
  const highRisk = portfolio.filter((p) => p.creditScore >= 2.5 && p.creditScore < 5).length;
  const criticalRisk = portfolio.filter((p) => p.creditScore < 2.5).length;

  const data = [
    { name: "Low Risk", value: lowRisk },
    { name: "Moderate Risk", value: moderateRisk },
    { name: "High Risk", value: highRisk },
    { name: "Critical Risk", value: criticalRisk },
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
    <div className="portfolio-container">
      {/* Header */}
      <div>
        <h2 className="portfolio-header-title">Credit Portfolio Monitoring</h2>
        <p className="portfolio-header-subtitle">
          AI-driven continuous credit risk tracking for smallholder farmers.
        </p>
      </div>

      {/* Summary cards */}
      <div className="portfolio-summary-grid">
        <div className="portfolio-summary-card">
          <div className="portfolio-summary-label">Average Credit Score</div>
          <div className="portfolio-summary-value">{avgScore}</div>
        </div>
        <div className="portfolio-summary-card">
          <div className="portfolio-summary-label">Active Farmers</div>
          <div className="portfolio-summary-value">{portfolio.length}</div>
        </div>
        <div className="portfolio-alert-card">
          <AlertTriangle className="portfolio-alert-icon" size={20} />
          <div>
            <div className="portfolio-alert-label">Critical Risk Borrowers</div>
            <div className="portfolio-alert-value">{criticalRisk}</div>
          </div>
        </div>
      </div>

      {/* Chart + AI Insight */}
      <div className="portfolio-charts-grid">
        <div className="portfolio-chart-card">
          <h3 className="portfolio-chart-title">
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
          className="portfolio-insight-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="portfolio-insight-title">AI Monitoring Insight</h3>
          <p className="portfolio-insight-text">{insight}</p>
          <p className="portfolio-insight-note">Auto-updating every 5 seconds</p>
        </motion.div>
      </div>
    </div>
  );
}
