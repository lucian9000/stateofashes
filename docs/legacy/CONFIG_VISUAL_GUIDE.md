# Config-to-UI Visual Guide

## How siteConfig.ts Controls The Website

This document shows you **exactly** which config values control which parts of the UI.

---

## 🎯 Hero Section

### siteConfig.ts
```typescript
hero: {
  title: "STATE OF ASHES",           // ← Controls this ↓
  subtitle: "INNOVATION FROM...",    // ← Controls this ↓
  ctaText: "Enter the System",       // ← Controls this ↓
  ctaLink: "#metrics",               // ← Controls this ↓
}
```

### What You See on Page
```
┌─────────────────────────────────────────┐
│                                         │
│         [ANIMATED PHOENIX LOGO]         │
│                                         │
│        STATE OF ASHES ← title           │
│   INNOVATION FROM... ← subtitle         │
│                                         │
│    [Enter the System] ← ctaText         │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📊 Metrics Section

### siteConfig.ts
```typescript
metrics: {
  systemsOnline: 99.9,    // Card 1
  activeUsers: 4500,      // Card 2
  dataProcessed: 1.2,     // Card 3
  dataUnit: "PB",         // Card 3 suffix
  uptime: 99.98,          // Card 4
}
```

### What You See on Page
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   UPTIME     │ │ AUTHENTICATED│ │  THROUGHPUT  │ │ RELIABILITY  │
│              │ │              │ │              │ │              │
│    99.9%  ←──┼─┤   4500    ←──┼─┤  1.2 PB   ←──┼─┤   99.98%  ←──┤
│              │ │              │ │              │ │              │
│Systems Online│ │Active Users  │ │Data Processed│ │ Uptime SLA   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
     ↑ systemsOnline    ↑ activeUsers   ↑ dataProcessed    ↑ uptime
                                         + dataUnit
```

**KEY INSIGHT:** Change `activeUsers: 4500` to `activeUsers: 10000` and the second card automatically updates to show "10000" with the animated counter!

---

## 🛡️ Core Values Section

### siteConfig.ts
```typescript
coreValues: [
  {
    id: 1,
    title: "Resilient Architecture",     // ← Card 1 title
    description: "Built from the ground...", // ← Card 1 text
    icon: "🔥",                          // ← Card 1 icon
  },
  {
    id: 2,
    title: "Digital Transformation",     // ← Card 2 title
    description: "Merging raw industrial...", // ← Card 2 text
    icon: "⚡",                          // ← Card 2 icon
  },
  // ... card 3
]
```

### What You See on Page
```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│       🔥        │  │       ⚡        │  │       🤖        │
│                 │  │                 │  │                 │
│   Resilient     │  │    Digital      │  │   Autonomous    │
│  Architecture   │  │ Transformation  │  │    Systems      │
│                 │  │                 │  │                 │
│ Built from the  │  │ Merging raw     │  │  Self-healing   │
│ ground up to... │  │ industrial...   │  │  infrastructure │
└─────────────────┘  └─────────────────┘  └─────────────────┘
        ↑                    ↑                    ↑
    coreValues[0]       coreValues[1]       coreValues[2]
```

---

## 📝 About Section

### siteConfig.ts
```typescript
about: {
  heading: "FORGED IN FIRE, BUILT FOR TOMORROW",
  body: "State of Ashes represents the intersection...",
}
```

### What You See on Page
```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│       FORGED IN FIRE, BUILT FOR TOMORROW ← heading        │
│                                                           │
│    State of Ashes represents the intersection of          │
│    destruction and creation. We harness the chaotic       │
│    energy of transformation and channel it into...        │
│    ↑ body                                                 │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

---

## 🎨 Brand Identity

### siteConfig.ts
```typescript
brand: {
  name: "STATE OF ASHES",
  tagline: "INNOVATION FROM THE GROUND UP",
  description: "Cyber-Industrial Resurrection",
}
```

### Where It Appears
- **name**: Footer copyright, page title
- **tagline**: Hero subtitle, meta description
- **description**: SEO meta tags

---

## 🔗 Social Links

### siteConfig.ts
```typescript
social: {
  github: "#",
  twitter: "#",
  linkedin: "#",
}
```

### What You See (Footer)
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  © 2026 STATE OF ASHES         GitHub | Twitter | LinkedIn
│                                  ↑       ↑        ↑    │
│                                social.github  twitter   │
│                                           linkedin      │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Example: Changing Active Users

### BEFORE (siteConfig.ts)
```typescript
metrics: {
  activeUsers: 4500,
}
```
**Page shows:** `4500` (animated counter)

### AFTER (siteConfig.ts)
```typescript
metrics: {
  activeUsers: 10000,
}
```
**Page shows:** `10000` (animated counter)

**You changed ONE number. The entire UI updates automatically.**

---

## 🎯 Example: Adding a New Value Card

### Step 1: Add to Config
```typescript
coreValues: [
  // ... existing cards
  {
    id: 4,
    title: "Cloud Native",
    description: "Built for the cloud, optimized for scale.",
    icon: "☁️",
  },
]
```

### Step 2: It Automatically Appears!
The code in `page.tsx` uses `.map()` to loop through all values:
```typescript
{siteConfig.coreValues.map((value) => (
  // Card JSX here
))}
```

So adding to the array = adding a new card. **No manual HTML required.**

---

## 💡 Key Takeaways

1. **ONE file controls everything**: `siteConfig.ts`
2. **No HTML editing needed**: Just change values
3. **Arrays = automatic repetition**: Add item = add card
4. **Type safety**: TypeScript catches errors
5. **Hot reload**: Save file = see changes instantly

---

## 🔍 Finding What to Change

| Want to update... | Edit this in siteConfig.ts |
|-------------------|---------------------------|
| Big hero title | `hero.title` |
| Button text | `hero.ctaText` |
| Button destination | `hero.ctaLink` |
| Active users count | `metrics.activeUsers` |
| Any metric number | `metrics.*` |
| Feature card title | `coreValues[n].title` |
| Feature card text | `coreValues[n].description` |
| About section heading | `about.heading` |
| About section body | `about.body` |
| Social links | `social.*` |

---

## 🚀 Pro Tips

### Want to add a 5th metric card?
1. Add to `metrics` object in config
2. Copy any existing metric card in `page.tsx`
3. Change the variable name

### Want to change all orange colors to blue?
1. Change `infernoOrange: "#FF4500"` to `"#0066FF"`
2. Update `tailwind.config.js` to match
3. Restart dev server

### Want to disable a section?
Comment it out in `page.tsx`:
```typescript
{/* <section>...</section> */}
```

---

**Remember:** The config file is your **control panel**. Master it, and you control the entire site.
