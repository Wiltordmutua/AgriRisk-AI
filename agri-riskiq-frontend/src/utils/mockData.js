// Add at the bottom of mockData.js
export function mockPortfolio() {
  const counties = ["Makueni", "Kitui", "Kisumu", "Nairobi", "Meru", "Nakuru"];
  return counties.map((c, i) => ({
    name: `Farmer ${i + 1}`,
    county: c,
    loanAmount: Math.round(50000 + Math.random() * 400000),
    creditScore: parseFloat((Math.random() * 10).toFixed(1)), // 0-10 scale with 1 decimal
    updated: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
  }));
}
