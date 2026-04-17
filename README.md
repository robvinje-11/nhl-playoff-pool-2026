# 2026 NHL Playoff Pool — Bracket Challenge

Powered by **RTV Business Solutions Group Ltd.**

## Quick Deploy Guide

### Step 1: Create Firebase Project (2 min)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add Project** → name it `nhl-playoff-pool` → Continue
3. Disable Google Analytics (not needed) → **Create Project**
4. Once created, click the **Web** icon (`</>`) to add a web app
5. Name it `nhl-pool-web` → **Register App**
6. You'll see a config block — **copy these 6 values** (you'll need them in Step 4):
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`
7. Click **Continue to Console**

### Step 2: Enable Firestore Database (1 min)

1. In your Firebase project, click **Build** → **Firestore Database** in the left sidebar
2. Click **Create Database**
3. Select **Start in test mode** (open for 30 days — fine for a playoff pool)
4. Choose the closest region (us-central1 or northamerica-northeast1 for Calgary)
5. Click **Enable**

### Step 3: Push to GitHub (2 min)

1. Go to [github.com/new](https://github.com/new)
2. Name the repo `nhl-playoff-pool-2026` → **Create repository**
3. In your terminal, from the project folder:

```bash
git init
git add .
git commit -m "NHL Playoff Pool 2026"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nhl-playoff-pool-2026.git
git push -u origin main
```

### Step 4: Deploy on Vercel (3 min)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your `nhl-playoff-pool-2026` GitHub repo
4. Under **Environment Variables**, add these 6 vars with the values from Step 1:

| Variable | Value |
|----------|-------|
| `VITE_FIREBASE_API_KEY` | (your apiKey) |
| `VITE_FIREBASE_AUTH_DOMAIN` | (your authDomain) |
| `VITE_FIREBASE_PROJECT_ID` | (your projectId) |
| `VITE_FIREBASE_STORAGE_BUCKET` | (your storageBucket) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | (your messagingSenderId) |
| `VITE_FIREBASE_APP_ID` | (your appId) |

5. Click **Deploy**
6. Done! Your URL will be `nhl-playoff-pool-2026.vercel.app` (or similar)

### Optional: Custom Domain

In Vercel → Project Settings → Domains, add a custom domain if you want something like `pool.rtvbsg.com`.

## Viewing Entries

All entries are stored in Firebase Firestore under the `entries` collection. To view them:
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Select your project → **Firestore Database**
3. Click the `entries` collection to see all submitted brackets

## Scoring

| Round | Points |
|-------|--------|
| Round 1 | 1 pt per correct pick |
| Round 2 | 2 pts per correct pick |
| Conference Finals | 4 pts per correct pick |
| Stanley Cup Final | 8 pts for correct pick |
| **Tiebreaker** | Total goals in SCF series |
