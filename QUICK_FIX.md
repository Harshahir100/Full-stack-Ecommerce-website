# 🚨 Quick Fix for Products Not Showing

## The Problem
Your frontend is trying to connect to `http://localhost:4000` instead of `https://backend-r6kj.onrender.com` when deployed.

## ✅ Solution 1: Set Environment Variable in Render (RECOMMENDED)

1. Go to **Render Dashboard** → Your **Frontend Service**
2. Click on **Environment** tab
3. Click **Add Environment Variable**
4. Add:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://backend-r6kj.onrender.com`
5. Click **Save Changes**
6. **Redeploy** your frontend service

## ✅ Solution 2: Code Already Fixed (Auto-Detection)

The code has been updated to automatically detect if you're on a production domain and use the production backend URL. 

**After deploying the latest code:**
- The app will automatically use `https://backend-r6kj.onrender.com` when running on Render
- It will only use `localhost:4000` when running locally

## 🔍 How to Verify

1. **Deploy the updated code:**
   ```bash
   git add .
   git commit -m "Fix backend URL detection for production"
   git push
   ```

2. **Wait for Render to redeploy**

3. **Open your frontend:** https://ecommerce-frontend-jwg6.onrender.com

4. **Open Browser DevTools (F12)** → **Console tab**

5. **Look for these logs:**
   - `🔍 Detecting environment - hostname: ecommerce-frontend-jwg6.onrender.com`
   - `🌐 Detected production environment, using: https://backend-r6kj.onrender.com`
   - `🎯 Final backend URL: https://backend-r6kj.onrender.com`
   - `Fetching products from: https://backend-r6kj.onrender.com/api/product/list`

6. **If you still see `localhost:4000`:**
   - Clear browser cache (Ctrl+Shift+Delete)
   - Hard refresh (Ctrl+Shift+R)
   - Check if the new code was deployed

## 🧪 Test Backend Directly

Visit this URL in your browser:
```
https://backend-r6kj.onrender.com/api/product/list
```

You should see JSON data with products. If you see an error, the backend might not be running or there might be no products in the database.

## 📝 Next Steps

1. **Set the environment variable in Render** (most reliable)
2. **OR** deploy the updated code with auto-detection
3. **Verify** the console logs show the correct backend URL
4. **Check** that products load successfully

