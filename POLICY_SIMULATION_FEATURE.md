# Policy Simulation Sandbox Feature

## Overview
A comprehensive policy simulation tool that allows insurers to model and analyze how different policy parameters affect payouts under various weather scenarios and NDVI (vegetation health) changes.

## Feature Description

The Policy Simulation Sandbox enables insurers to:
- **Select weather scenarios** (Normal, Drought Risk, Excess Rainfall, Severe Drought)
- **Adjust policy parameters** in real-time using interactive sliders
- **Run simulations** to project financial outcomes
- **Visualize results** through interactive charts and key metrics

## Key Components

### 1. Weather Scenario Selection
Four predefined scenarios with different rainfall and temperature conditions:
- **Normal Season**: Average conditions (100mm rainfall, 25°C)
- **Drought Risk**: Below average rainfall (60mm, 32°C)
- **Excess Rainfall**: Above average rainfall (150mm, 22°C)
- **Severe Drought**: Critical water shortage (40mm, 35°C)

### 2. Adjustable Parameters

| Parameter | Range | Description |
|-----------|-------|-------------|
| **Rainfall Threshold** | 40-120mm | Minimum rainfall to avoid payout trigger |
| **NDVI Threshold** | 0.2-0.7 | Minimum vegetation health index to avoid payout |
| **Monthly Premium** | $100-$2,000 | Premium charged per policy per month |
| **Coverage Amount** | $1,000-$20,000 | Maximum payout per policy |
| **Number of Policies** | 10-500 | Total policies in portfolio |

### 3. Key Metrics Displayed

- **Total Premiums**: Annual premium income from all policies
- **Total Payouts**: Projected payout amounts based on triggers
- **Net Position**: Profit or loss (Premiums - Payouts)
- **Loss Ratio**: Percentage of premiums paid out as claims
  - Excellent: < 60%
  - Good: 60-80%
  - High Risk: > 80%

### 4. Visualizations

#### NDVI Trend Chart
- Line chart showing vegetation health over 12 months
- Red threshold line indicating payout trigger point
- Visual identification of months where payouts would occur

#### Monthly Payout Distribution
- Bar chart showing payout amounts per month
- Helps identify seasonal risk patterns
- Shows total exposure across the year

## Technical Implementation

### Files Created
- **`src/pages/PolicySimulationPage.jsx`** - Main component (400+ lines)
- **CSS Styles** - Added to `src/style.css` (380+ lines)

### Files Modified
- **`src/App.jsx`** - Added route `/simulation`
- **`src/components/Sidebar.jsx`** - Added "Policy Simulation" menu item

### Technologies Used
- **React** - Component framework
- **Recharts** - Data visualization library
- **Lucide React** - Icon library
- **Custom CSS** - Styled components

## User Workflow

1. **Select a Weather Scenario**
   - Click on one of the four scenario cards
   - View rainfall and temperature details

2. **Adjust Policy Parameters**
   - Use sliders to modify thresholds, premiums, and coverage
   - Real-time value updates displayed

3. **Run Simulation**
   - Click "Run Simulation" button (located next to "Adjust Policy Parameters" header)
   - System generates 12-month projection

4. **Analyze Results**
   - Review key metrics (premiums, payouts, net position, loss ratio)
   - Examine NDVI trend chart
   - Study monthly payout distribution
   - Identify risk patterns

5. **Iterate**
   - Adjust parameters to optimize risk/reward
   - Compare different scenarios
   - Use "Reset" to start over

## Simulation Logic

The simulation generates monthly data based on:

1. **Rainfall Factor**: Scenario rainfall / 100
2. **Base NDVI**: Calculated from rainfall factor
3. **Seasonal Variation**: Sine wave pattern for natural fluctuation
4. **Random Variation**: Small random changes for realism
5. **Payout Trigger**: Activated when NDVI < threshold OR rainfall < threshold
6. **Payout Amount**: Proportional to severity of NDVI drop

## Business Value

### For Insurers
- **Risk Assessment**: Model different scenarios before setting policy terms
- **Premium Optimization**: Find optimal premium levels for profitability
- **Portfolio Management**: Understand exposure across different conditions
- **Data-Driven Decisions**: Make informed choices based on projections

### For Product Development
- **Policy Design**: Test new product configurations
- **Threshold Calibration**: Fine-tune trigger points
- **Pricing Strategy**: Balance competitiveness with profitability
- **Scenario Planning**: Prepare for various climate conditions

## Future Enhancements

Potential additions to the feature:

1. **Custom Scenarios**: Allow users to create their own weather scenarios
2. **Historical Data**: Import actual historical weather data
3. **Multi-Year Projections**: Extend simulations beyond 12 months
4. **Export Functionality**: Download simulation results as PDF/Excel
5. **Comparison Mode**: Run multiple simulations side-by-side
6. **Advanced Analytics**: Add more sophisticated risk metrics
7. **Regional Variations**: Support different geographic regions
8. **Crop-Specific Models**: Customize for different crop types

## CSS Classes Reference

### Main Container
- `.policy-simulation-container` - Main page container
- `.policy-simulation-header` - Page header with title and actions
- `.policy-simulation-section` - White card sections

### Buttons
- `.policy-simulation-btn-primary` - Green "Run Simulation" button
- `.policy-simulation-btn-secondary` - White "Reset" button

### Scenarios
- `.policy-simulation-scenarios` - Grid of scenario cards
- `.policy-simulation-scenario-card` - Individual scenario card
- `.policy-simulation-scenario-card.active` - Selected scenario

### Parameters
- `.policy-simulation-parameters` - Grid of parameter controls
- `.policy-simulation-parameter` - Individual parameter control
- `.policy-simulation-slider` - Range input slider

### Metrics
- `.policy-simulation-metrics` - Grid of metric cards
- `.policy-simulation-metric-card` - Individual metric card
- `.policy-simulation-metric-icon` - Colored icon container

### Charts
- `.policy-simulation-charts` - Grid of chart containers
- Uses existing `.chart-card` classes for consistency

## Accessibility

- Semantic HTML structure
- Keyboard-navigable sliders
- Clear labels and descriptions
- Color-coded metrics with text indicators
- Responsive design for all screen sizes

## Performance Considerations

- Simulation runs on-demand (not real-time)
- Efficient data generation algorithm
- Optimized chart rendering with Recharts
- No external API calls required
- All calculations client-side

## Testing Recommendations

1. Test all slider ranges
2. Verify calculations for different scenarios
3. Check responsive behavior on mobile
4. Validate chart rendering with different data
5. Test reset functionality
6. Verify navigation and routing
7. Check accessibility with screen readers
