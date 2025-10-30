import React, { useState } from "react";
import { Sliders, TrendingDown, TrendingUp, DollarSign, CloudRain, Leaf, AlertTriangle, Play, RotateCcw, User, MapPin } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Demo weather scenarios
const weatherScenarios = [
  { id: 1, name: "Normal Season", rainfall: 100, temperature: 25, description: "Average conditions" },
  { id: 2, name: "Drought Risk", rainfall: 60, temperature: 32, description: "Below average rainfall, high temps" },
  { id: 3, name: "Excess Rainfall", rainfall: 150, temperature: 22, description: "Above average rainfall" },
  { id: 4, name: "Severe Drought", rainfall: 40, temperature: 35, description: "Critical water shortage" },
];

// Calculate risk score based on scenario and land size (0-10 scale)
const calculateRiskScore = (scenario, landSize) => {
  // Base risk from weather scenario
  let baseRisk = 5; // neutral
  if (scenario.rainfall < 60) baseRisk = 8; // high risk for drought
  else if (scenario.rainfall > 130) baseRisk = 6.5; // moderate risk for excess rain
  else if (scenario.rainfall >= 90 && scenario.rainfall <= 110) baseRisk = 3; // low risk for normal
  
  // Adjust for land size (larger farms = slightly higher risk)
  const landRiskFactor = Math.min(landSize / 50, 1) * 1.5;
  
  const finalRisk = Math.min(10, Math.max(0, baseRisk + landRiskFactor));
  return parseFloat(finalRisk.toFixed(1));
};

// Generate simulation data based on parameters
const generateSimulationData = (params) => {
  const { premium, coverageAmount, scenario, landSize } = params;
  
  // Simulate rainfall and payout scenarios over months
  const rainfallFactor = scenario.rainfall / 100;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map((month, index) => {
    const rainfall = scenario.rainfall * (0.8 + Math.random() * 0.4);
    
    // Payout triggered if rainfall drops below critical threshold
    const criticalThreshold = 70; // mm
    const triggersPayout = rainfall < criticalThreshold;
    
    // Payout is proportional to severity of loss
    const severityFactor = triggersPayout ? Math.max(0, (criticalThreshold - rainfall) / criticalThreshold) : 0;
    const payoutAmount = triggersPayout ? coverageAmount * severityFactor * 0.5 : 0; // max 50% of coverage per month
    
    return {
      month,
      rainfall: parseFloat(rainfall.toFixed(1)),
      payout: parseFloat(payoutAmount.toFixed(0)),
    };
  });
};

