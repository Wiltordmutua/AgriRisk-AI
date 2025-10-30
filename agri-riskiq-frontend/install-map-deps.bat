@echo off
echo Installing Map Page Dependencies...
echo.
call npm install leaflet react-leaflet@4.2.1 leaflet-draw react-draggable --legacy-peer-deps
echo.
echo Installation complete!
pause
