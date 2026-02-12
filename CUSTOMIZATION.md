# Customization Guide

## Table of Contents
1. [Quick Edits (siteConfig.ts)](#quick-edits)
2. [Changing Metrics](#changing-metrics)
3. [Updating Colors](#updating-colors)
4. [Modifying Animations](#modifying-animations)
5. [Adding New Sections](#adding-new-sections)

---

## Quick Edits (siteConfig.ts)

**This is your control panel.** 95% of changes happen here.

### Change the Brand Name
```typescript
brand: {
  name: "YOUR BRAND",           // ← Edit this
  tagline: "YOUR TAGLINE",      // ← Edit this
  description: "Your description",
}
```

### Update Hero Button
```typescript
hero: {
  title: "STATE OF ASHES",
  subtitle: "INNOVATION FROM THE GROUND UP",
  ctaText: "Get Started",       // ← Change button text
  ctaLink: "/contact",           // ← Change destination
}
```

---

## Changing Metrics

### Update Numbers
```typescript
metrics: {
  systemsOnline: 100,      // Change from 99.9 to 100
  activeUsers: 10000,      // Change from 4500 to 10000
  dataProcessed: 5.7,      // Change from 1.2 to 5.7
  dataUnit: "TB",          // Change from "PB" to "TB"
  uptime: 99.99,
}
```

**Save the file.** The counters update automatically!

### Add a New Metric

**Step 1:** Add to config:
```typescript
metrics: {
  systemsOnline: 99.9,
  activeUsers: 4500,
  transactions: 50000,    // ← NEW
}
```

**Step 2:** Add card in `page.tsx`:
```typescript
<motion.div>
  <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0F0F0F] border-2 border-[#2C3E50] p-8">
    <div className="text-sm text-[#E67E22] mb-2">TRANSACTIONS</div>
    <div className="text-5xl font-black mb-2" style={{ color: "#FFA500" }}>
      <AnimatedCounter end={siteConfig.metrics.transactions} />
    </div>
    <div className="text-sm text-gray-400">Processed Today</div>
  </div>
</motion.div>
```

---

## Updating Colors

### Change Brand Colors
```typescript
colors: {
  infernoOrange: "#FF4500",   // Main accent
  moltenGold: "#FFA500",      // Secondary accent
  emberGlow: "#E67E22",       // Tertiary
  carbonBlack: "#0F0F0F",     // Background
  gunmetalGrey: "#2C3E50",    // Borders
}
```

### Apply Globally
After changing config, update Tailwind config:
```javascript
// tailwind.config.js
extend: {
  colors: {
    'inferno-orange': '#YOUR_COLOR',
    'molten-gold': '#YOUR_COLOR',
  },
}
```

---

## Modifying Animations

### Speed Up/Slow Down Counter
In `page.tsx`, find `<AnimatedCounter>`:
```typescript
<AnimatedCounter 
  end={4500} 
  duration={2}    // ← Change to 3 for slower, 1 for faster
  decimals={0} 
/>
```

### Change Logo Glow Speed
Find the logo animation:
```typescript
animate={{
  boxShadow: [
    "0 0 20px rgba(255, 69, 0, 0.3)",
    "0 0 60px rgba(255, 69, 0, 0.6)",
    "0 0 20px rgba(255, 69, 0, 0.3)",
  ],
}}
transition={{
  duration: 3,    // ← Change this (currently 3 seconds)
  repeat: Infinity,
}}
```

### Disable Scroll Animations
Remove `whileInView` props:
```typescript
// Before
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}  // ← Remove this
  viewport={{ once: true }}            // ← Remove this
>

// After
<motion.div
  initial={{ opacity: 1, y: 0 }}  // Start visible
>
```

---

## Adding New Sections

### Add a Team Section

**Step 1:** Add to `siteConfig.ts`:
```typescript
team: [
  {
    name: "John Doe",
    role: "CEO",
    image: "/team/john.jpg",
  },
  {
    name: "Jane Smith",
    role: "CTO",
    image: "/team/jane.jpg",
  },
]
```

**Step 2:** Add section in `page.tsx`:
```typescript
<section className="py-24 px-4 bg-[#0F0F0F]">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-black text-center mb-16" style={{ color: "#FFA500" }}>
      OUR TEAM
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {siteConfig.team.map((member) => (
        <div key={member.name} className="border-2 border-[#2C3E50] p-8">
          <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mb-4" />
          <h3 className="text-2xl font-bold">{member.name}</h3>
          <p className="text-gray-400">{member.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Advanced Customization

### Change Video Source
Replace `public/Bronze_Phoenix_Rises_From_Digital_Veins.mp4` with your video.

Or update the source in `page.tsx`:
```typescript
<video autoPlay loop muted playsInline>
  <source src="/your-video.mp4" type="video/mp4" />
</video>
```

### Modify Card Hover Effect
Find the card component:
```typescript
className="hover:border-[#FF4500]"  // ← Change color
```

### Add Background Pattern
```typescript
<div 
  className="absolute inset-0"
  style={{
    backgroundImage: "url('/pattern.svg')",
    opacity: 0.1,
  }}
/>
```

---

## Common Issues

### Video Not Playing
- Check file path is correct: `public/filename.mp4`
- Ensure video is compressed (< 10MB recommended)
- Add `playsInline` attribute for mobile

### Animations Not Triggering
- Clear browser cache
- Check `viewport={{ once: true }}` is set
- Verify Framer Motion is installed: `npm install framer-motion`

### Colors Not Updating
1. Change in `siteConfig.ts`
2. Update `tailwind.config.js`
3. Restart dev server: `npm run dev`

---

## Need Help?

1. Check the README.md
2. Review example code in page.tsx
3. Consult Framer Motion docs: https://www.framer.com/motion/
4. Tailwind CSS docs: https://tailwindcss.com/docs

---

**Remember:** Always edit `siteConfig.ts` first. It's designed to be your single source of truth.
