import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore } from '../store';
import GhostSignal from './GhostSignal';

export default function UIOverlay() {
  const { oxygenLevel, setOxygenLevel, syncProgress, soulId, setSoulId } = useAppStore();
  const [showSoulModal, setShowSoulModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Initial Soul ID check
  useEffect(() => {
    const savedId = localStorage.getItem('mars_soul_id');
    if (savedId) {
      setSoulId(savedId);
    } else {
      // Show modal after a short delay
      const timer = setTimeout(() => setShowSoulModal(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [setSoulId]);

  const handleGenerateSoulId = (e: React.FormEvent) => {
    e.preventDefault();
    const hash = btoa(inputValue).substring(0, 4).toUpperCase();
    const newId = `MAR-${Math.floor(Math.random() * 9000) + 1000}-${hash}-SYNC`;
    setSoulId(newId);
    localStorage.setItem('mars_soul_id', newId);
    setShowSoulModal(false);
  };

  const handleBreathe = () => {
    setOxygenLevel(100);
  };

  return (
    <>
      <GhostSignal />
      
      {/* Oxygen Meter */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full border border-[#4A4A4A] flex items-center justify-center bg-[#0A0E27]/50 backdrop-blur-sm">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={oxygenLevel < 20 ? '#C7254E' : oxygenLevel < 50 ? '#FFD700' : '#00D4FF'}
              strokeWidth="4"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * oxygenLevel) / 100}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <span className="text-xs font-mono font-bold">{oxygenLevel}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A]">Lung Capacity</span>
          <span className="text-xs font-mono text-[#00D4FF]">O2 DEBT</span>
        </div>
      </div>

      {/* Breathe Button (Appears when low) */}
      <AnimatePresence>
        {oxygenLevel < 20 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleBreathe}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-32 h-32 rounded-full bg-[#C7254E]/20 border border-[#C7254E] flex items-center justify-center glow-red cursor-pointer hover:bg-[#C7254E]/40 transition-colors"
          >
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="font-display font-bold tracking-widest text-[#F5F5F5] text-glow-red"
            >
              BREATHE
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sync Counter */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A]">Global Sync</span>
            <span className="text-xs font-mono text-[#FFD700]">PHASE {Math.floor(syncProgress / 25) + 1}</span>
          </div>
          <div className="w-12 h-12 rounded-full border border-[#FFD700]/30 flex items-center justify-center bg-[#0A0E27]/50 backdrop-blur-sm glow-gold">
            <span className="text-sm font-mono font-bold text-[#FFD700]">{syncProgress}%</span>
          </div>
        </div>
        {soulId && (
          <div className="text-[10px] font-mono text-[#4A4A4A] bg-[#0A0E27]/80 px-2 py-1 rounded border border-[#4A4A4A]/50">
            ID: {soulId}
          </div>
        )}
      </div>

      {/* Soul ID Modal */}
      <AnimatePresence>
        {showSoulModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0E27]/90 backdrop-blur-md flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="max-w-md w-full p-8 border border-[#C7254E]/30 bg-[#0A0E27] glow-red relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C7254E] to-transparent" />
              
              <h2 className="font-display text-2xl mb-2 text-[#F5F5F5]">ORIGIN SIGNATURE</h2>
              <p className="text-sm text-[#4A4A4A] mb-6 font-mono">
                To begin the sync process, we must establish your genetic anchor.
              </p>

              <form onSubmit={handleGenerateSoulId} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a memory, name, or date..."
                  className="bg-transparent border-b border-[#4A4A4A] focus:border-[#C7254E] outline-none py-2 font-mono text-sm text-[#F5F5F5] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="mt-4 py-3 px-6 border border-[#C7254E] text-[#C7254E] hover:bg-[#C7254E] hover:text-[#0A0E27] font-mono text-sm uppercase tracking-widest transition-all duration-300"
                >
                  Generate Soul ID
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
