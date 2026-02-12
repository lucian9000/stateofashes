"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { siteConfig } from "./siteConfig";

// Animated Counter Component
function AnimatedCounter({ 
  end, 
  duration = 2, 
  decimals = 0,
  suffix = "" 
}: { 
  end: number; 
  duration?: number; 
  decimals?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = startValue + (end - startValue) * easeOut;
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}

// Scanline Overlay Component
function ScanlineOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div 
        className="h-full w-full opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255, 69, 0, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(255, 69, 0, 0.03) 3px
          )`,
        }}
      />
    </div>
  );
}

// Circuit Pattern Background
function CircuitPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-5">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10 10h20v20h-20z M40 40h20v20h-20z M70 10h20v20h-20z" 
                  fill="none" stroke="#FF4500" strokeWidth="0.5"/>
            <circle cx="20" cy="20" r="2" fill="#FF4500"/>
            <circle cx="50" cy="50" r="2" fill="#FF4500"/>
            <circle cx="80" cy="20" r="2" fill="#FF4500"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)"/>
      </svg>
    </div>
  );
}

export default function StateOfAshesLanding() {
  const controls = useAnimation();

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/Bronze_Phoenix_Rises_From_Digital_Veins.mp4" type="video/mp4" />
        </video>

        {/* Scanline Overlay */}
        <ScanlineOverlay />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F0F]/50 to-[#0F0F0F] z-[5]" />

        {/* Content */}
        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4">
          {/* Logo with Breathing Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative">
              {/* Animated Glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 69, 0, 0.3)",
                    "0 0 60px rgba(255, 69, 0, 0.6)",
                    "0 0 20px rgba(255, 69, 0, 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full blur-2xl"
              />
              <img 
                src="/logo.png" 
                alt={siteConfig.brand.name}
                className="relative z-10 h-48 w-48 md:h-64 md:w-64 object-contain"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-4 tracking-wider"
            style={{
              fontFamily: "'Microgramma', sans-serif",
              background: "linear-gradient(135deg, #FF4500 0%, #FFA500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 40px rgba(255, 69, 0, 0.3)",
            }}
          >
            {siteConfig.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-[#E5E5E5] tracking-widest mb-12 font-light"
          >
            {siteConfig.hero.subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href={siteConfig.hero.ctaLink}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="group relative px-8 py-4 overflow-hidden rounded-none border-2 border-[#FF4500] bg-transparent hover:bg-[#FF4500] transition-all duration-300"
          >
            <span className="relative z-10 text-lg font-bold tracking-wider text-[#FF4500] group-hover:text-[#0F0F0F] transition-colors">
              {siteConfig.hero.ctaText}
            </span>
            <div className="absolute inset-0 bg-[#FF4500] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </motion.a>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-[#FF4500] rounded-full flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-[#FF4500] rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* LIVING METRICS SECTION */}
      <section id="metrics" className="relative py-24 px-4 bg-[#0F0F0F]">
        <CircuitPattern />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 tracking-wider"
            style={{
              fontFamily: "'Microgramma', sans-serif",
              color: "#FFA500",
            }}
          >
            SYSTEM STATUS
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Systems Online */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0F0F0F] border-2 border-[#2C3E50] p-8 hover:border-[#FF4500] transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4500] to-[#FFA500] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <div className="text-sm text-[#E67E22] mb-2 tracking-wider font-mono">UPTIME</div>
                <div className="text-5xl font-black mb-2" style={{ color: "#FFA500" }}>
                  <AnimatedCounter end={siteConfig.metrics.systemsOnline} decimals={1} suffix="%" />
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Systems Online</div>
              </div>
            </motion.div>

            {/* Active Users */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0F0F0F] border-2 border-[#2C3E50] p-8 hover:border-[#FF4500] transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4500] to-[#FFA500] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <div className="text-sm text-[#E67E22] mb-2 tracking-wider font-mono">AUTHENTICATED</div>
                <div className="text-5xl font-black mb-2" style={{ color: "#FFA500" }}>
                  <AnimatedCounter end={siteConfig.metrics.activeUsers} decimals={0} />
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Active Users</div>
              </div>
            </motion.div>

            {/* Data Processed */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0F0F0F] border-2 border-[#2C3E50] p-8 hover:border-[#FF4500] transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4500] to-[#FFA500] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <div className="text-sm text-[#E67E22] mb-2 tracking-wider font-mono">THROUGHPUT</div>
                <div className="text-5xl font-black mb-2" style={{ color: "#FFA500" }}>
                  <AnimatedCounter end={siteConfig.metrics.dataProcessed} decimals={1} suffix={` ${siteConfig.metrics.dataUnit}`} />
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Data Processed</div>
              </div>
            </motion.div>

            {/* Reliability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0F0F0F] border-2 border-[#2C3E50] p-8 hover:border-[#FF4500] transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4500] to-[#FFA500] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                
                <div className="text-sm text-[#E67E22] mb-2 tracking-wider font-mono">RELIABILITY</div>
                <div className="text-5xl font-black mb-2" style={{ color: "#FFA500" }}>
                  <AnimatedCounter end={siteConfig.metrics.uptime} decimals={2} suffix="%" />
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Uptime SLA</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-[#0F0F0F] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black text-center mb-16 tracking-wider"
            style={{
              fontFamily: "'Microgramma', sans-serif",
              color: "#FFA500",
            }}
          >
            CORE PRINCIPLES
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.coreValues.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative"
              >
                {/* Brushed Metal Card */}
                <div 
                  className="relative overflow-hidden p-8 h-full border-2 border-[#2C3E50] hover:border-[#FF4500] transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%)",
                  }}
                >
                  {/* Orange Glow on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/10 via-transparent to-[#FFA500]/10" />
                    <div 
                      className="absolute inset-0 opacity-30"
                      style={{
                        boxShadow: "inset 0 0 60px rgba(255, 69, 0, 0.4)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">{value.icon}</div>
                    <h3 className="text-2xl font-black mb-4 tracking-wider" style={{ color: "#FFA500" }}>
                      {value.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                  {/* Metallic Texture Overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.03) 0px,
                        transparent 1px,
                        transparent 2px,
                        rgba(255, 255, 255, 0.03) 3px
                      )`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative py-24 px-4 bg-[#0F0F0F]">
        <CircuitPattern />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-black mb-8 tracking-wider"
            style={{
              fontFamily: "'Microgramma', sans-serif",
              color: "#FFA500",
            }}
          >
            {siteConfig.about.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 leading-relaxed"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {siteConfig.about.body}
          </motion.p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-4 bg-gradient-to-t from-black to-[#0F0F0F] border-t border-[#2C3E50]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
              © 2026 {siteConfig.brand.name}. All rights reserved.
            </div>
            
            <div className="flex gap-6">
              <a 
                href={siteConfig.social.github}
                className="text-gray-400 hover:text-[#FF4500] transition-colors"
              >
                GitHub
              </a>
              <a 
                href={siteConfig.social.twitter}
                className="text-gray-400 hover:text-[#FF4500] transition-colors"
              >
                Twitter
              </a>
              <a 
                href={siteConfig.social.linkedin}
                className="text-gray-400 hover:text-[#FF4500] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
