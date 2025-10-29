// Add at the bottom of mockData.js
export function mockPortfolio() {
  const counties = ["Makueni", "Kitui", "Kisumu", "Nairobi", "Meru", "Nakuru"];
  return counties.map((c, i) => ({
    name: `Farmer ${i + 1}`,
    county: c,
    loanAmount: Math.round(50000 + Math.random() * 400000),
    creditScore: Math.round(30 + Math.random() * 70),
    updated: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
  }));
}
