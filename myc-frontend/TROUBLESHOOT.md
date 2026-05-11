🔧 **TROUBLESHOOTING GUIDE**

---

## ❌ Error: "Processing failed. Please check your connection..."

### Common Causes & Solutions

#### 1️⃣ **Missing Google Translate API Key** (Most Common)

**Symptom:** Error appears immediately when trying to translate

**Solution:**
```bash
# Step 1: Create .env.local file
echo "VITE_GOOGLE_TRANSLATE_API_KEY=your-actual-key" > .env.local

# Step 2: Restart dev server
npm run dev

# Step 3: Check browser console (F12 > Console tab)
# Should see: ✅ Google Translate API key loaded
# NOT: ⚠️ WARNING: VITE_GOOGLE_TRANSLATE_API_KEY not configured!
```

**To Get API Key:**
1. Go: https://cloud.google.com
2. Sign up (free account)
3. Go: APIs & Services > Library
4. Search: "Google Translate API"
5. Click: Enable
6. Go: Credentials > Create API Key
7. Copy the key to `.env.local`

---

#### 2️⃣ **Libraries Not Loaded** (PDF, DOCX, Excel, PowerPoint fail)

**Symptom:** Error like "PDF.js library not loaded" or "Mammoth library not loaded"

**Solution:**
Check that `index.html` has all library scripts:

```html
<!-- Should see ALL 4 of these in <head> section: -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.0/pdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
```

If missing, add them to `index.html` in the `<head>` section.

**Requires:** Restart dev server after editing

---

#### 3️⃣ **Translation API Error** (Invalid Key or Quota Exceeded)

**Symptom:** Error like "API error 400" or "Translation failed"

**Check 1:** Is key valid?
```bash
# Copy exact key from Google Cloud dashboard
# Paste into .env.local - no spaces, no extra characters
VITE_GOOGLE_TRANSLATE_API_KEY=AIzaSy...exactlyAsShown...
```

**Check 2:** Did you exceed free tier?
- Free: 500,000 characters/month
- Check usage: https://console.cloud.google.com/apis/api/translate/metrics

**Check 3:** Is API enabled?
- https://console.cloud.google.com/apis/library/translate.googleapis.com
- Should show "API is enabled" (blue checkmark)

---

#### 4️⃣ **File Extraction Failed**

**Symptom:** "Text extraction failed" or "Could not extract text"

**Cause:** File might be:
- Encrypted/password-protected
- Corrupted
- Scanned image (not selectable text)
- Empty

**Solution:**
1. Try simpler file first (text file or simple PDF)
2. Make sure it's not an image scan
3. Check file is not corrupted (open in native app)
4. Try smaller file to test

---

#### 5️⃣ **Network Connection Issues**

**Symptom:** "Please check your connection" but connection is fine

**Solution:**

**Check 1:** Are external CDN libraries loading?
```
Open: Chrome DevTools (F12) > Network tab
Look for: pdf.min.js, mammoth.browser.min.js, xlsx.min.js, jszip.min.js
Status should be: 200 (green checkmark)
```

**Check 2:** Is Google Translate API reachable?
```
Try in browser console (F12):
fetch('https://translation.googleapis.com/language/translate/v2', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({key: 'YOUR_KEY', q: 'hello', target: 'fr'})
})
.then(r => r.json())
.then(d => console.log(d))
```

**Check 3:** Firewall/Proxy blocking?
- Try on different network (mobile hotspot)
- Check corporate firewall rules
- Try VPN if blocked

---

## 🔍 **DEBUGGING STEPS**

### Step 1: Check Browser Console
```
Press: F12 (Chrome/Edge) or Cmd+Option+I (Mac)
Go to: Console tab
Look for: ✅ or ❌ messages with emoji
Copy-paste any error messages
```

### Step 2: Check .env.local exists
```bash
# In myc-frontend directory:
ls -la .env.local   # Mac/Linux
dir /a .env.local   # Windows

# Should show file exists and has content like:
VITE_GOOGLE_TRANSLATE_API_KEY=AIzaSy...
```

