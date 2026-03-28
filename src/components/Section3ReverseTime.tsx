import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function TimeStorm() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions] = useState(() => {
    const count = 10000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      // Reverse rotation
      pointsRef.current.rotation.y -= state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x -= state.clock.elapsedTime * 0.05;
      
      // Turbulence
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFD700"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function Section3ReverseTime() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [era, setEra] = useState<'modern' | '2010s' | '2000s' | '1990s' | 'early' | 'ancient'>('modern');

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) setEra('modern');
    else if (latest < 0.4) setEra('2010s');
    else if (latest < 0.6) setEra('2000s');
    else if (latest < 0.7) setEra('1990s');
    else if (latest < 0.85) setEra('early');
    else setEra('ancient');
  });

  // Subsection 3A: The Storm Arrives (0 - 0.25)
  const stormOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
  const stormBlur = useTransform(scrollYProgress, [0.1, 0.2, 0.3], ["0px", "10px", "0px"]);
  const stormSaturation = useTransform(scrollYProgress, [0.1, 0.3], ["100%", "0%"]);

  // Subsection 3B: De-Aging (0.25 - 0.75)
  const deAgingOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.7, 0.8], [0, 1, 1, 0]);

  // Subsection 3C: Wisdom of Ancients (0.75 - 1.0)
  const ancientOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1.0], [0, 1, 0]);

  const getEraStyles = () => {
    switch (era) {
      case 'modern':
        return "font-sans text-[#F5F5F5] bg-[#0A0E27] tracking-tight";
      case '2010s':
        return "font-sans text-[#4A4A4A] bg-gradient-to-b from-[#E0E0E0] to-[#FFFFFF] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] rounded-lg p-8 border border-[#CCCCCC]";
      case '2000s':
        return "font-['Comic_Sans_MS',_sans-serif] text-[#FF00FF] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-[#0000FF] border-4 border-ridge border-[#00FFFF] p-4";
      case '1990s':
        return "font-['Times_New_Roman',_serif] text-[#00FF00] bg-[#000000] border-2 border-dashed border-[#FF0000] p-2";
      case 'early':
        return "font-mono text-[#00FFFF] bg-[#000080] p-8 uppercase tracking-widest";
      case 'ancient':
        return "font-['Courier_New',_monospace] text-[#D32F2F] bg-[#1A1A1A] p-12 text-center tracking-[0.5em]";
    }
  };

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-[#0A0E27] overflow-hidden">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* 3D Background */}
        <motion.div 
          style={{ filter: `blur(${stormBlur}) saturate(${stormSaturation})` }}
          className="absolute inset-0 z-0"
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <TimeStorm />
          </Canvas>
        </motion.div>

        {/* Subsection 3A: Storm Arrives */}
        <motion.div 
          style={{ opacity: stormOpacity }}
          className="absolute z-10 flex flex-col items-center text-center px-4"
        >
          <h2 className="font-display text-6xl md:text-8xl text-[#F5F5F5] text-glow-gold mb-4 animate-pulse">
            TIME IS FLOWING BACKWARD
          </h2>
          <p className="font-mono text-xl text-[#C7254E] tracking-widest">
            You are becoming younger.
          </p>
        </motion.div>

        {/* Subsection 3B: De-Aging Web */}
        <motion.div 
          style={{ opacity: deAgingOpacity }}
          className={`absolute z-20 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 transition-all duration-500 ${getEraStyles()}`}
        >
          {era === 'modern' && (
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4">Modern Web</h3>
              <p className="text-lg text-gray-400">Clean, minimal, 3D-accelerated.</p>
            </div>
          )}
          {era === '2010s' && (
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#333] mb-4 drop-shadow-md">Web 2.0 Era</h3>
              <button className="bg-gradient-to-b from-[#4CAF50] to-[#45a049] text-white px-6 py-2 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:translate-y-[2px] transition-all">
                Click Me!
              </button>
            </div>
          )}
          {era === '2000s' && (
            <div className="text-center">
              <div className="overflow-hidden whitespace-nowrap w-full mb-4 bg-[#FFFF00] border-4 border-dotted border-[#00FF00] p-2">
                <motion.div 
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                  className="text-4xl font-bold text-[#FF0000] inline-block"
                >
                  WELCOME TO MY HOMEPAGE!!!
                </motion.div>
              </div>
              <img src="https://media.giphy.com/media/11ISwbgCxEzMyY/giphy.gif" alt="Dancing Baby" className="mx-auto w-32 h-32" />
            </div>
          )}
          {era === '1990s' && (
            <div className="text-center">
              <h1 className="text-5xl font-bold underline mb-4 text-[#0000FF] bg-[#FFFF00]">HTML 1.0</h1>
              <table border={1} cellPadding={10} className="mx-auto border-[#FFFFFF] text-[#FFFFFF]">
                <tbody>
                  <tr>
                    <td>Links</td>
                    <td><a href="#" className="text-[#0000FF] underline">Click Here</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {era === 'early' && (
            <div className="text-center">
              <h3 className="text-2xl mb-4">SYSTEM TERMINAL</h3>
              <p className="animate-pulse">C:\&gt; RUN MARS_PROTOCOL.EXE</p>
              <p className="mt-4">. --- . / .. ... / -- .- .-. ...</p>
            </div>
          )}
          {era === 'ancient' && (
            <div className="text-center flex flex-col items-center gap-8">
              <svg width="100" height="100" viewBox="0 0 100 100" className="stroke-[#D32F2F] stroke-2 fill-none">
                <circle cx="50" cy="50" r="40" strokeDasharray="10 5" className="animate-[spin_10s_linear_infinite]" />
                <line x1="50" y1="10" x2="50" y2="90" />
                <line x1="10" y1="50" x2="90" y2="50" />
              </svg>
              <p className="text-2xl">TO KNOW MARS, YOU MUST FORGET EARTH.</p>
            </div>
          )}
        </motion.div>

        {/* Subsection 3C: Wisdom of Ancients */}
        <motion.div 
          style={{ opacity: ancientOpacity }}
          className="absolute z-30 flex flex-col items-center text-center px-4"
        >
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Spiral SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#C7254E] stroke-[0.5] fill-none glow-red animate-[spin_20s_linear_infinite]">
              <path d="M50,50 m0,-45 a45,45 0 1,1 0,90 a45,45 0 1,1 0,-90" strokeDasharray="2 4" />
              <path d="M50,50 m0,-35 a35,35 0 1,1 0,70 a35,35 0 1,1 0,-70" strokeDasharray="4 8" />
              <path d="M50,50 m0,-25 a25,25 0 1,1 0,50 a25,25 0 1,1 0,-50" strokeDasharray="8 16" />
              <path d="M50,50 m0,-15 a15,15 0 1,1 0,30 a15,15 0 1,1 0,-30" strokeDasharray="16 32" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] text-[#FFD700] tracking-[0.5em] uppercase text-center">
                The more we go backward...<br/>the closer we get to the truth.
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
