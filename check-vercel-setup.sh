#!/bin/bash
# Quick setup script for Vercel deployment testing locally

echo "🔍 Checking TRADCTION setup for Vercel deployment..."
echo ""

# Check if backend is configured
if [ -f "server/.env" ]; then
  echo "✅ Backend .env found"
else
  echo "❌ Backend .env missing"
fi

# Check if frontend is configured
if [ -f "myc-frontend/.env.local" ]; then
  echo "✅ Frontend .env.local found"
  echo "   API URL: $(grep VITE_API_URL myc-frontend/.env.local)"
else
  echo "❌ Frontend .env.local missing"
fi

# Check if Procfile exists (for Railway)
if [ -f "server/Procfile" ]; then
  echo "✅ Procfile found (Railway ready)"
else
  echo "❌ Procfile missing"
fi

# Check if vercel.json exists
if [ -f "myc-frontend/vercel.json" ]; then
  echo "✅ vercel.json found (Vercel ready)"
else
  echo "❌ vercel.json missing"
fi

echo ""
echo "📖 To deploy:"
echo "1. Push to GitHub: git push"
echo "2. Go to Railway.app → Deploy backend from GitHub"
echo "3. Go to Vercel.com → Deploy frontend from GitHub"
echo "4. Set VITE_API_URL in Vercel to your Railway URL"
echo ""
echo "✨ For local testing:"
echo "   Backend: cd server && npm start"
echo "   Frontend: cd myc-frontend && npm run dev"
