# Vercel Deployment Guide - 100% FREE ✅

## Deploy: Render (Backend) + Vercel (Frontend)

### **Step 1: Deploy Backend to Render (FREE)**

1. Go to https://render.com
2. Sign up with GitHub
3. Create new Web Service → Deploy from GitHub
4. Select your repo
5. Set root directory to `server`
6. **Choose FREE plan** (important!)
7. Add variables:
   ```
   PORT=3000
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```
8. Deploy
9. Copy your Render URL (e.g., `https://tradction-backend.onrender.com`)

### **Step 2: Deploy Frontend to Vercel**

1. Go to https://vercel.com
2. Import your GitHub repo (myc-frontend folder)
3. Add environment variable:
   ```
   VITE_API_URL=https://your-render-url.onrender.com
   ```
4. Click Deploy

### **Done! ✅**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-render-url.onrender.com`
- **Total Cost: $0/month** 🎉

---

## Quick Checklist

- [ ] Backend deployed (Render - FREE)
- [ ] Frontend VITE_API_URL set to Render URL
- [ ] CORS enabled (already configured ✅)
- [ ] Test upload/translation
- [ ] Celebrate! 🎉

---

## Notes

**Render Free Tier:**
- Service sleeps after 15 minutes inactivity
- Wakes up automatically (takes 30 seconds)
- Completely FREE, no credit card required

**Vercel Free Tier:**
- Always fast
- 100GB bandwidth/month
- Completely FREE

See **DEPLOYMENT-GUIDE.md** for detailed troubleshooting.

