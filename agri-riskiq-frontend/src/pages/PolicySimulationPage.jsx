import React, { useState } from "react";
import { Sliders, TrendingDown, TrendingUp, DollarSign, CloudRain, Leaf, AlertTriangle, Play, RotateCcw } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Demo weather scenarios
const weatherScenarios = [
  { id: 1, name: "Normal Season", rainfall: 100, temperature: 25, description: "Average conditions" },
  { id: 2, name: "Drought Risk", rainfall: 60, temperature: 32, description: "Below average rainfall, high temps" },
  { id: 3, name: "Excess Rainfall", rainfall: 150, temperature: 22, description: "Above average rainfall" },
  { id: 4, name: "Severe Drought", rainfall: 40, temperature: 35, description: "Critical water shortage" },
];

// Generate simulation data based on parameters
const generateSimulationData = (params) => {
  const { rainfallThreshold, ndviThreshold, premium, coverageAmount, scenario } = params;
  
  // Simulate NDVI changes over months based on rainfall
  const rainfallFactor = scenario.rainfall / 100;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return months.map((month, index) => {
    const baseNDVI = 0.6 + (rainfallFactor - 1) * 0.2;
    const seasonalVariation = Math.sin((index / 12) * Math.PI * 2) * 0.1;
    const randomVariation = (Math.random() - 0.5) * 0.05;
    const ndvi = Math.max(0, Math.min(1, baseNDVI + seasonalVariation + randomVariation));
    
    const rainfall = scenario.rainfall * (0.8 + Math.random() * 0.4);
    const triggersPayout = ndvi < ndviThreshold || rainfall < rainfallThreshold;
    const payoutAmount = triggersPayout ? coverageAmount * (1 - (ndvi / ndviThreshold)) : 0;
    
    return {
      month,
      ndvi: parseFloat(ndvi.toFixed(3)),
      rainfall: parseFloat(rainfall.toFixed(1)),
      payout: parseFloat(payoutAmount.toFixed(2)),
      threshold: ndviThreshold,
      rainfallThreshold,
    };
  });
};

export default function PolicySimulationPage() {
  const [selectedScenario, setSelectedScenario] = useState(weatherScenarios[0]);
  const [parameters, setParameters] = useState({
    rainfallThreshold: 80,
    ndviThreshold: 0.4,
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
    setParameters(prev => ({ ...prev, [param]: parseFloat(value) }));
  };

  const runSimulation = () => {
    const data = generateSimulationData({ ...parameters, scenario: selectedScenario });
    setSimulationData(data);
    setHasSimulated(true);
  };

  const resetSimulation = () => {
    setParameters({
      rainfallThreshold: 80,
      ndviThreshold: 0.4,
      premium: 50000,
      coverageAmount: 500000,
      landSize: 5,
      numberOfPolicies: 100,
    });
    setSelectedScenario(weatherScenarios[0]);
    setHasSimulated(false);
  };

  // Calculate metrics
  const totalPayouts = simulationData.reduce((sum, d) => sum + d.payout, 0);
  const totalPremiums = parameters.premium * parameters.numberOfPolicies * 12;
  const netPosition = totalPremiums - (totalPayouts * parameters.numberOfPolicies);
  const lossRatio = totalPremiums > 0 ? (totalPayouts * parameters.numberOfPolicies / totalPremiums * 100) : 0;
  const payoutMonths = simulationData.filter(d => d.payout > 0).length;

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
          {/* Rainfall Threshold */}
          <div className="policy-simulation-parameter">
            <div className="policy-simulation-parameter-header">
              <label>Rainfall Threshold (mm)</label>
              <span className="policy-simulation-parameter-value">{parameters.rainfallThreshold}</span>
            </div>
            <input
              type="range"
              min="40"
              max="120"
              step="5"
              value={parameters.rainfallThreshold}
              onChange={(e) => handleParameterChange('rainfallThreshold', e.target.value)}
              className="policy-simulation-slider"
            />
            <p className="policy-simulation-parameter-hint">Minimum rainfall to avoid payout trigger</p>
          </div>

          {/* NDVI Threshold */}
          <div className="policy-simulation-parameter">
            <div className="policy-simulation-parameter-header">
              <label>NDVI Threshold</label>
              <span className="policy-simulation-parameter-value">{parameters.ndviThreshold}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="0.7"
              step="0.05"
              value={parameters.ndviThreshold}
              onChange={(e) => handleParameterChange('ndviThreshold', e.target.value)}
              className="policy-simulation-slider"
            />
            <p className="policy-simulation-parameter-hint">Minimum vegetation health index to avoid payout</p>
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
          {/* Key Metrics */}
          <div className="policy-simulation-section">
            <h3 className="policy-simulation-section-title">Simulation Results</h3>
            <div className="policy-simulation-metrics">
              <div className="policy-simulation-metric-card">
                <div className="policy-simulation-metric-icon premium">
                  <DollarSign />
                </div>
                <div className="policy-simulation-metric-content">
                  <p className="policy-simulation-metric-label">Total Premiums</p>
                  <p className="policy-simulation-metric-value">KES {totalPremiums.toLocaleString()}</p>
                  <p className="policy-simulation-metric-detail">
                    KES {parameters.premium.toLocaleString()} × {parameters.numberOfPolicies} × 12 months
                  </p>
                </div>
              </div>

              <div className="policy-simulation-metric-card">
                <div className="policy-simulation-metric-icon payout">
                  <TrendingDown />
                </div>
                <div className="policy-simulation-metric-content">
                  <p className="policy-simulation-metric-label">Total Payouts</p>
                  <p className="policy-simulation-metric-value">
                    KES {(totalPayouts * parameters.numberOfPolicies).toLocaleString()}
                  </p>
                  <p className="policy-simulation-metric-detail">
                    {payoutMonths} months triggered payouts
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
            {/* NDVI Trend */}
            <div className="chart-card">
              <div className="chart-card-header">
                <h3 className="chart-card-title">
                  <Leaf />
                  NDVI Trend vs Threshold
                </h3>
                <p className="chart-card-subtitle">Vegetation health over time</p>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={simulationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} domain={[0, 1]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ndvi"
                    stroke="#2e7d32"
                    strokeWidth={2}
                    name="NDVI"
                    dot={{ fill: '#2e7d32', r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="threshold"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Threshold"
                    dot={false}
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
