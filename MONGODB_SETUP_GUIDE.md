# MongoDB Setup Guide for E-Commerce Project

## Option A: MongoDB Atlas (Cloud) - RECOMMENDED FOR BEGINNERS ⭐

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email or Google account
3. Verify your email

### Step 2: Create a Cluster (Database)
1. After login, click **"Build a Database"**
2. Choose **"FREE"** tier (M0 Sandbox)
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Name your cluster (e.g., "EcommerceCluster")
6. Click **"Create"** (takes 3-5 minutes)

### Step 3: Create Database User
1. When prompted, create a database user:
   - Username: `ecommerce_user`
   - Password: `[Generate a secure password]` ⚠️ **SAVE THIS PASSWORD!**
2. Click **"Create User"**

### Step 4: Set Network Access
1. Click **"Add IP Address"**
2. Click **"Allow Access from Anywhere"** (for development)
   - IP: `0.0.0.0/0`
3. Click **"Confirm"**

### Step 5: Get Connection String
1. Click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Select **"Driver: Node.js"** and **"Version: 5.5 or later"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://ecommerce_user:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name before `?`:
   ```
   mongodb+srv://ecommerce_user:YOUR_PASSWORD@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

### Step 6: Update Your Project
1. Open: `server\.env`
2. Replace the `MONGODB_URI` line with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://ecommerce_user:YOUR_PASSWORD@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
3. Save the file

### Step 7: Test Connection
Run in terminal:
```bash
cd server
npm run dev
```

You should see: ✅ MongoDB Connected

---

## Option B: Local MongoDB Installation

### Step 1: Download MongoDB
1. Go to https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server for Windows
3. Current version: 7.0 or later

### Step 2: Install MongoDB
1. Run the installer (.msi file)
2. Choose **"Complete"** installation
3. ✅ Check **"Install MongoDB as a Service"**
4. ✅ Check **"Install MongoDB Compass"** (GUI tool)
5. Click **"Next"** and **"Install"**
6. Wait for installation to complete

### Step 3: Verify Installation
Open PowerShell and run:
```powershell
mongod --version
```

You should see MongoDB version information.

### Step 4: Start MongoDB Service
MongoDB should auto-start as a service. To check:
```powershell
Get-Service MongoDB
```

If not running:
```powershell
Start-Service MongoDB
```

### Step 5: Update Your Project
The default connection string is already set:
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

### Step 6: Test Connection
Run in terminal:
```bash
cd server
npm run dev
```

You should see: ✅ MongoDB Connected: localhost

---

## Troubleshooting

### MongoDB Atlas Issues:
- ❌ **Connection timeout**: Check network access settings (allow 0.0.0.0/0)
- ❌ **Authentication failed**: Verify username and password in connection string
- ❌ **DNS errors**: Make sure connection string includes `mongodb+srv://` not `mongodb://`

### Local MongoDB Issues:
- ❌ **Service not running**: Run `Start-Service MongoDB` in PowerShell as Administrator
- ❌ **Port 27017 in use**: Another MongoDB instance might be running
- ❌ **Access denied**: Run PowerShell as Administrator

### Backend Issues:
- ❌ **Module not found**: Run `npm install` in server directory
- ❌ **Port 5000 in use**: Stop other Node processes or change PORT in .env

---

## Next Steps After Connection

Once connected, the backend will automatically:
1. ✅ Create the `ecommerce` database
2. ✅ Create collections (users, products, orders, carts) when you add data
3. ✅ Handle all CRUD operations

---

## MongoDB Compass (GUI Tool)

### Connect to MongoDB:
1. Open MongoDB Compass
2. Enter connection string:
   - **Atlas**: `mongodb+srv://...` (your full connection string)
   - **Local**: `mongodb://localhost:27017`
3. Click **"Connect"**
4. You can now browse your database visually!

---

## Useful MongoDB Commands

### Check if MongoDB is Running (Local):
```powershell
Get-Service MongoDB
```

### Start MongoDB Service (Local):
```powershell
Start-Service MongoDB
```

### Stop MongoDB Service (Local):
```powershell
Stop-Service MongoDB
```

### View Database in Compass:
1. Open MongoDB Compass
2. Connect using your connection string
3. Browse collections: users, products, orders, carts

---

## Need Help?

1. Check the error messages in terminal
2. Verify .env file has correct connection string
3. Make sure MongoDB service is running (local) or network access is set (Atlas)
4. Try restarting the backend server

---

✅ **Once connected, proceed to test the backend APIs!**
