# Map Page Dependencies Installation

## Required Packages

Run this command in your terminal (in the `agri-riskiq-frontend` directory):

```bash
npm install leaflet react-leaflet@4.2.1 leaflet-draw react-draggable --legacy-peer-deps
```

## Why --legacy-peer-deps?

Your project uses React 18, but react-leaflet v5 requires React 19. Using v4.2.1 with `--legacy-peer-deps` ensures compatibility.

## Alternative: If the above doesn't work

Try installing packages one by one:

```bash
npm install leaflet --legacy-peer-deps
npm install react-leaflet@4.2.1 --legacy-peer-deps
npm install leaflet-draw --legacy-peer-deps
npm install react-draggable --legacy-peer-deps
```

## After Installation

The MapPage should work with:
- Interactive Leaflet map
- Satellite imagery
- NDVI, Rainfall, and Risk overlays
- Drawing tools (polygon, rectangle, circle)
- Draggable legend
- AI risk scoring

## If PowerShell Blocks npm

Run this in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then retry the npm install commands.
