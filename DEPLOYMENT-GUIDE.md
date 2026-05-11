# 🚀 Deploying TRADCTION to Production (Vercel + Render) - 100% FREE ✅

## Quick Summary
- **Frontend:** Vercel (https://vercel.com) - **GRATUIT**
- **Backend:** Render (https://render.com) - **GRATUIT** (pas de frais caché)
- **Domain:** Inclus (Vercel .vercel.app + Render .onrender.com)

---

## Step-by-Step Deployment

### **1️⃣ Deploy Backend to Render (FREE)**

#### Prerequisites
- GitHub account
- GitHub repo with TRADCTION code

#### Steps
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select your GitHub repo
5. Configure:
   - **Name:** `tradction-backend` (or your choice)
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Select **"Free"** (important!)
6. Click **"Create Web Service"**

#### Add Environment Variables
1. In Render dashboard, click your service
2. Go to **"Environment"**
3. Add:
   ```
   PORT=3000
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```
4. Click **"Deploy"** button

#### Get Your Backend URL
- In Render dashboard, copy the service URL
- Looks like: `https://tradction-backend-xxxx.onrender.com`
- **Save this URL** - you'll need it for the frontend!

---

### **2️⃣ Deploy Frontend to Vercel (FREE)**

#### Steps
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (if not already)
3. Click **"Add New..."** → **"Project"**
4. Select your TRADCTION GitHub repo
5. Configure:
   - **Root Directory:** `myc-frontend`
   - **Framework Preset:** `Vite`
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-render-backend-url.onrender.com
   ```
   (Use the URL you copied from Render above)
7. Click **"Deploy"**

#### Done! 🎉
- Frontend URL: `https://your-app.vercel.app`
- Backend URL: `https://tradction-backend-xxxx.onrender.com`
- **Total Cost: $0** ✅

---

## Testing Your Deployment

1. Go to your Vercel app: `https://your-app.vercel.app`
2. Try uploading a file (Excel, Word, PDF, or TXT)
3. Select a language
4. Click translate
5. Download the translated file ✅

If it works, you're done! If not, check:
- Backend health: `https://your-render-backend.onrender.com/api/health`
- Browser console for errors (F12)
- Check that VITE_API_URL matches exactly in Vercel

---

## Cost Breakdown

| Service | Free Tier | Paid |
|---------|-----------|------|
| **Vercel** | 100GB bandwidth/month | Free (upgrade later) |
| **Render** | 100MB RAM + 0.5 CPU | Free (upgrade later) |
| **Custom Domain** | Not included | Free .onrender.com & .vercel.app |
| **TOTAL** | - | **100% FREE** ✅ |

---

## Important: Free Tier Limitations

### Render Free Tier
- ⚠️ Service goes to sleep after 15 minutes of inactivity
- ✅ First request wakes it up (takes 30 seconds, then fast)
- ✅ No time limit for active usage
- ✅ 100% free, no credit card required*

*Note: Render may ask for verification but no charges

### Vercel Free Tier
- ✅ No sleep periods
- ✅ Always fast
- ✅ 100GB bandwidth (plenty)

---

## Troubleshooting

### "Cannot reach backend" / Endpoint returns 503
- **Solution:** Render service is waking up. Wait 30 seconds and try again.
- This is normal on free tier. Just wait and it will work!

### "File upload fails"
- Check upload file size (max 50MB)
- Make sure VITE_API_URL is set correctly in Vercel
- Make a test request to health endpoint first to wake up Render

### "Takes a long time to upload"
- Free tier is slower (expected)
- Batch translation happens in groups (normal)
- First request on Render takes 30 seconds to wake up

---

## Advanced: Upgrade Later

If your app gets popular:

**Upgrade Render to Paid:**
1. Go to Render dashboard
2. Click your service
3. Scroll to "Upgrade"
4. Choose paid plan ($7+/month)
5. Removes sleep periods + more RAM

**Upgrade Vercel (Optional):**
- Usually don't need to (free tier is generous)
- Only if you exceed 100GB/month bandwidth

---

## Environment Variables Checklist

**Vercel (.env):**
- [ ] `VITE_API_URL=https://your-render-backend.onrender.com`

**Render (.env):**
- [ ] `PORT=3000`
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_URL=https://your-app.vercel.app`

---

## Quick Links

- [Render.com](https://render.com) - Free backend
- [Vercel.com](https://vercel.com) - Free frontend
- [GitHub](https://github.com) - Code hosting

---

**Everything is 100% FREE! No credit card required to keep it running.** 🎉

