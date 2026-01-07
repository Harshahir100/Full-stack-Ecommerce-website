# 🚀 Render Deployment Guide - Fix Products Not Showing

## Problem
Products are not showing on the deployed frontend and admin because environment variables are not configured in Render.

## ✅ Solution Steps

### 1. Set Environment Variables in Render Dashboard

#### For Frontend Service (https://ecommerce-frontend-jwg6.onrender.com)

1. Go to your Render dashboard
2. Click on your **Frontend** service
3. Go to **Environment** tab
4. Add the following environment variable:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://backend-r6kj.onrender.com`
5. Click **Save Changes**
6. **Redeploy** the service (or it will auto-redeploy)

#### For Admin Service (https://ecommerce-admin-5uep.onrender.com)

1. Go to your Render dashboard
2. Click on your **Admin** service
3. Go to **Environment** tab
4. Add the following environment variable:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://backend-r6kj.onrender.com`
5. Click **Save Changes**
6. **Redeploy** the service (or it will auto-redeploy)

### 2. Verify Backend is Working

Test your backend API:
- Visit: https://backend-r6kj.onrender.com/api/product/list
- You should see JSON data with products

### 3. Check Browser Console

After redeploying:
1. Open your frontend: https://ecommerce-frontend-jwg6.onrender.com
2. Open browser DevTools (F12)
3. Go to **Console** tab
4. Look for:
   - `Fetching products from: https://backend-r6kj.onrender.com/api/product/list`
   - `Products fetched: {...}`
5. If you see errors, check the Network tab for failed requests

### 4. Common Issues

#### Issue: "Failed to load products"
- **Solution**: Check if backend URL is correct in Render environment variables
- **Solution**: Verify backend is running and accessible

#### Issue: CORS errors
- **Solution**: Already fixed in backend/server.js - CORS now allows your frontend/admin URLs

#### Issue: Products array is empty
- **Solution**: Add products through admin panel or check database connection

## 📝 Environment Variables Summary

### Frontend Service
```
VITE_BACKEND_URL=https://backend-r6kj.onrender.com
```

### Admin Service
```
VITE_BACKEND_URL=https://backend-r6kj.onrender.com
```

### Backend Service (if needed)
```
MONGODB_URI=your_mongodb_uri
CLOUDINARY_API_KEY=your_key
CLOUDINARY_SECRET_KEY=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@trendify.com
ADMIN_PASSWORD=admin@123
```

## 🔄 After Making Changes

1. **Commit and push** the code changes to your repository
2. **Set environment variables** in Render dashboard (if not done)
3. **Redeploy** services (or wait for auto-deploy)
4. **Clear browser cache** and test again

## ✅ Verification Checklist

- [ ] Environment variable `VITE_BACKEND_URL` set in Frontend service
- [ ] Environment variable `VITE_BACKEND_URL` set in Admin service
- [ ] Backend API accessible at https://backend-r6kj.onrender.com/api/product/list
- [ ] Frontend shows products after redeploy
- [ ] Admin can login and see products
- [ ] No CORS errors in browser console
- [ ] No network errors in browser DevTools