### Step 3: Verify API Key Format
```bash
# Your key should:
✅ Start with "AIzaSy"
✅ Be 39+ characters long
✅ Have no spaces
✅ Have no quotes

# NOT:
❌ "AIzaSy..." (don't include quotes)
❌ AIzaSy... (missing)
❌ YOUR_KEY (placeholder text)
```

### Step 4: Check Dev Server Running
```
Terminal shows:
✅ VITE v8.0.10 ready in 123 ms
✅ ➜  Local:   http://localhost:5173/
```

### Step 5: Hard Refresh Browser
```
Windows/Linux: Ctrl+Shift+R
Mac: Cmd+Shift+R
```

---

## 🎯 **QUICK DIAGNOSIS CHECKLIST**

Use this to systematically find the problem:

```
□ API key in .env.local?
  → If NO: Create it (see section 1 above)
  → If YES: Go to next

□ Dev server restarted after adding key?
  → If NO: Stop npm run dev, then npm run dev again
  → If YES: Go to next

□ Browser console shows ✅ API key loaded?
  → If NO: Key not configured properly
  → If YES: Go to next

□ All 4 library scripts in index.html?
  → If NO: Add them (see section 2 above)
  → If YES: Go to next

□ Can upload file without error?
  → If NO: Unsupported file format (use PDF/DOCX/XLSX/PPTX)
  → If YES: Go to next

□ Error during extraction or translation?
  → Check console for which step failed
  → See sections 3-4 above for solutions
```

---

## 📞 **STILL NOT WORKING?**

### Open Browser Console & Look For:

**If you see:** `⚠️ WARNING: VITE_GOOGLE_TRANSLATE_API_KEY not configured!`
→ **Solution:** Create `.env.local` with your API key

**If you see:** `❌ API key not configured`
→ **Solution:** Restart dev server after creating `.env.local`

**If you see:** `❌ [Library name] library not loaded`
→ **Solution:** Check internet connection, verify CDN URLs in `index.html`

**If you see:** `API error 400: invalid_request_exception`
→ **Solution:** Check API key is valid and enabled

**If you see:** `Failed to read TXT file` or extraction errors
→ **Solution:** Try a different file, check it's not password-protected

---

## 🚀 **QUICK FIX SUMMARY**

```bash
# 1. Stop dev server (Ctrl+C)
# 2. Create .env.local
echo "VITE_GOOGLE_TRANSLATE_API_KEY=YOUR_KEY_HERE" > .env.local

# 3. Restart dev server
npm run dev

# 4. Hard refresh browser (Ctrl+Shift+R)
# 5. Check console (F12) for ✅ messages
# 6. Try uploading a file
```

---

## 📊 **REFERENCE: Supported File Types**

| Format | Status | Notes |
|--------|--------|-------|
| PDF | ✅ | Text PDFs (not scans) |
| DOCX | ✅ | Microsoft Word |
| XLSX | ✅ | Microsoft Excel (all sheets) |
| PPTX | ✅ | Microsoft PowerPoint |
| TXT | ✅ | Plain text files |
| DOC | ❌ | Use DOCX instead |
| XLS | ❌ | Use XLSX instead |
| ODP | ❌ | Use PPTX instead |
| ODT | ❌ | Use DOCX instead |

---

## 💡 **TIPS**

1. **Test with text file first:** Create `test.txt` with "Hello World" and translate to test API key
2. **Check API usage:** https://console.cloud.google.com/apis/api/translate/metrics
3. **Monitor costs:** Free tier = 500K chars/month
4. **Use console logs:** Open F12 console to see detailed processing steps

---

**Still stuck?** Copy the error message from browser console (F12) and include:
- Your OS (Windows/Mac/Linux)
- File type being tested
- Error message from console
- Output of: `npm --version` and `node --version`

Then see: NO-BACKEND-GUIDE.md > Troubleshooting section
