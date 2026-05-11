# MYC Frontend - No Backend Version

Simple React app for document translation using Google Translate API.

## 🚨 Getting "Processing failed" Error?

**See [FIX-ERROR.md](FIX-ERROR.md)** - 2-minute fix!

## 🚀 Quick Start

### 1. Get API Key (2 minutes)

1. Go to https://cloud.google.com
2. Sign up (free account with $300 credit)
3. Search for "Google Translate API"
4. Click Enable
5. Go to Credentials > Create API Key
6. Copy your key (looks like: `AIzaSy...`)

### 2. Configure Project (1 minute)

```bash
cd myc-frontend

# Create .env.local with your API key
echo "VITE_GOOGLE_TRANSLATE_API_KEY=your-actual-key" > .env.local

# Or manually create .env.local file with above content
```

### 3. Install & Run (2 minutes)

```bash
npm install --legacy-peer-deps
npm run dev
```

Open: http://localhost:5173

## 📁 What's Included

- **React 19** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **PDF.js** - Extract from PDFs
- **Mammoth** - Extract from DOCX
- **XLSX** - Extract from Excel files
- **JSZip** - Extract from PowerPoint
- **Google Translate API** - Free translation (500K chars/month)

## 📄 Supported File Types

| Format | Support | Note |
|--------|---------|------|
| PDF | ✅ | Text PDFs (not scanned images) |
| DOCX | ✅ | Word documents |
| XLSX | ✅ | Excel files |
| PPTX | ✅ | PowerPoint files |
| TXT | ✅ | Plain text |

## 🌍 Supported Languages

French (fr), Arabic (ar), English (en), Italian (it), Chinese (zh), Spanish (es), German (de), Portuguese (pt), and 100+ more

## 💰 Costs

**Free Tier:** 500,000 characters per month
- Most documents well under limit
- Perfect for MVP/prototype

## 🐛 Having Issues?

1. **Error on startup?** → See [FIX-ERROR.md](FIX-ERROR.md)
2. **Can't extract text?** → See [TROUBLESHOOT.md](TROUBLESHOOT.md)
3. **Want detailed setup?** → See [QUICK-SETUP.md](QUICK-SETUP.md)
4. **Deep dive guide?** → See [../NO-BACKEND-GUIDE.md](../NO-BACKEND-GUIDE.md)

## 🧪 Diagnose Your Setup

Run this to check everything is configured:

**Windows:**
```bash
check-setup.bat
```

**Mac/Linux:**
```bash
bash check-setup.sh
```

## 📦 Build for Production

```bash
npm run build
```

Output in `dist/` folder - ready to deploy to Vercel!

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel dashboard
3. Add environment variable: `VITE_GOOGLE_TRANSLATE_API_KEY`
4. Deploy!

## 📚 Documentation

## Build

```bash
npm run build
```

Output in `dist/` folder

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Set env: `VITE_GOOGLE_TRANSLATE_API_KEY=your-key`
4. Deploy!

## Free Google Translate

- 500,000 chars/month free
- Perfect for most users
- Upgrade anytime if needed

See ../README.md for more info.
