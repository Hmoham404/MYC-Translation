@echo off
REM DIAGNOSTIC SCRIPT FOR WINDOWS - Check if your setup is correct
REM Run this in myc-frontend folder: check-setup.bat

echo.
echo ==========================================
echo MYC TRANSLATION - SETUP DIAGNOSTIC
echo ==========================================
echo.

REM Check 1: Node and npm versions
echo ^> CHECKING: Node.js ^& npm...
node --version
npm --version
echo.

REM Check 2: .env.local exists
echo ^> CHECKING: .env.local file...
if exist .env.local (
    echo   [OK] .env.local exists
    
    REM Check if key is set
    findstr /M "VITE_GOOGLE_TRANSLATE_API_KEY=" .env.local >nul
    if errorlevel 1 (
        echo   [ERROR] VITE_GOOGLE_TRANSLATE_API_KEY not found!
    ) else (
        echo   [OK] VITE_GOOGLE_TRANSLATE_API_KEY is set
        
        REM Check for placeholder values
        findstr "your-key-here" .env.local >nul
        if errorlevel 0 (
            echo   [ERROR] API KEY IS PLACEHOLDER - Set real key from https://cloud.google.com
        ) else (
            echo   [OK] API key appears to be set
        )
    )
) else (
    echo   [ERROR] .env.local NOT FOUND!
    echo   Run: copy .env.local.example .env.local
    echo   Then edit with your API key from https://cloud.google.com
)
echo.

REM Check 3: Dependencies installed
echo ^> CHECKING: Dependencies...
if exist node_modules (
    echo   [OK] node_modules exists
    
    if exist "node_modules\react" (
        echo   [OK] React is installed
    ) else (
        echo   [ERROR] React not found - run: npm install --legacy-peer-deps
    )
) else (
    echo   [ERROR] node_modules NOT FOUND!
    echo   Run: npm install --legacy-peer-deps
)
echo.

REM Check 4: Key files exist
echo ^> CHECKING: Key project files...
set files=src\main.jsx src\App.jsx src\services\api.js src\services\clientTranslationService.js vite.config.js package.json index.html

for %%F in (%files%) do (
    if exist "%%F" (
        echo   [OK] %%F
    ) else (
        echo   [ERROR] %%F MISSING!
    )
)
echo.

REM Check 5: index.html has library scripts
echo ^> CHECKING: Library scripts in index.html...

findstr "pdf.js" index.html >nul
if errorlevel 1 (
    echo   [ERROR] PDF.js script MISSING!
) else (
    echo   [OK] PDF.js script found
)

findstr "mammoth" index.html >nul
if errorlevel 1 (
    echo   [ERROR] Mammoth script MISSING!
) else (
    echo   [OK] Mammoth script found
)

findstr "xlsx" index.html >nul
if errorlevel 1 (
    echo   [ERROR] XLSX script MISSING!
) else (
    echo   [OK] XLSX script found
)

findstr "jszip" index.html >nul
if errorlevel 1 (
    echo   [ERROR] JSZip script MISSING!
) else (
    echo   [OK] JSZip script found
)
echo.

REM Check 6: Tailwind CSS
echo ^> CHECKING: Tailwind CSS...
if exist tailwind.config.js (
    echo   [OK] Tailwind appears configured
) else (
    echo   [WARN] tailwind.config.js not found
)
echo.

echo ==========================================
echo NEXT STEPS:
echo ==========================================
echo.
echo 1. If you see [ERROR] above, fix them
echo 2. Stop dev server (Ctrl+C if running)
echo 3. Run: npm run dev
echo 4. Open http://localhost:5173
echo 5. Press F12 to open console
echo 6. Look for: ^[OK] Google Translate API key loaded
echo.
echo For more help: See TROUBLESHOOT.md or QUICK-SETUP.md
echo ==========================================
echo.
pause
