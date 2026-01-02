# How to Deploy ZolviQ to `zolviq.darkvibelk.com`

Since you already own `darkvibelk.com`, you can easily host ZolviQ on a subdomain. The best way to host a Next.js app is **Vercel** (the creators of Next.js).

## Step 1: Push Code to GitHub
1.  Initialize Git (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit of ZolviQ"
    ```
2.  Create a new repository on GitHub called `zolviq`.
3.  Connect and push:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/zolviq.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy to Vercel
1.  Go to [Vercel.com](https://vercel.com) and Sign Up/Login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `zolviq` repository from GitHub.
4.  **Environment Variables**:
    *   Copy the values from your `.env.local` (or Supabase settings).
    *   Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
    *   Click **Deploy**.

## Step 3: Connect Domain (`zolviq.darkvibelk.com`)
1.  Once deployed, go to the **Settings** tab of your Vercel project.
2.  Click **Domains** on the left menu.
3.  Enter `zolviq.darkvibelk.com` in the input box and click **Add**.
4.  Vercel will give you a **CNAME** record value (usually configured automatically if you use Vercel DNS, but likely you need to specific it manually).
    *   **Type**: `CNAME`
    *   **Name**: `zolviq` (this is the subdomain part)
    *   **Value**: `cname.vercel-dns.com` (Vercel will confirm the exact value to use).

## Step 4: Configure DNS (Where you bought `darkvibelk.com`)
Go to your domain registrar (e.g., Godaddy, Namecheap, Cloudflare) where you manage `darkvibelk.com`.

1.  Find **DNS Management** or **DNS Settings**.
2.  Add a new record:
    *   **Type**: `CNAME`
    *   **Name / Host**: `zolviq`
    *   **Value / Target**: `cname.vercel-dns.com` (or whatever Vercel gave you).
    *   **TTL**: Automatic or 3600.
3.  Save the record.

## Step 5: Verification
Wait a few minutes (up to an hour). Vercel will automatically generate an SSL certificate (HTTPS) for you. 

Once the status in Vercel says "Valid", your app will be live at **https://zolviq.darkvibelk.com**!
