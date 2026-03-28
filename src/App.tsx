/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { useAppStore } from './store';

import Section0EntryPortal from './components/Section0EntryPortal';
import Section1IronHeartbeat from './components/Section1IronHeartbeat';
import Section2Archive from './components/Section2Archive';
import Section3ReverseTime from './components/Section3ReverseTime';
import Section4FinalIntegration from './components/Section4FinalIntegration';
import UIOverlay from './components/UIOverlay';

export default function App() {
  const { scrollYProgress } = useScroll();
  const setSyncProgress = useAppStore((state) => state.setSyncProgress);
  const oxygenLevel = useAppStore((state) => state.oxygenLevel);
  const setOxygenLevel = useAppStore((state) => state.setOxygenLevel);
  const isBreathing = useAppStore((state) => state.isBreathing);

  // Setup Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Update sync progress based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setSyncProgress(Math.round(latest * 100));
  });

  // Oxygen depletion mechanic
  useEffect(() => {
    if (isBreathing) return;
    
    const interval = setInterval(() => {
      setOxygenLevel(useAppStore.getState().oxygenLevel - 1);
    }, 3000); // Deplete 1% every 3 seconds

    return () => clearInterval(interval);
  }, [isBreathing, setOxygenLevel]);

  return (
    <div className="relative w-full bg-[#0A0E27] text-[#F5F5F5] font-sans selection:bg-[#C7254E] selection:text-white">
      <UIOverlay />
      
      {/* The blur effect when oxygen is low */}
      <div 
        className="pointer-events-none fixed inset-0 z-40 transition-all duration-1000"
        style={{
          backdropFilter: oxygenLevel < 20 ? `blur(${20 - oxygenLevel}px)` : 'none',
          boxShadow: oxygenLevel < 15 ? `inset 0 0 ${100 - oxygenLevel * 5}px rgba(199, 37, 78, ${0.8 - oxygenLevel * 0.05})` : 'none'
        }}
      />

      <main className="relative w-full">
        <Section0EntryPortal />
        <Section1IronHeartbeat />
        <Section2Archive />
        <Section3ReverseTime />
        <Section4FinalIntegration />
      </main>
    </div>
  );
}
