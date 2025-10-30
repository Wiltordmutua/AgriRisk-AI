# CSS Class Reference Guide

Quick reference for all custom CSS classes in `src/style.css`

## Layout

| Class | Description |
|-------|-------------|
| `.app-layout` | Main application layout container |
| `.app-content` | Content wrapper (flex column) |
| `.app-main` | Main content area with padding |

## Sidebar

| Class | Description |
|-------|-------------|
| `.sidebar` | Sidebar container |
| `.sidebar-header` | Sidebar header section |
| `.sidebar-logo-container` | Logo and title wrapper |
| `.sidebar-logo` | Logo image |
| `.sidebar-title` | Application title |
| `.sidebar-subtitle` | Subtitle text |
| `.sidebar-nav` | Navigation container |
| `.sidebar-nav-section-title` | Section title in nav |
| `.sidebar-nav-item` | Navigation link |
| `.sidebar-nav-item.active` | Active navigation link |
| `.sidebar-footer` | Sidebar footer |
| `.sidebar-footer-label` | Footer label text |

## Topbar

| Class | Description |
|-------|-------------|
| `.topbar` | Topbar container |
| `.topbar-container` | Content wrapper |
| `.topbar-left` | Left section |
| `.topbar-logo-mobile` | Mobile logo |
| `.topbar-season-label` | Season label |
| `.topbar-season-value` | Season value |
| `.topbar-right` | Right section |
| `.topbar-notification-btn` | Notification button |
| `.topbar-notification-badge` | Notification badge |
| `.topbar-user-name` | User name text |
| `.topbar-user-avatar` | User avatar circle |

## Dashboard

| Class | Description |
|-------|-------------|
| `.dashboard-container` | Main dashboard container |
| `.dashboard-header-title` | Dashboard title |
| `.dashboard-header-subtitle` | Dashboard subtitle |
| `.stat-card` | Statistics card |
| `.stat-card-header` | Card header |
| `.stat-card-icon` | Icon container |
| `.stat-card-trend` | Trend indicator |
| `.stat-card-trend.up` | Upward trend |
| `.stat-card-trend.down` | Downward trend |
| `.stat-card-title` | Card title |
| `.stat-card-value` | Card value |
| `.chart-card` | Chart container card |
| `.chart-card-header` | Chart header |
| `.chart-card-title` | Chart title |
| `.chart-card-subtitle` | Chart subtitle |

## Activity Feed

| Class | Description |
|-------|-------------|
| `.activity-item` | Activity item container |
| `.activity-icon` | Activity icon wrapper |
| `.activity-icon.create` | Create activity icon |
| `.activity-icon.complete` | Complete activity icon |
| `.activity-icon.update` | Update activity icon |
| `.activity-icon.export` | Export activity icon |
| `.activity-icon.system` | System activity icon |
| `.activity-content` | Activity content |
| `.activity-user` | User name |
| `.activity-action` | Action description |
| `.activity-project` | Project name |
| `.activity-time` | Time stamp |

## System Health

| Class | Description |
|-------|-------------|
| `.system-metric` | System metric container |
| `.system-metric-header` | Metric header |
| `.system-metric-name` | Metric name |
| `.system-metric-value` | Metric value |
| `.system-metric-value.good` | Good status |
| `.system-metric-value.warning` | Warning status |
| `.system-metric-bar-container` | Progress bar container |
| `.system-metric-bar` | Progress bar |
| `.system-metric-bar.good` | Good status bar |
| `.system-metric-bar.warning` | Warning status bar |
| `.system-status` | System status section |
| `.system-status-container` | Status container |
| `.system-status-label-container` | Label wrapper |
| `.system-status-indicator` | Status indicator dot |
| `.system-status-label` | Status label |
| `.system-status-value` | Status value |

## Authentication Pages

