import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Plane, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DustStorm() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions] = useState(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#C7254E"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function Dune({ position, scale, color }: { position: [number, number, number], scale: number, color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Plane ref={meshRef} args={[5, 5, 64, 64]} position={position} rotation={[-Math.PI / 2, 0, 0]} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={1}
        roughness={0.9}
        metalness={0.1}
        wireframe={true}
      />
    </Plane>
  );
}

export default function Section2Archive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [activeMemory, setActiveMemory] = useState<number | null>(null);

  // Subsection 2A: The Descent (0 - 0.25)
  const descentOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
  const cameraZ = useTransform(scrollYProgress, [0.1, 0.3], [10, 2]);

  // Subsection 2B: The Whispering Dunes (0.25 - 0.6)
  const dunesOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  
  // Subsection 2C: The Subconscious Mirror (0.6 - 1.0)
  const mirrorOpacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);

  const memories = [
    {
      title: "The Glass City",
      desc: "This looks... familiar. This is New York. But it's not.",
      color: "#00D4FF"
    },
    {
      title: "The Crystalline Temple",
      desc: "This architecture... I've dreamed of this.",
      color: "#FFD700"
    },
    {
      title: "The Transmission Hub",
      desc: "They were sending data. Constantly. To Earth?",
      color: "#C7254E"
    }
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-[#0A0E27]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* 3D Background */}
        <motion.div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 5, 0]} intensity={1} color="#C7254E" />
            <DustStorm />
            <Dune position={[-3, -2, -2]} scale={1.5} color="#4A4A4A" />
            <Dune position={[0, -2.5, 0]} scale={2} color="#C7254E" />
            <Dune position={[3, -2, -2]} scale={1.5} color="#4A4A4A" />
          </Canvas>
        </motion.div>

        {/* Subsection 2A: Descent */}
        <motion.div 
          style={{ opacity: descentOpacity }}
          className="absolute z-10 flex flex-col items-center text-center px-4"
        >
          <h2 className="font-display text-5xl md:text-7xl text-[#F5F5F5] text-glow-red mb-4">
            The Archive
          </h2>
          <p className="font-mono text-xl text-[#FFD700] tracking-widest">
            You are descending...
          </p>
        </motion.div>

        {/* Subsection 2B: Whispering Dunes */}
        <motion.div 
          style={{ opacity: dunesOpacity }}
          className="absolute z-20 flex flex-col items-center w-full px-4"
        >
          <p className="font-mono text-sm md:text-base text-[#F5F5F5] text-center max-w-2xl mb-12 bg-[#0A0E27]/50 p-4 backdrop-blur-sm border border-[#4A4A4A]">
            "Every grain of sand is a data-crystal containing one second of a Martian life."
          </p>

          <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
            {memories.map((memory, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveMemory(idx)}
                className="flex-1 h-48 border border-[#4A4A4A] bg-[#0A0E27]/80 backdrop-blur-md flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#C7254E] transition-colors group"
                style={{ boxShadow: activeMemory === idx ? `0 0 20px ${memory.color}` : 'none' }}
              >
                <div className="w-12 h-12 rounded-full border border-dashed border-[#4A4A4A] group-hover:border-[#C7254E] mb-4 flex items-center justify-center group-hover:animate-spin">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: memory.color }} />
                </div>
                <h4 className="font-display text-lg text-[#F5F5F5] mb-2">{memory.title}</h4>
                <span className="text-[10px] font-mono text-[#4A4A4A] uppercase tracking-widest">Extract Memory</span>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {activeMemory !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 border border-[#00D4FF]/30 bg-[#0A0E27]/90 backdrop-blur-lg max-w-2xl text-center glow-blue"
              >
                <p className="font-mono text-lg text-[#00D4FF]">{memories[activeMemory].desc}</p>
                <button 
                  onClick={() => setActiveMemory(null)}
                  className="mt-4 text-xs font-mono text-[#4A4A4A] hover:text-[#F5F5F5] uppercase tracking-widest"
                >
                  [ Close Archive ]
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subsection 2C: Subconscious Mirror */}
        <motion.div 
          style={{ opacity: mirrorOpacity }}
          className="absolute z-30 flex flex-col items-center justify-center w-full h-full bg-[#0A0E27]/90 backdrop-blur-md px-4"
        >
          <div className="flex flex-col md:flex-row w-full max-w-6xl h-[60vh] gap-4">
            <div className="flex-1 border border-[#4A4A4A] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-luminosity group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute bottom-4 left-4 bg-[#0A0E27]/80 px-4 py-2 font-mono text-xs text-[#F5F5F5] border border-[#4A4A4A]">
                EARTH_ECHO
              </div>
            </div>
            
            <div className="flex items-center justify-center px-4 font-display text-4xl text-[#C7254E] animate-pulse">
              ⇌
            </div>

            <div className="flex-1 border border-[#C7254E] relative overflow-hidden group glow-red">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2065&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-color-burn group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute bottom-4 right-4 bg-[#C7254E]/20 px-4 py-2 font-mono text-xs text-[#C7254E] border border-[#C7254E]">
                MARS_ORIGIN
              </div>
            </div>
          </div>
          
          <h3 className="font-display text-3xl md:text-5xl text-[#F5F5F5] mt-12 text-center max-w-4xl">
            "The Eiffel Tower. The Burj Khalifa. They're all just... <span className="text-[#00D4FF] text-glow-blue">echoes</span>."
          </h3>
        </motion.div>

      </div>
    </section>
  );
}
