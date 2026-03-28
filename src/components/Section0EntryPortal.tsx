import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function PulsingLung() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * Math.PI / 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color="#C7254E"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#D32F2F"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

export default function Section0EntryPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <motion.div 
        style={{ opacity, scale, y }} 
        className="absolute inset-0 z-0"
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} color="#00D4FF" intensity={0.5} />
          <PulsingLung />
        </Canvas>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#F5F5F5] text-glow-red mb-4"
        >
          HEIRLOOM
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-mono text-xl md:text-2xl text-[#C7254E] tracking-[0.2em] uppercase mb-12"
        >
          The Mars Paradox
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          className="flex flex-col gap-4 text-sm md:text-base text-[#4A4A4A] font-mono max-w-md"
        >
          <p>4 billion years ago, Mars died.</p>
          <p>Its inhabitants sent a genetic seed to a primitive Earth.</p>
          <p>Humans are the backup drive.</p>
          <p className="text-[#F5F5F5] mt-4 glow-red">And now... we are ready to wake up.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-[#4A4A4A] uppercase tracking-widest">Scroll to Descend</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#C7254E] to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
