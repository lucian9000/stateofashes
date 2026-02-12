# State of Ashes - Landing Page

A high-impact, Awwwards-worthy single-page landing page with Cyber-Industrial Resurrection aesthetic.

## 🔥 Features

- **Config-Driven Architecture**: All content editable from a single `siteConfig.ts` file
- **Living Metrics**: Animated count-up statistics that trigger on scroll
- **Video Background**: Muted, autoplay background with scanline overlay
- **Breathing Logo Glow**: Pulsing animation effect
- **Brushed Metal Cards**: Hover effects with orange glow borders
- **Smooth Animations**: Framer Motion for all scroll-triggered reveals
- **Fully Responsive**: Mobile-first design

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Assets

Place these files in the `public` folder:

- `Bronze_Phoenix_Rises_From_Digital_Veins.mp4` (background video)
- `logo.png` (your phoenix logo - extract from the uploaded PNG)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✏️ Editing Content

**THIS IS THE KEY FEATURE**: All content lives in `siteConfig.ts`. 

### To Change Metrics:

```typescript
// Open siteConfig.ts and modify:
metrics: {
  systemsOnline: 99.9,    // Change to 100
  activeUsers: 4500,       // Change to 5000
  dataProcessed: 1.2,      // Change to 2.5
  dataUnit: "PB",
  uptime: 99.98,
}
```

Save the file. The site updates automatically.

### To Change Core Values:

```typescript
coreValues: [
  {
    id: 1,
    title: "Your New Title",           // Edit here
    description: "Your new description", // Edit here
    icon: "🔥",
  },
  // Add more values...
]
```

## 📁 Project Structure

```
state-of-ashes/
├── siteConfig.ts          ← EDIT THIS to change content
├── page.tsx               ← Main landing page component
├── layout.tsx             ← Root layout
├── globals.css            ← Global styles
├── public/
│   ├── logo.png          ← Your logo
│   └── Bronze_Phoenix_Rises_From_Digital_Veins.mp4
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Design System

**Colors:**
- Inferno Orange: `#FF4500`
- Molten Gold: `#FFA500`
- Ember Glow: `#E67E22`
- Carbon Black: `#0F0F0F`
- Gunmetal Grey: `#2C3E50`

**Typography:**
- Headings: Microgramma Bold (fallback: Impact)
- Body: Roboto

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Language**: TypeScript

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Animations

1. **Hero Logo**: Breathing glow effect (3s loop)
2. **Metrics Counters**: Scroll-triggered count-up with easing
3. **Cards**: Hover glow on borders + background shift
4. **Scroll Reveal**: Fade-in + slide-up on all sections

## 🔧 Customization Guide

### Change Video Background
Replace `public/Bronze_Phoenix_Rises_From_Digital_Veins.mp4` with your video.

### Adjust Animation Speed
In `page.tsx`, modify the `duration` prop:
```typescript
<AnimatedCounter end={99.9} duration={3} /> // 3 seconds instead of 2
```

### Add New Metric Cards
Edit `siteConfig.ts`:
```typescript
metrics: {
  systemsOnline: 99.9,
  activeUsers: 4500,
  yourNewMetric: 1234,  // Add here
}
```

Then add the card in `page.tsx` metrics section.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance Notes

- Video is compressed to 4.4MB
- All animations use GPU-accelerated transforms
- Images use Next.js Image optimization
- Lazy loading enabled for below-fold content

## 📄 License

Proprietary - State of Ashes 2026

---

Built with 🔥 by a Senior Creative Technologist
