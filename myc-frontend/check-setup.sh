#!/bin/bash
# DIAGNOSTIC SCRIPT - Check if your setup is correct
# Run this in myc-frontend folder: bash check-setup.sh

echo "=========================================="
echo "MYC TRANSLATION - SETUP DIAGNOSTIC"
echo "=========================================="
echo ""

# Check 1: Node and npm versions
echo "✓ CHECKING: Node.js & npm..."
node --version
npm --version
echo ""

# Check 2: .env.local exists
echo "✓ CHECKING: .env.local file..."
if [ -f .env.local ]; then
    echo "  ✅ .env.local exists"
    if grep -q "VITE_GOOGLE_TRANSLATE_API_KEY=" .env.local; then
        echo "  ✅ VITE_GOOGLE_TRANSLATE_API_KEY is set"
        KEY=$(grep "VITE_GOOGLE_TRANSLATE_API_KEY=" .env.local | cut -d'=' -f2)
        if [ -z "$KEY" ] || [ "$KEY" = "your-key-here" ] || [ "$KEY" = "paste-your-key-here" ]; then
            echo "  ❌ API KEY IS EMPTY OR PLACEHOLDER!"
            echo "     Please set a real key from https://cloud.google.com"
        else
            echo "  ✅ API key appears to be set (${#KEY} chars)"
        fi
    else
        echo "  ❌ VITE_GOOGLE_TRANSLATE_API_KEY not found in .env.local"
    fi
else
    echo "  ❌ .env.local NOT FOUND!"
    echo "     Run: cp .env.local.example .env.local"
    echo "     Then edit with your API key from https://cloud.google.com"
fi
echo ""

# Check 3: Dependencies installed
echo "✓ CHECKING: Dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✅ node_modules exists"
    if [ -f "node_modules/react/package.json" ]; then
        echo "  ✅ React is installed"
    else
        echo "  ❌ React not found - run: npm install --legacy-peer-deps"
    fi
else
    echo "  ❌ node_modules NOT FOUND!"
    echo "     Run: npm install --legacy-peer-deps"
fi
echo ""

# Check 4: Key files exist
echo "✓ CHECKING: Key project files..."
files=("src/main.jsx" "src/App.jsx" "src/services/api.js" "src/services/clientTranslationService.js" "vite.config.js" "package.json" "index.html")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file MISSING!"
    fi
done
echo ""

# Check 5: index.html has library scripts
echo "✓ CHECKING: Library scripts in index.html..."
if grep -q "pdf.js" index.html; then
    echo "  ✅ PDF.js script found"
else
    echo "  ❌ PDF.js script MISSING!"
fi
if grep -q "mammoth" index.html; then
    echo "  ✅ Mammoth script found"
else
    echo "  ❌ Mammoth script MISSING!"
fi
if grep -q "xlsx" index.html; then
    echo "  ✅ XLSX script found"
else
    echo "  ❌ XLSX script MISSING!"
fi
if grep -q "jszip" index.html; then
    echo "  ✅ JSZip script found"
else
    echo "  ❌ JSZip script MISSING!"
fi
echo ""

# Check 6: Tailwind CSS configured
echo "✓ CHECKING: Tailwind CSS..."
if [ -f "tailwind.config.js" ] || grep -q "tailwindcss" package.json; then
    echo "  ✅ Tailwind appears configured"
else
    echo "  ⚠️  Tailwind might not be configured"
fi
echo ""

echo "=========================================="
echo "NEXT STEPS:"
echo "=========================================="
echo ""
echo "1. If you see ❌ errors above, fix them"
echo "2. Stop dev server (Ctrl+C if running)"
echo "3. Run: npm run dev"
echo "4. Open http://localhost:5173"
echo "5. Press F12 to open console"
echo "6. Look for: ✅ Google Translate API key loaded"
echo ""
echo "For more help: See TROUBLESHOOT.md or QUICK-SETUP.md"
echo "=========================================="