| Class | Description |
|-------|-------------|
| `.auth-layout` | Auth page layout |
| `.auth-image-section` | Image side section |
| `.auth-image` | Background image |
| `.auth-image-overlay` | Image overlay |
| `.auth-image-content` | Image content |
| `.auth-image-title` | Image section title |
| `.auth-image-subtitle` | Image section subtitle |
| `.auth-form-section` | Form side section |
| `.auth-form-container` | Form container |
| `.auth-form-header` | Form header |
| `.auth-form-title` | Form title |
| `.auth-form-subtitle` | Form subtitle |
| `.auth-form` | Form element |
| `.auth-form.signup` | Signup form variant |
| `.auth-input-group` | Input group |
| `.auth-input-label` | Input label |
| `.auth-input-wrapper` | Input wrapper |
| `.auth-input-icon` | Input icon |
| `.auth-input` | Input field |
| `.auth-input-with-toggle` | Input with toggle button |
| `.auth-input-toggle` | Password toggle button |
| `.auth-remember-forgot` | Remember/forgot section |
| `.auth-remember` | Remember me section |
| `.auth-checkbox` | Checkbox input |
| `.auth-checkbox-label` | Checkbox label |
| `.auth-forgot-link` | Forgot password link |
| `.auth-submit-btn` | Submit button |
| `.auth-terms` | Terms section |
| `.auth-terms-checkbox` | Terms checkbox |
| `.auth-terms-label` | Terms label |
| `.auth-terms-link` | Terms link |
| `.auth-footer-text` | Footer text |
| `.auth-footer-text.signup` | Signup footer variant |
| `.auth-footer-link` | Footer link |

## Portfolio Page

| Class | Description |
|-------|-------------|
| `.portfolio-container` | Main container |
| `.portfolio-header-title` | Page title |
| `.portfolio-header-subtitle` | Page subtitle |
| `.portfolio-summary-grid` | Summary cards grid |
| `.portfolio-summary-card` | Summary card |
| `.portfolio-summary-label` | Card label |
| `.portfolio-summary-value` | Card value |
| `.portfolio-alert-card` | Alert card |
| `.portfolio-alert-icon` | Alert icon |
| `.portfolio-alert-label` | Alert label |
| `.portfolio-alert-value` | Alert value |
| `.portfolio-charts-grid` | Charts grid |
| `.portfolio-chart-card` | Chart card |
| `.portfolio-chart-title` | Chart title |
| `.portfolio-insight-card` | Insight card |
| `.portfolio-insight-title` | Insight title |
| `.portfolio-insight-text` | Insight text |
| `.portfolio-insight-note` | Insight note |

## Simple Pages

| Class | Description |
|-------|-------------|
| `.simple-page-container` | Page container |
| `.simple-page-title` | Page title |
| `.simple-page-description` | Page description |

## Utility Classes

| Class | Description |
|-------|-------------|
| `.grid-cols-1` | Single column grid |
| `.md\:grid-cols-2` | Two columns on medium+ |
| `.lg\:grid-cols-2` | Two columns on large+ |
| `.lg\:grid-cols-4` | Four columns on large+ |
| `.space-y-4` | Vertical spacing (1rem) |
| `.space-y-6` | Vertical spacing (1.5rem) |
| `.gap-6` | Gap spacing (1.5rem) |
| `.bg-blue-500` | Blue background |
| `.bg-agrigreen` | Green background |
| `.bg-purple-500` | Purple background |
| `.bg-accent` | Accent background |

## Usage Examples

### Sidebar Navigation Item
```jsx
<NavLink 
  to="/dashboard" 
  className={({ isActive }) => 
    `sidebar-nav-item ${isActive ? "active" : ""}`
  }
>
  <Icon size={16} />
  Dashboard
</NavLink>
```

### Stat Card
```jsx
<div className="stat-card">
  <div className="stat-card-header">
    <div className="stat-card-icon bg-blue-500">
      <Icon />
    </div>
    <div className="stat-card-trend up">
      <TrendingUp />
      <span>+12.5%</span>
    </div>
  </div>
  <h3 className="stat-card-title">Total Users</h3>
  <p className="stat-card-value">1,284</p>
</div>
```

### Auth Input
```jsx
<div className="auth-input-group">
  <label htmlFor="email" className="auth-input-label">
    Email Address
  </label>
  <div className="auth-input-wrapper">
    <div className="auth-input-icon">
      <Mail />
    </div>
    <input 
      type="email" 
      className="auth-input" 
      placeholder="you@example.com" 
    />
  </div>
</div>
```
