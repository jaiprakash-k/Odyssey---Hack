import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshWobbleMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

function MarsGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} scale={1.5}>
      <MeshWobbleMaterial
        color="#C7254E"
        attach="material"
        factor={0.1}
        speed={1}
        roughness={0.8}
        metalness={0.2}
        emissive="#4A4A4A"
        emissiveIntensity={0.2}
        wireframe={true}
      />
    </Sphere>
  );
}

export default function Section1IronHeartbeat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subsection 1A: The Rover's Discovery (0 - 0.33)
  const roverX = useTransform(scrollYProgress, [0.1, 0.3], ["-100%", "50%"]);
  const roverOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
  const text1Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);

  // Subsection 1B: The Red Planet Breathes (0.33 - 0.66)
  const globeScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.5, 1.2, 2]);
  const globeOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);

  // Subsection 1C: The Sync Meter (0.66 - 1.0)
  const text3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);
  const avatarScale = useTransform(scrollYProgress, [0.7, 0.9], [1, 2]);
  const avatarBlur = useTransform(scrollYProgress, [0.7, 0.9], ["0px", "10px"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] w-full bg-[#0A0E27]">
      {/* Sticky Container for 3D and UI */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* 3D Background - Mars Globe */}
        <motion.div 
          style={{ scale: globeScale, opacity: globeOpacity }} 
          className="absolute inset-0 z-0"
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <MarsGlobe />
          </Canvas>
        </motion.div>

        {/* Subsection 1A: Rover */}
        <motion.div 
          style={{ x: roverX, opacity: roverOpacity }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center gap-8"
        >
          <div className="w-32 h-16 border-2 border-[#00D4FF] bg-[#0A0E27]/80 backdrop-blur-sm flex items-center justify-center glow-blue">
            <span className="font-mono text-[#00D4FF] text-xs uppercase tracking-widest animate-pulse">Rover_Unit_7</span>
          </div>
          
          <motion.div style={{ opacity: text1Opacity }} className="flex flex-col gap-2 font-mono text-sm text-[#F5F5F5]">
            <p className="text-[#4A4A4A]">Scanning sector 4...</p>
            <p className="text-[#C7254E]">Rover detected: Iron oxide</p>
            <p className="text-[#C7254E]">Rover detected: Hexagonal crystalline structures</p>
            <p className="text-[#FFD700] text-lg font-bold glow-gold mt-4 animate-pulse">Rover detected: [ANOMALY]</p>
            <p className="text-2xl font-display mt-8 text-glow-red">The Martian crust... is made of Heme.</p>
          </motion.div>
        </motion.div>

        {/* Subsection 1B: Planet Breathes */}
        <motion.div 
          style={{ opacity: text2Opacity }}
          className="absolute z-20 flex flex-col items-center text-center max-w-2xl px-4"
        >
          <h3 className="font-display text-4xl md:text-6xl text-[#F5F5F5] text-glow-red mb-6">
            The Red Planet Breathes
          </h3>
          <p className="font-mono text-lg text-[#4A4A4A]">
            It's not a dead rock. It's a dormant organism.
          </p>
        </motion.div>

        {/* Subsection 1C: Sync Meter Intro */}
        <motion.div 
          style={{ opacity: text3Opacity }}
          className="absolute z-30 flex flex-col items-center text-center"
        >
          <h3 className="font-display text-3xl md:text-5xl text-[#00D4FF] text-glow-blue mb-8">
            Your digital avatar is beginning to change...
          </h3>
          
          <motion.div 
            style={{ scale: avatarScale, filter: avatarBlur }}
            className="w-48 h-48 rounded-full border-4 border-[#C7254E] flex items-center justify-center relative overflow-hidden glow-red"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMEEwRTI3Ij48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNDNzI1NEUiPjwvcmVjdD4KPC9zdmc+')] opacity-50 mix-blend-screen" />
            <span className="font-mono text-4xl text-[#C7254E] font-bold z-10">SYNC</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
