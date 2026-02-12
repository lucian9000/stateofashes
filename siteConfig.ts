// siteConfig.ts
// SINGLE SOURCE OF TRUTH - Edit this file to update all site content

export const siteConfig = {
  // Brand Identity
  brand: {
    name: "STATE OF ASHES",
    tagline: "INNOVATION FROM THE GROUND UP",
    description: "Cyber-Industrial Resurrection",
  },

  // Living Metrics - Change these numbers to update the dashboard
  metrics: {
    systemsOnline: 99.9,
    activeUsers: 4500,
    dataProcessed: 1.2,
    dataUnit: "PB",
    uptime: 99.98,
  },

  // Hero Section
  hero: {
    title: "STATE OF ASHES",
    subtitle: "INNOVATION FROM THE GROUND UP",
    ctaText: "Enter the System",
    ctaLink: "#metrics",
  },

  // Core Values / Features
  coreValues: [
    {
      id: 1,
      title: "Resilient Architecture",
      description: "Built from the ground up to withstand chaos. Our systems rise stronger from every challenge.",
      icon: "🔥",
    },
    {
      id: 2,
      title: "Digital Transformation",
      description: "Merging raw industrial power with cutting-edge technology. Innovation forged in fire.",
      icon: "⚡",
    },
    {
      id: 3,
      title: "Autonomous Systems",
      description: "Self-healing infrastructure that adapts and evolves. The future runs on autopilot.",
      icon: "🤖",
    },
  ],

  // About Section
  about: {
    heading: "FORGED IN FIRE, BUILT FOR TOMORROW",
    body: "State of Ashes represents the intersection of destruction and creation. We harness the chaotic energy of transformation and channel it into precise, powerful technological solutions. From the ashes of outdated systems, we build the architecture of tomorrow.",
  },

  // Social Links
  social: {
    github: "#",
    twitter: "#",
    linkedin: "#",
  },

  // Colors (from design system)
  colors: {
    infernoOrange: "#FF4500",
    moltenGold: "#FFA500",
    emberGlow: "#E67E22",
    carbonBlack: "#0F0F0F",
    gunmetalGrey: "#2C3E50",
  },
};

export type SiteConfig = typeof siteConfig;
