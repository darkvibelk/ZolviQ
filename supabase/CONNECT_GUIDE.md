# How to Connect ZolviQ to Supabase SQL

Follow these steps to finish the database setup.

## 1. Create a Supabase Project
1.  Go to [supabase.com](https://supabase.com) and sign in.
2.  Click **"New Project"**.
3.  Name it `ZolviQ` and choose a secure password.
4.  Select a region close to you (e.g., Singapore/Mumbai).
5.  Click **"Create new project"** and wait for it to provision.

## 2. Apply the Database Schema
1.  In your Supabase Dashboard, go to the **SQL Editor** (icon on the left sidebar).
2.  Open the file inside this project: `supabase/schema.sql`.
3.  Copy the **entire content** of `schema.sql`.
4.  Paste it into the Supabase SQL Editor.
5.  Click **"Run"** in the bottom right corner.
    *   *Success:* You should see "Success, no rows returned".

## 3. Connect the App
1.  In Supabase, go to **Project Settings** (gear icon) -> **API**.
2.  Find the `Project URL` and `anon` / `public` Key.
3.  Create a file in the root of your project called `.env.local`.
4.  Paste the following (fill in your real values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 4. Verify Connection
Restart your development server:
```bash
npm run dev
```
The app is now connected! You can start building real features.
