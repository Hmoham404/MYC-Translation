@echo off
REM Quick setup check for Vercel deployment on Windows

echo.
echo 🔍 Checking TRADCTION setup for Vercel deployment...
echo.

REM Check backend .env
if exist "server\.env" (
  echo ✅ Backend .env found
) else (
  echo ❌ Backend .env missing
)

REM Check frontend .env.local
if exist "myc-frontend\.env.local" (
  echo ✅ Frontend .env.local found
  for /f "delims=" %%i in ('findstr "VITE_API_URL" myc-frontend\.env.local') do echo    %%i
) else (
  echo ❌ Frontend .env.local missing
)

REM Check Procfile
if exist "server\Procfile" (
  echo ✅ Procfile found (Railway ready)
) else (
  echo ❌ Procfile missing
)

REM Check vercel.json
if exist "myc-frontend\vercel.json" (
  echo ✅ vercel.json found (Vercel ready)
) else (
  echo ❌ vercel.json missing
)

echo.
echo 📖 To deploy:
echo 1. Push to GitHub: git push
echo 2. Go to Railway.app ^> Deploy backend from GitHub
echo 3. Go to Vercel.com ^> Deploy frontend from GitHub
echo 4. Set VITE_API_URL in Vercel to your Railway URL
echo.
echo ✨ For local testing:
echo    Backend: cd server ^&^& npm start
echo    Frontend: cd myc-frontend ^&^& npm run dev
echo.
pause
