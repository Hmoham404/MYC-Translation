# TRADCTION - Document Translation Platform

Une plateforme complète de traduction de documents avec préservation du format original.

## 🎯 Fonctionnalités

✅ **Vraie traduction** - Utilise Google Translate API  
✅ **Formats supportés** - PDF, DOCX, XLSX, PPTX, TXT  
✅ **Préservation du format** - Même police, couleurs, mise en forme  
✅ **Client + Backend** - Architecture robuste  
✅ **Sans coûts API** - API publique gratuite  

## 🚀 Installation

### 1. Backend

```bash
cd server
npm install
node server.js
```

Le serveur démarre sur `http://localhost:5000`

### 2. Frontend

```bash
cd myc-frontend
npm install --legacy-peer-deps
npm run dev
```

L'app démarre sur `http://localhost:5173`

## 📋 Format de Fichier Retourné

| Input | Output | Format |
|-------|--------|--------|
| XLSX  | XLSX   | ✅ Préservé |
| DOCX  | DOCX   | ✅ Préservé |
| PDF   | PDF    | ✅ Recréé |
| TXT   | TXT    | ✅ Texte |

## 🌍 Langues Supportées

- Français (fr)
- English (en)
- العربية (ar)
- Español (es)
- Deutsch (de)
- Português (pt)
- Italiano (it)
- 中文 (zh)
- 日本語 (ja)
- 한국어 (ko)

## 📁 Structure

```
.
├── server/                    # Backend Node.js
│   ├── services/
│   │   ├── translationService.js      # Traduction réelle
│   │   ├── ExcelSurgery.js           # Excel reconstruction
│   │   ├── WordSurgery.js            # Word reconstruction
│   │   └── PdfSurgery.js             # PDF reconstruction
│   ├── controllers/
│   │   └── documentController.js
│   └── server.js
│
└── myc-frontend/              # Frontend React
    ├── src/
    │   ├── components/
    │   │   ├── UploadBox.jsx
    │   │   ├── PreviewPanel.jsx
    │   │   └── ...
    │   └── services/
    │       └── api.js                 # API Client
    └── vite.config.js
```

## 🔧 Configuration

### Frontend

Créez `.env.local`:
```
VITE_API_URL=http://localhost:5000
```

### Backend

Le backend utilise l'API publique de Google Translate (gratuit, aucune clé requise)

## 🚨 Dépannage

**"Cannot connect to server"**
- Assurez-vous que le serveur s'exécute: `node server.js`
- Vérifiez que le port 5000 est libre

**"Translation timeout"**
- La traduction peut être lente pour les gros fichiers
- Google API peut limiter les demandes (attendez quelques secondes)

**"File format not preserved"**
- DOCX/XLSX/PDF utilisent des librairies spécialisées
- S'assurer que toutes les dépendances sont installées

## 📞 Support

Pour les erreurs ou suggestions, consultez les logs du serveur (`server.js`)

---

**Version:** 1.0.0  
**Date:** Mai 2026  
**Licence:** MIT
│   │   └── clientTranslationService.js ← Client-side processing
│   └── ...
├── package.json           ← Dependencies
├── vite.config.js        ← Build config
├── vercel.json           ← Vercel config
└── .env.local.example    ← Copy & fill with your API key
```

---

## 🛠️ What's Inside

- **React 19** - Frontend UI
- **Vite** - Fast bundler
- **Tailwind CSS** - Styling
- **pdfjs** - PDF processing
- **mammoth** - Word processing
- **xlsx** - Excel processing
- **Google Translate API** - Translation

---

## 📖 How It Works

```
1. You upload file → Browser reads it
2. Extract text → JavaScript libraries extract content
3. Translate → Google Translate API translates
4. Download → Save as text file
```

All processing happens in your browser!

---

## ⚠️ Limitations

- **Text only** - Output is plain text (no formatting)
- **No images** - Text extraction only
- **Quota** - 500K chars/month free (reset monthly)

---

## 🔧 Environment Variables

### Development (.env.local)

```env
VITE_GOOGLE_TRANSLATE_API_KEY=your-google-api-key
```

### Production (Vercel)

Set in Vercel dashboard:
```
VITE_GOOGLE_TRANSLATE_API_KEY=your-google-api-key
```

---

## 🚀 Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint code
npm lint
```

---

## 📚 Resources

- **Google Cloud Console:** https://console.cloud.google.com/
- **Google Translate Docs:** https://cloud.google.com/translate/docs
- **Vercel Docs:** https://vercel.com/docs
- **React Docs:** https://react.dev

---

## ❓ Troubleshooting

### "API key not configured"
- Make sure `.env.local` has `VITE_GOOGLE_TRANSLATE_API_KEY`
- Restart dev server after creating `.env.local`

### "Invalid API key"
- Copy key exactly (no spaces)
- Verify Google Translate API is enabled

### "Translation failed"
- Check file is not corrupted
- Try smaller file
- Check Google API status

### "Quota exceeded"
- You've hit 500K characters
- Wait for monthly reset or enable billing

---

## 💡 Tips

- Keep files under 50KB for best speed
- Simple PDFs work better than scanned images
- Complex formatting will be lost in text conversion

---

## 📞 Support

Check the guide: `NO-BACKEND-GUIDE.md`

---

## 🎉 You're Ready!

```bash
npm run dev
# Open http://localhost:5173
# Upload a document
# Download translation
# Done! 🚀
```

---

**Questions? Read NO-BACKEND-GUIDE.md for detailed info!** 
"# MYC-Beauty-Innovation-Tunisia-" 
