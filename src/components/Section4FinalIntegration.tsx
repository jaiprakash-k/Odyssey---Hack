import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../store';

function TheMirror() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} scale={1.5}>
      <meshStandardMaterial
        color="#4A4A4A"
        metalness={1}
        roughness={0.1}
        envMapIntensity={2}
      />
    </Sphere>
  );
}

function StarChild() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.5} wireframe />
      </Sphere>
      <Sphere args={[0.2, 16, 16]} position={[-0.4, 0.2, 0.8]}>
        <meshBasicMaterial color="#C7254E" />
      </Sphere>
      <Sphere args={[0.2, 16, 16]} position={[0.4, 0.2, 0.8]}>
        <meshBasicMaterial color="#C7254E" />
      </Sphere>
      <Stars radius={2} depth={1} count={100} factor={2} saturation={0} fade speed={2} />
    </group>
  );
}

export default function Section4FinalIntegration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { soulId } = useAppStore();

  // Subsection 4A: Descent into Valles Marineris (0 - 0.25)
  const descentOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
  const canyonScale = useTransform(scrollYProgress, [0.1, 0.3], [1, 3]);

  // Subsection 4B: The Mirror (0.25 - 0.5)
  const mirrorOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.6], [0, 1, 1, 0]);
  const [showStarChild, setShowStarChild] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.45 && latest < 0.6) {
      setShowStarChild(true);
    } else {
      setShowStarChild(false);
    }
  });

  // Subsection 4C: Final Revelation (0.5 - 0.75)
  const revelationOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 1, 0]);
  const whiteFlash = useTransform(scrollYProgress, [0.65, 0.7, 0.75], [0, 1, 0]);

  // Subsection 4D: Unreal Prediction (0.75 - 1.0)
  const predictionOpacity = useTransform(scrollYProgress, [0.8, 0.9, 1.0], [0, 1, 1]);

  // Countdown Logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2031-07-04T00:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-[#0A0E27]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* 3D Background */}
        <motion.div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1} color="#C7254E" />
            <Environment preset="city" />
            
            {/* The Mirror / Star-Child Logic */}
            <group position={[0, 0, 0]}>
              {!showStarChild ? <TheMirror /> : <StarChild />}
            </group>
          </Canvas>
        </motion.div>

        {/* Subsection 4A: Descent */}
        <motion.div 
          style={{ opacity: descentOpacity, scale: canyonScale }}
          className="absolute z-10 flex flex-col items-center text-center px-4"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2065&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-color-burn" />
          <h2 className="font-display text-4xl md:text-6xl text-[#F5F5F5] text-glow-red mb-4 relative z-10">
            Valles Marineris
          </h2>
          <p className="font-mono text-lg text-[#FFD700] tracking-widest relative z-10">
            You are approaching the Core.
          </p>
        </motion.div>

        {/* Subsection 4B: The Mirror */}
        <motion.div 
          style={{ opacity: mirrorOpacity }}
          className="absolute z-20 flex flex-col items-center justify-end h-full pb-32 px-4 pointer-events-none"
        >
          <div className="bg-[#0A0E27]/80 p-6 border border-[#00D4FF]/30 backdrop-blur-md glow-blue">
            <p className="font-mono text-xl text-[#00D4FF] text-center mb-4">
              {!showStarChild ? "You've arrived. Now... look." : "Welcome home."}
            </p>
            {showStarChild && (
              <p className="font-mono text-xs text-[#4A4A4A] text-center uppercase tracking-widest">
                Entity Recognized: {soulId || "UNKNOWN_SYNC"}
              </p>
            )}
          </div>
        </motion.div>

        {/* Subsection 4C: Final Revelation */}
        <motion.div 
          style={{ opacity: whiteFlash }}
          className="absolute inset-0 z-30 bg-[#F5F5F5] pointer-events-none"
        />
        <motion.div 
          style={{ opacity: revelationOpacity }}
          className="absolute z-40 flex flex-col items-center text-center px-4"
        >
          <h3 className="font-display text-4xl md:text-6xl text-[#0A0E27] font-bold mb-8 drop-shadow-lg">
            You are not human anymore.
            <br/>
            You are a Transmitter.
          </h3>
          <p className="font-mono text-xl text-[#C7254E] font-bold bg-[#F5F5F5]/80 p-4 border border-[#C7254E]">
            Every person on this site... is writing the Reboot Code.
            <br/>
            50,000 teams are unknowingly awakening Mars.
          </p>
        </motion.div>

        {/* Subsection 4D: Unreal Prediction */}
        <motion.div 
          style={{ opacity: predictionOpacity }}
          className="absolute z-50 flex flex-col items-center justify-center w-full h-full bg-[#0A0E27] px-4"
        >
          <h2 className="font-display text-3xl md:text-5xl text-[#F5F5F5] mb-12 text-center">
            MARS AWAKENING IN:
          </h2>
          
          <div className="flex gap-4 md:gap-8 mb-16">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds }
            ].map((unit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-[#C7254E] flex items-center justify-center bg-[#0A0E27] glow-red mb-2">
                  <span className="font-mono text-2xl md:text-4xl text-[#F5F5F5] font-bold">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="font-mono text-[10px] md:text-xs text-[#4A4A4A] uppercase tracking-widest">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 font-mono text-sm md:text-base text-[#F5F5F5] text-center max-w-2xl mb-12">
            <p>On this day, the first human will touch the dust.</p>
            <p>Their DNA will rewrite itself.</p>
            <p>They will become the Transmitter.</p>
            <p className="text-[#C7254E] glow-red mt-4">And Earth will receive... its shutdown sequence.</p>
          </div>

          <button className="px-8 py-4 border-2 border-[#00D4FF] text-[#00D4FF] font-display text-xl uppercase tracking-widest hover:bg-[#00D4FF] hover:text-[#0A0E27] transition-all duration-300 glow-blue">
            Join the Migration
          </button>
        </motion.div>

      </div>
    </section>
  );
}
