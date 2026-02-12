# State of Ashes - Project Structure

## 📂 File Tree

```
state-of-ashes/
│
├── 📄 siteConfig.ts          ★ MAIN CONFIG - Edit this to update content
├── 📄 page.tsx               Main landing page component
├── 📄 layout.tsx             Root layout wrapper
├── 📄 globals.css            Global styles + Tailwind imports
│
├── 📦 package.json           Dependencies & scripts
├── ⚙️ next.config.js         Next.js configuration
├── ⚙️ tailwind.config.js    Tailwind CSS configuration
├── ⚙️ postcss.config.js     PostCSS configuration
├── ⚙️ tsconfig.json         TypeScript configuration
│
├── 🚀 setup.sh              Quick setup script
│
├── 📖 README.md             Quick start guide
├── 📖 DEPLOYMENT.md         Deployment instructions
├── 📖 CUSTOMIZATION.md      Detailed customization guide
│
└── 📁 public/               Static assets
    ├── logo.png                      Phoenix logo
    └── Bronze_Phoenix_Rises_From_Digital_Veins.mp4
```

## 🎯 Key Files Explained

### siteConfig.ts ★ MOST IMPORTANT
**Purpose:** Single source of truth for all content  
**Edit When:** You want to change any text, numbers, or metrics  
**Example:**
```typescript
metrics: {
  systemsOnline: 99.9,   // Change this to update the counter
  activeUsers: 4500,     // Change this to update the counter
}
```

### page.tsx
**Purpose:** Main React component with all sections  
**Edit When:** You want to add new sections or change layout  
**Contains:**
- Hero section with video background
- Living metrics dashboard
- Core values cards
- About section
- Footer

### layout.tsx
**Purpose:** Root layout wrapper for Next.js App Router  
**Edit When:** Changing metadata (title, description)

### globals.css
**Purpose:** Global styles and Tailwind imports  
**Edit When:** Adding custom CSS or fonts

## 🔧 Configuration Files

### package.json
Dependencies and npm scripts:
- `npm run dev` - Start development
- `npm run build` - Build for production
- `npm start` - Run production build

### tailwind.config.js
Tailwind CSS customization:
- Custom colors
- Font families
- Breakpoints

### next.config.js
Next.js configuration:
- Video file handling
- Optimization settings

### tsconfig.json
TypeScript compiler settings (no need to edit)

## 📁 Public Folder

Store all static assets here:
- Images (logo.png)
- Videos (background.mp4)
- Fonts (if using custom fonts)
- Icons (favicon.ico)

Files in `public/` are accessible at `/filename.ext`

## 🎨 Component Breakdown (page.tsx)

### 1. AnimatedCounter
Scroll-triggered number counter with easing
- Props: `end`, `duration`, `decimals`, `suffix`
- Used in: Metrics section

### 2. ScanlineOverlay
Retro CRT scanline effect
- Used in: Hero section

### 3. CircuitPattern
SVG background pattern
- Used in: Metrics & About sections

### 4. Main Sections
- **Hero** - Video background + logo + CTA
- **Metrics** - 4 animated stat cards
- **Core Values** - 3 feature cards with hover glow
- **About** - Text content section
- **Footer** - Links and copyright

## 🚀 Getting Started

1. **Install**: Run `npm install`
2. **Edit**: Open `siteConfig.ts`
3. **Run**: Execute `npm run dev`
4. **View**: Open http://localhost:3000

## 📝 Quick Edit Checklist

To update metrics:
- [ ] Open `siteConfig.ts`
- [ ] Change numbers in `metrics` object
- [ ] Save file
- [ ] View changes in browser (auto-reloads)

To change brand name:
- [ ] Open `siteConfig.ts`
- [ ] Update `brand.name`
- [ ] Save file

To add new section:
- [ ] Add content to `siteConfig.ts`
- [ ] Add section JSX in `page.tsx`
- [ ] Follow existing patterns

## 🎯 Design System Reference

**Colors:**
```
Inferno Orange: #FF4500 (main accent)
Molten Gold:    #FFA500 (headings)
Ember Glow:     #E67E22 (labels)
Carbon Black:   #0F0F0F (background)
Gunmetal Grey:  #2C3E50 (borders)
```

**Typography:**
```
Headings: Microgramma Bold
Body:     Roboto
```

**Spacing:**
```
Sections: py-24 (96px top/bottom)
Cards:    p-8 (32px all sides)
Gaps:     gap-8 (32px between items)
```

## 🔍 Finding What to Edit

| Want to change... | Edit this file... | Look for... |
|------------------|------------------|-------------|
| Metrics numbers | siteConfig.ts | `metrics:` |
| Hero title | siteConfig.ts | `hero:` |
| Card content | siteConfig.ts | `coreValues:` |
| Brand colors | tailwind.config.js | `colors:` |
| Animation speed | page.tsx | `duration:` |
| Section order | page.tsx | `<section>` tags |

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

**Pro Tip:** 90% of your edits will be in `siteConfig.ts`. Keep it open!
