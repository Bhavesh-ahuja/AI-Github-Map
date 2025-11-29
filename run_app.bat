@echo off
echo ===================================================
echo 🚀 Starting GitMap.AI...
echo ===================================================

:: 1. Start Backend in a new window
echo Starting Backend Server...
start "GitMap Backend" cmd /k "cd backend && venv\Scripts\activate && uvicorn main:app --reload"

:: 2. Wait a few seconds for backend to warm up
timeout /t 3 /nobreak >nul

:: 3. Start Frontend in a new window
echo Starting Frontend...
start "GitMap Frontend" cmd /k "cd frontend && npm run dev"

:: 4. Open Browser
echo Opening Browser...
timeout /t 2 /nobreak >nul
start http://localhost:5173

echo ===================================================
echo ✅ System is running!
echo Close the popup windows to stop the servers.
echo ===================================================
pause
