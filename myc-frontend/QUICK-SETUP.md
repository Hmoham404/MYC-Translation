⚡ **QUICK SETUP - 5 MINUTES**

---

## 🎯 The Error You're Getting

```
❌ Translation Error
Processing failed. Please check your connection and try again.
```

**Most likely cause:** Google Translate API key is missing or not configured.

---

## ✅ FIX IN 3 STEPS

### **STEP 1: Get Your API Key** (2 minutes)

1. Go to: https://cloud.google.com
2. Click "Sign up" (free account)
3. In left menu: click "APIs & Services" > "Library"
4. Search: "Google Translate API"
5. Click the result
6. Click **Enable** button
7. Go to "Credentials" (left menu)
8. Click **"Create Credentials"** > **"API Key"**
9. Copy the key (looks like: `AIzaSy...`)

**Save the key!** You'll use it next.

---

### **STEP 2: Create .env.local File** (1 minute)

Open terminal in `myc-frontend` folder and run:

```bash
# Windows
echo VITE_GOOGLE_TRANSLATE_API_KEY=your-key-here > .env.local

# Mac/Linux
echo "VITE_GOOGLE_TRANSLATE_API_KEY=your-key-here" > .env.local
```

Replace `your-key-here` with the actual key from Step 1.

⚠️ **IMPORTANT:** Never share your API key! It starts with `AIzaSy...` and is unique to you.

```bash
# Replace YOUR_KEY_HERE with your actual key from Step 1
echo VITE_GOOGLE_TRANSLATE_API_KEY=YOUR_KEY_HERE > .env.local
```

---

### **STEP 3: Restart & Test** (1 minute)

```bash
# Stop current dev server (press Ctrl+C)

# Restart dev server
npm run dev

# Open http://localhost:5173 in browser
# Press F12 to open console
# Look for: ✅ Google Translate API key loaded
```

**Test Upload:**
1. Click "Drop your file here"
2. Select any PDF/DOCX/XLSX/PPTX file
3. Choose target language
4. Click "Translate"
5. Wait for result

---

## 🔍 Verify It's Working

### **Check 1: .env.local file exists**

```bash
# Windows
dir .env.local

# Mac/Linux
ls -la .env.local
```

Should show the file exists.

---

### **Check 2: Browser Console (F12)**

1. Open browser
2. Press **F12**
3. Click **Console** tab
4. Should see: `✅ Google Translate API key loaded`

If you see: `⚠️ WARNING: VITE_GOOGLE_TRANSLATE_API_KEY not configured!`
→ Your .env.local file is missing or wrong

---

### **Check 3: Test Simple Text**

Don't upload file yet. Test the API:

1. In browser console (F12 > Console):

```javascript
fetch('https://translation.googleapis.com/language/translate/v2', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    key: 'YOUR_KEY_FROM_STEP_1',
    q: 'Hello',
    target: 'fr'
  })
})
.then(r => r.json())
.then(d => console.log(d))
```

If you see JSON with translation "Bonjour" → API key works!

---

## ❓ Common Issues

### **Issue: Still seeing "Processing failed"**

```
✓ Restarted dev server after creating .env.local?
✓ Hard refresh browser (Ctrl+Shift+R)?
✓ Check console shows ✅ API key loaded?
✓ Key copied EXACTLY from Google Cloud (no spaces)?
```

### **Issue: "PDF.js library not loaded"**

Check `myc-frontend/index.html` has these 4 lines in `<head>`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.0/pdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
```

If missing, add them and restart `npm run dev`.

### **Issue: "API error 400"**

- Is your API key enabled in Google Cloud?
- Check: https://console.cloud.google.com/apis/api/translate/metrics
- Did you exceed 500K chars/month free tier?

---

## 📋 Checklist

Before you upload a file:

```
□ Have Google Translate API key from cloud.google.com?
□ Created .env.local with VITE_GOOGLE_TRANSLATE_API_KEY?
□ Restarted npm run dev after creating .env.local?
□ Pressed Ctrl+Shift+R to hard refresh browser?
□ Console (F12) shows ✅ API key loaded?
□ index.html has all 4 library scripts?
□ File is PDF/DOCX/XLSX/PPTX (not scanned image)?
```

---

## 🚀 Deploy to Production

Once working locally:

```bash
git add .
git commit -m "MYC translator working"
git push origin main
```

**In Vercel:**
1. Import your GitHub repo
2. Add environment variable: `VITE_GOOGLE_TRANSLATE_API_KEY` = your key
3. Deploy!

---

## 📖 For More Help

- **Detailed troubleshooting:** See `TROUBLESHOOT.md`
- **Full documentation:** See `README.md` and `NO-BACKEND-GUIDE.md`
- **Code details:** See `myc-frontend/src/services/`

---

**That's it!** Your app should work now. 🎉

Any issues? Check:
1. Browser console (F12)
2. Copy exact error message
3. See TROUBLESHOOT.md with your error
