# 🚀 NO BACKEND - Deploy in 5 Minutes!

Your MYC platform **without any server**.

## ✨ Features

✅ **Free** - Uses Google Translate free tier
✅ **Simple** - Just upload a file and download translation
✅ **Fast** - No server needed, everything runs in browser
✅ **Easy Deploy** - Single Vercel deployment
✅ **No backend costs** - $0/month

## ⚡ Quick Start

### 1. Get Google Translate API Key (2 minutes)

Visit: https://cloud.google.com/console/project/_/apimanager/library

Steps:
```
1. Sign up for free Google Cloud (includes $300 credit)
2. Go to "APIs & Services" > "Library"
3. Search for "Google Translate API"
4. Click "Enable"
5. Go to "Credentials" > "Create Credentials"
6. Choose "API Key"
7. Copy your API key
```

### 2. Run Locally (1 minute)

```bash
cd myc-frontend

# Copy the package.json for no-backend version
cp package-no-backend.json package.json

# Create environment file
echo "VITE_GOOGLE_TRANSLATE_API_KEY=your-api-key-here" > .env.local

# Install and run
npm install --legacy-peer-deps
npm run dev
```

Then open http://localhost:5173

### 3. Deploy to Vercel (2 minutes)

```bash
# Initialize git
git init
git add .
git commit -m "MYC no-backend version"
git remote add origin https://github.com/yourname/myc-frontend.git
git push -u origin main
```

Then in Vercel:
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. **Set Environment Variable:**
   - `VITE_GOOGLE_TRANSLATE_API_KEY=your-api-key`
4. Click Deploy!

**That's it!** Your app is live in minutes. ✨

---

## 📖 How to Use

1. **Open the app** - Click upload area
2. **Select file** - PDF, DOCX, XLSX, or PPTX
3. **Choose language** - Arabic, French, English, Italian, Chinese, etc.
4. **Wait** - Translation happens in your browser
5. **Download** - Get translated text file

---

## 🎯 What's Different from Backend Version

| Feature | With Backend | No Backend |
|---------|---------|----------|
| **Cost** | $5-10/month | Free |
| **Deployment** | 2 platforms (Vercel + Railway) | 1 platform (Vercel) |
| **Document format** | Preserved | Text only |
| **Speed** | Depends on server | Instant (local) |
| **Translations/month** | Unlimited | 500,000 chars free |
| **Setup time** | 30 minutes | 5 minutes |

---

## 💡 Pro Tips

### Increase Translation Quota

Google Translate free tier includes:
- **500,000 characters/month** free
- $15 per 1 million characters after that

To increase:
1. Set billing in Google Cloud
2. Free credits cover ~33M characters
3. Very affordable: ~$1-2 per 1M characters

### Better Results

- Keep files under 50KB for best accuracy
- Simple PDFs work better than scanned images
- Avoid handwritten text

### File Size Support

| Format | Max Size |
|--------|----------|
| PDF | Unlimited (text extraction) |
| DOCX | Unlimited |
| XLSX | Unlimited (shows as CSV) |
| PPTX | Unlimited (text only) |

---

## 🔧 Troubleshooting

### "API key not configured"
- Add `VITE_GOOGLE_TRANSLATE_API_KEY` to `.env.local`
- For Vercel, add to Environment Variables

### "Invalid API key"
- Copy key exactly (no spaces before/after)
- Make sure Google Translate API is enabled

### "Translation failed"
- Check file is not corrupted
- Try smaller file
- Check Google API status: https://status.cloud.google.com/

### "Quota exceeded"
- You've hit 500K characters
- Either wait for monthly reset or enable billing

---

## 🌍 Supported Languages

Arabic, Bengali, Chinese, Dutch, English, French, German, Hebrew, Hindi, Indonesian, Italian, Japanese, Korean, Portuguese, Russian, Spanish, Swedish, Thai, Turkish, Vietnamese, and 80+ more!

---

## 📱 Mobile Support

Works perfectly on mobile! Upload via camera or files app.

---

## ⚠️ Limitations

- **Text only** - Can't preserve complex document layouts
- **No images** - Text extraction only
- **No macros** - Macros are ignored
- **Quota** - 500K chars/month free (plenty for most users)

---

## 🚀 Ready to Deploy?

```bash
# 1. Set up Google API key
# 2. Create .env.local with key
# 3. Deploy to Vercel
# 4. Share with friends!
```

**Questions?** Check the full docs or run locally first to test!

---

**Everything you need in one simple package!** 🎉
