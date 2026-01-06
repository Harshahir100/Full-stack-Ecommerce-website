@echo off
REM Build script for Windows

echo Installing frontend dependencies...
cd frontend
call npm install

echo Building frontend...
call npm run build

echo Build complete! Frontend files are in frontend\dist

