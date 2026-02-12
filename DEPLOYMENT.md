# Deployment Guide

## Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts and your site will be live!

## Deploy to Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

## Deploy to Your Own Server

1. Build the project:
```bash
npm run build
```

2. The output will be in `.next` folder

3. Copy everything to your server

4. Run:
```bash
npm start
```

## Environment Variables

No environment variables needed! Everything is in `siteConfig.ts`.

## Domain Setup

After deployment, point your custom domain:
- Vercel: Project Settings → Domains
- Netlify: Site Settings → Domain Management

## Performance Checklist

- ✅ Video compressed (4.4MB)
- ✅ Images optimized
- ✅ Lazy loading enabled
- ✅ Code splitting automatic with Next.js
- ✅ CSS purged with Tailwind
- ✅ Animations GPU-accelerated

## CDN Configuration

Both Vercel and Netlify provide automatic CDN. No extra config needed.

## SSL/HTTPS

Both platforms provide free SSL certificates automatically.
