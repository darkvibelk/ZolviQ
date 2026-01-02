# How to Deploy ZolviQ to Cloudflare Pages
You have two main options with Cloudflare:
1.  **Hosting on Vercel + Cloudflare DNS** (Recommended for easiest Next.js compatibility).
2.  **Hosting on Cloudflare Pages** (Pure Cloudflare, extremely fast, requires slight setup).

---

## Option 1: Cloudflare DNS -> Vercel (Easiest)
Use Vercel for hosting (best for Next.js) but manage your domain in Cloudflare.

1.  **Deploy to Vercel** (as per previous guide).
2.  **In Cloudflare Dashboard**:
    *   Go to **DNS** -> **Records**.
    *   Add a Record:
        *   **Type**: `CNAME`
        *   **Name**: `zolviq`
        *   **Target**: `cname.vercel-dns.com`
        *   **Proxy Status**: **Proxied (Orange Cloud)** is usually fine, but if you have SSL issues, turn it to **DNS Only (Grey Cloud)** temporarily to verify.
3.  **In Vercel**:
    *   Add `zolviq.darkvibelk.com` as the domain.
    *   It will verify automatically.

---

## Option 2: Hosting on Cloudflare Pages (Pure Edge)
If you want to host the *entire app* on Cloudflare infrastructure.

### Prerequisites
You need to configure Next.js for Cloudflare.
1.  Install the Cloudflare adapter:
    ```bash
    npm install --save-dev @cloudflare/next-on-pages
    ```
2.  Update `package.json` scripts:
    ```json
    "pages:build": "npx @cloudflare/next-on-pages",
    "preview": "npm run pages:build && wrangler pages dev .vercel/output/static",
    "deploy": "npm run pages:build && wrangler pages deploy .vercel/output/static"
    ```

### Deploying
1.  Push code to GitHub.
2.  Log in to **Cloudflare Dashboard** -> **Workers & Pages** -> **Create Application**.
3.  Select **Pages** -> **Connect to Git**.
4.  Select your `zolviq` repository.
5.  **Build Settings**:
    *   **Framework Preset**: Next.js
    *   **Build Command**: `npx @cloudflare/next-on-pages` (IMPORTANT: Override the default)
    *   **Output Directory**: `.vercel/output/static`
6.  **Environment Variables**:
    *   Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
    *   **Compatibility Flags**: Add `nodejs_compat` if prompted or needed for Supabase.
7.  Click **Save and Deploy**.

### Connect Subdomain
1.  Once deployed, go to the project in Cloudflare Pages.
2.  Click **Custom Domains**.
3.  Click **Set up a Custom Domain**.
4.  Type `zolviq.darkvibelk.com`.
5.  Cloudflare will automatically add the DNS record for you.