export default function PolicySimulationPage() {
  const [selectedScenario, setSelectedScenario] = useState(weatherScenarios[0]);
  const [parameters, setParameters] = useState({
    farmerName: '',
    farmLocation: '',
    premium: 50000,
    coverageAmount: 500000,
    landSize: 5,
    numberOfPolicies: 100,
  });
  
  const [simulationData, setSimulationData] = useState(
    generateSimulationData({ ...parameters, scenario: selectedScenario })
  );
  const [hasSimulated, setHasSimulated] = useState(false);

  const handleParameterChange = (param, value) => {
    // Handle text inputs differently from numeric inputs
    if (param === 'farmerName' || param === 'farmLocation') {
      setParameters(prev => ({ ...prev, [param]: value }));
    } else {
      setParameters(prev => ({ ...prev, [param]: parseFloat(value) }));
    }
  };

  const runSimulation = () => {
    const data = generateSimulationData({ ...parameters, scenario: selectedScenario });
    setSimulationData(data);
    setHasSimulated(true);
  };

  const resetSimulation = () => {
    setParameters({
      farmerName: '',
      farmLocation: '',
      premium: 50000,
      coverageAmount: 500000,
      landSize: 5,
      numberOfPolicies: 100,
    });
    setSelectedScenario(weatherScenarios[0]);
    setHasSimulated(false);
  };

  // Calculate metrics
  const riskScore = calculateRiskScore(selectedScenario, parameters.landSize);
  const totalPayouts = simulationData.reduce((sum, d) => sum + d.payout, 0);
  const totalPremiums = parameters.premium * parameters.numberOfPolicies * 12;
  const netPosition = totalPremiums - (totalPayouts * parameters.numberOfPolicies);
  const lossRatio = totalPremiums > 0 ? (totalPayouts * parameters.numberOfPolicies / totalPremiums * 100) : 0;
  const payoutMonths = simulationData.filter(d => d.payout > 0).length;
  const avgMonthlyPayout = payoutMonths > 0 ? totalPayouts / payoutMonths : 0;

  return (
    <div className="policy-simulation-container">
      {/* Header */}
      <div className="policy-simulation-header">
        <div>
          <h2 className="policy-simulation-title">Policy Simulation Sandbox</h2>
          <p className="policy-simulation-subtitle">
            Simulate how changing thresholds and premiums affect payouts under different weather scenarios
          </p>
        </div>
        <button onClick={resetSimulation} className="policy-simulation-btn-secondary">
          <RotateCcw />
          <span>Reset</span>
        </button>
      </div>

      {/* Weather Scenario Selection */}
      <div className="policy-simulation-section">
        <h3 className="policy-simulation-section-title">
          <CloudRain />
          Select Weather Scenario
        </h3>
        <div className="policy-simulation-scenarios">
          {weatherScenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className={`policy-simulation-scenario-card ${
                selectedScenario.id === scenario.id ? 'active' : ''
              }`}
            >
              <div className="policy-simulation-scenario-header">
                <h4>{scenario.name}</h4>
                {selectedScenario.id === scenario.id && (
                  <div className="policy-simulation-scenario-badge">Selected</div>
                )}
              </div>
              <p className="policy-simulation-scenario-description">{scenario.description}</p>
              <div className="policy-simulation-scenario-metrics">
                <div>
                  <CloudRain />
                  <span>{scenario.rainfall}mm</span>
                </div>
                <div>
                  <TrendingUp />
                  <span>{scenario.temperature}°C</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parameter Controls */}
      <div className="policy-simulation-section">
        <div className="policy-simulation-section-header">
          <h3 className="policy-simulation-section-title">
            <Sliders />
            Adjust Policy Parameters
          </h3>
          <button onClick={runSimulation} className="policy-simulation-btn-primary">
            <Play />
            <span>Run Simulation</span>
          </button>
        </div>
        <div className="policy-simulation-parameters">
          {/* Farmer Name */}
          <div className="policy-simulation-parameter">
            <div className="policy-simulation-parameter-header">
              <label>
                <User size={16} style={{ display: 'inline', marginRight: '4px' }} />
                Farmer Name
              </label>
            </div>
            <input
              type="text"
              placeholder="Enter farmer name"
              value={parameters.farmerName}
              onChange={(e) => handleParameterChange('farmerName', e.target.value)}
              className="policy-simulation-slider"
              style={{ 
                height: '40px', 
                padding: '8px 12px', 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb',
                fontSize: '14px'
              }}
            />
            <p className="policy-simulation-parameter-hint">Name of the farmer applying for insurance</p>
          </div>

          {/* Farm Location */}
          <div className="policy-simulation-parameter">
            <div className="policy-simulation-parameter-header">
              <label>
                <MapPin size={16} style={{ display: 'inline', marginRight: '4px' }} />
                Farm Location
              </label>
            </div>
            <input
              type="text"
              placeholder="Enter farm location (e.g., Makueni County)"
              value={parameters.farmLocation}
              onChange={(e) => handleParameterChange('farmLocation', e.target.value)}
              className="policy-simulation-slider"
              style={{ 
                height: '40px', 
                padding: '8px 12px', 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb',
                fontSize: '14px'
              }}
            />
            <p className="policy-simulation-parameter-hint">Geographic location of the farm</p>
          </div>

          {/* Premium */}
          <div className="policy-simulation-parameter">
            <div className="policy-simulation-parameter-header">
              <label>Monthly Premium (KES)</label>
              <span className="policy-simulation-parameter-value">KES {parameters.premium.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={parameters.premium}
              onChange={(e) => handleParameterChange('premium', e.target.value)}
              className="policy-simulation-slider"
            />
            <p className="policy-simulation-parameter-hint">Premium charged per policy per month</p>
          </div>

          {/* Coverage Amount */}
          <div className="policy-simulation-parameter">
            <div className="policy-simulation-parameter-header">
              <label>Coverage Amount (KES)</label>
              <span className="policy-simulation-parameter-value">KES {parameters.coverageAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={parameters.coverageAmount}
              onChange={(e) => handleParameterChange('coverageAmount', e.target.value)}
              className="policy-simulation-slider"
            />
            <p className="policy-simulation-parameter-hint">Maximum payout per policy</p>
          </div>

          {/* Land Size */}
          <div className="policy-simulation-parameter">
            <div className="policy-simulation-parameter-header">
              <label>Land Size (Acres)</label>
              <span className="policy-simulation-parameter-value">{parameters.landSize} acres</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="0.5"
              value={parameters.landSize}
              onChange={(e) => handleParameterChange('landSize', e.target.value)}
              className="policy-simulation-slider"
            />
            <p className="policy-simulation-parameter-hint">Average land size per policy</p>
          </div>

          {/* Number of Policies */}
          <div className="policy-simulation-parameter">
            <div className="policy-simulation-parameter-header">
              <label>Number of Policies</label>
              <span className="policy-simulation-parameter-value">{parameters.numberOfPolicies}</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={parameters.numberOfPolicies}
              onChange={(e) => handleParameterChange('numberOfPolicies', e.target.value)}
              className="policy-simulation-slider"
            />
            <p className="policy-simulation-parameter-hint">Total policies in portfolio</p>
          </div>
        </div>
      </div>

      {/* Results */}
      {hasSimulated && (
        <>
          {/* Farmer Information */}
          {(parameters.farmerName || parameters.farmLocation) && (
            <div className="policy-simulation-section">
              <h3 className="policy-simulation-section-title">
                <User />
                Farmer Information
              </h3>
              <div className="policy-simulation-metrics" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {parameters.farmerName && (
                  <div className="policy-simulation-metric-card">
                    <div className="policy-simulation-metric-content">
                      <p className="policy-simulation-metric-label">Farmer Name</p>
                      <p className="policy-simulation-metric-value" style={{ fontSize: '1.25rem' }}>{parameters.farmerName}</p>
                    </div>
                  </div>
                )}
                {parameters.farmLocation && (
                  <div className="policy-simulation-metric-card">
                    <div className="policy-simulation-metric-content">
                      <p className="policy-simulation-metric-label">Farm Location</p>
                      <p className="policy-simulation-metric-value" style={{ fontSize: '1.25rem' }}>{parameters.farmLocation}</p>
                    </div>
                  </div>
                )}
                <div className="policy-simulation-metric-card">
                  <div className="policy-simulation-metric-content">
                    <p className="policy-simulation-metric-label">Land Size</p>
                    <p className="policy-simulation-metric-value" style={{ fontSize: '1.25rem' }}>{parameters.landSize} acres</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Metrics */}
          <div className="policy-simulation-section">
            <h3 className="policy-simulation-section-title">Policy Simulation Results</h3>
            <div className="policy-simulation-metrics">
              <div className="policy-simulation-metric-card">
                <div className={`policy-simulation-metric-icon ${riskScore < 4 ? 'good' : riskScore < 7 ? 'warning' : 'loss'}`}>
                  <AlertTriangle />
                </div>
                <div className="policy-simulation-metric-content">
                  <p className="policy-simulation-metric-label">Risk Score</p>
                  <p className="policy-simulation-metric-value">{riskScore} / 10</p>
                  <p className="policy-simulation-metric-detail">
                    {riskScore < 4 ? 'Low Risk' : riskScore < 7 ? 'Moderate Risk' : 'High Risk'}
                  </p>
                </div>
              </div>

              <div className="policy-simulation-metric-card">
                <div className="policy-simulation-metric-icon premium">
                  <DollarSign />
                </div>
                <div className="policy-simulation-metric-content">
                  <p className="policy-simulation-metric-label">Coverage Amount</p>
                  <p className="policy-simulation-metric-value">KES {parameters.coverageAmount.toLocaleString()}</p>
                  <p className="policy-simulation-metric-detail">
                    Maximum insured amount
                  </p>
                </div>
              </div>

              <div className="policy-simulation-metric-card">
                <div className="policy-simulation-metric-icon premium">
                  <TrendingUp />
                </div>
                <div className="policy-simulation-metric-content">
                  <p className="policy-simulation-metric-label">Monthly Premium</p>
                  <p className="policy-simulation-metric-value">KES {parameters.premium.toLocaleString()}</p>
                  <p className="policy-simulation-metric-detail">
                    Premium to pay per month
                  </p>
                </div>
              </div>

              <div className="policy-simulation-metric-card">
                <div className="policy-simulation-metric-icon payout">
                  <TrendingDown />
                </div>
                <div className="policy-simulation-metric-content">
                  <p className="policy-simulation-metric-label">Avg Monthly Payout</p>
                  <p className="policy-simulation-metric-value">
                    KES {avgMonthlyPayout.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="policy-simulation-metric-detail">
                    {payoutMonths} months with payouts
                  </p>
                </div>
              </div>

              <div className="policy-simulation-metric-card">
                <div className={`policy-simulation-metric-icon ${netPosition >= 0 ? 'profit' : 'loss'}`}>
                  {netPosition >= 0 ? <TrendingUp /> : <TrendingDown />}
                </div>
                <div className="policy-simulation-metric-content">
                  <p className="policy-simulation-metric-label">Net Position</p>
                  <p className={`policy-simulation-metric-value ${netPosition >= 0 ? 'positive' : 'negative'}`}>
                    KES {Math.abs(netPosition).toLocaleString()}
                  </p>
                  <p className="policy-simulation-metric-detail">
                    {netPosition >= 0 ? 'Profit' : 'Loss'}
                  </p>
                </div>
              </div>

              <div className="policy-simulation-metric-card">
                <div className={`policy-simulation-metric-icon ${lossRatio < 80 ? 'good' : 'warning'}`}>
                  <AlertTriangle />
                </div>
                <div className="policy-simulation-metric-content">
                  <p className="policy-simulation-metric-label">Loss Ratio</p>
                  <p className="policy-simulation-metric-value">{lossRatio.toFixed(1)}%</p>
                  <p className="policy-simulation-metric-detail">
                    {lossRatio < 60 ? 'Excellent' : lossRatio < 80 ? 'Good' : 'High Risk'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="policy-simulation-charts">
            {/* Rainfall Trend */}
            <div className="chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  <CloudRain />
                  Monthly Rainfall Trend
                </h3>
                <p className="chart-card-subtitle">Rainfall levels throughout the year</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={simulationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="rainfall"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Rainfall (mm)"
                    dot={{ fill: '#3b82f6', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Payout Distribution */}
            <div className="chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  <DollarSign />
                  Monthly Payout Distribution
                </h3>
                <p className="chart-card-subtitle">Payout amounts per month</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={simulationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Bar dataKey="payout" fill="#ffa726" radius={[8, 8, 0, 0]} name="Payout (KES)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Initial State Message */}
      {!hasSimulated && (
        <div className="policy-simulation-empty-state">
          <Sliders size={48} />
          <h3>Ready to Simulate</h3>
          <p>Adjust the parameters above and click "Run Simulation" to see projected results</p>
        </div>
      )}
    </div>
  );
}
