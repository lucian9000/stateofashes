# 🔥 State of Ashes Landing Page - Complete Package

## ✅ Project Status: READY TO DEPLOY

This is a production-ready, Awwwards-worthy Next.js landing page with a config-driven architecture.

---

## 🎯 What You Got

✅ **Fully functional Next.js 14 site**  
✅ **Config-driven content** (edit one file to update everything)  
✅ **Framer Motion animations** (scroll-triggered reveals)  
✅ **Video background** with scanline overlay  
✅ **Living metrics** with animated counters  
✅ **Responsive design** (mobile-first)  
✅ **Production-ready** (optimized & compressed)

---

## 🚀 Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: **http://localhost:3000**

---

## 📝 MOST IMPORTANT FILE

### `siteConfig.ts` ← EDIT THIS TO UPDATE CONTENT

This is your **control panel**. Want to change the metrics from 4500 to 10000? Edit this file:

```typescript
metrics: {
  activeUsers: 10000,  // Change from 4500 to 10000
}
```

Save. The site updates automatically. **That's it.**

---

## 📚 Documentation Index

| Document | Purpose |
|----------|---------|
| **README.md** | Quick start guide & overview |
| **CUSTOMIZATION.md** | Detailed editing instructions |
| **DEPLOYMENT.md** | How to deploy to production |
| **PROJECT_STRUCTURE.md** | File organization & architecture |

---

## 🎨 Key Features

### 1. Hero Section
- Full-screen video background (muted autoplay)
- Animated logo with breathing glow effect
- CTA button with hover animation
- Smooth scroll indicator

### 2. Living Metrics Dashboard
- 4 animated stat cards
- Scroll-triggered count-up animations
- Hover effects with orange glow
- Fully editable from config file

### 3. Core Values Section
- 3 brushed metal cards
- Hover glow on borders
- Icon + title + description format
- Mobile responsive grid

### 4. About Section
- Circuit pattern background
- Centered text layout
- Fade-in animation

---

## 🔧 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Language:** TypeScript
- **Deployment:** Vercel-ready (also Netlify compatible)

---

## 📁 File Structure

```
state-of-ashes/
├── ★ siteConfig.ts          ← EDIT THIS (your control panel)
├── page.tsx                 Main component
├── layout.tsx               Root layout
├── globals.css              Global styles
├── package.json             Dependencies
├── tailwind.config.js       Styling config
├── setup.sh                 Quick setup script
├── public/
│   ├── logo.png
│   └── Bronze_Phoenix_Rises_From_Digital_Veins.mp4
└── [config files...]
```

---

## 🎯 How to Edit Content (Example)

### Change Active Users from 4500 to 8000:

**Step 1:** Open `siteConfig.ts`

**Step 2:** Find this line:
```typescript
activeUsers: 4500,
```

**Step 3:** Change to:
```typescript
activeUsers: 8000,
```

**Step 4:** Save file. Done! 🎉

The counter will automatically animate from 0 to 8000 when users scroll to it.

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Option 2: Netlify
```bash
npm run build
netlify deploy --prod
```

### Option 3: Your Server
```bash
npm run build
npm start
```

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Inferno Orange | `#FF4500` | Accents, borders |
| Molten Gold | `#FFA500` | Headings, glow |
| Ember Glow | `#E67E22` | Labels, subtle accents |
| Carbon Black | `#0F0F0F` | Background |
| Gunmetal Grey | `#2C3E50` | Card borders |

---

## ✏️ Common Customizations

### Add New Metric Card
1. Add to `siteConfig.ts`: `transactions: 50000,`
2. Copy existing card in `page.tsx`
3. Update labels and counter

### Change Video
Replace `public/Bronze_Phoenix_Rises_From_Digital_Veins.mp4`

### Modify Animations
Find `duration: 2` in `page.tsx` and change number

### Add New Section
1. Add content to `siteConfig.ts`
2. Create section in `page.tsx`
3. Follow existing patterns

---

## 📦 What's Included

✅ Next.js 14 project (fully configured)  
✅ All source files (TypeScript + React)  
✅ Config files (Tailwind, PostCSS, TypeScript)  
✅ Assets (logo + video in public folder)  
✅ Documentation (4 comprehensive guides)  
✅ Setup script (one-click install)  
✅ Deployment guides (Vercel, Netlify, custom server)

---

## 🎯 Performance Specs

- Video: 4.4MB (compressed)
- Images: Optimized with Next.js Image
- Animations: GPU-accelerated
- Code splitting: Automatic
- Lazy loading: Enabled
- Lighthouse score: 90+ (expected)

---

## 🆘 Need Help?

1. **Read README.md** for quick start
2. **Check CUSTOMIZATION.md** for detailed edits
3. **Review page.tsx** for code examples
4. **Consult PROJECT_STRUCTURE.md** for file organization

---

## 📝 Notes

- All content is editable via `siteConfig.ts`
- Video autoplays muted (mobile-friendly)
- Animations trigger on scroll
- Fully responsive (mobile, tablet, desktop)
- TypeScript for type safety
- Production optimized

---

## 🎉 You're Ready!

Your Awwwards-worthy landing page is complete. Just run:

```bash
npm install && npm run dev
```

Then edit `siteConfig.ts` to make it yours.

---

**Built with 🔥 for State of Ashes**  
*Cyber-Industrial Resurrection*
