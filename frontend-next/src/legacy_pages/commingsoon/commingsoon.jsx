"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Countdown logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-08-30T00:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/10 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Navigation / Logo */}
      <nav className="absolute top-0 w-full p-10 flex justify-between items-center z-20">
        <div className="text-white font-bold text-2xl tracking-tighter">
          NEXUS<span className="text-orange-500 italic">PG</span>
        </div>
        <div className="hidden md:block text-slate-500 text-sm font-medium tracking-widest uppercase">
          Launching Summer 2026
        </div>
      </nav>

      <main className="z-10 px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Initial Beta v0.1</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mb-6"
        >
          THE NEXT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700">CHAPTER.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-12 font-medium"
        >
          We're reimagining the PG experience from the ground up. Efficiency for owners. Comfort for residents.
        </motion.p>

        {/* Countdown Grid */}
        <div className="flex justify-center gap-4 mb-16">
          {Object.entries(timeLeft).map(([unit, value], idx) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="flex flex-col"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] flex items-center justify-center mb-3">
                <span className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">{unit}</span>
            </motion.div>
          ))}
        </div>

        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="input"
                exit={{ opacity: 0, scale: 0.9 }}
                onSubmit={handleSubmit}
                className="relative flex items-center p-1 bg-white/5 border border-white/10 rounded-full focus-within:border-orange-500/50 transition-all duration-500 shadow-2xl shadow-orange-500/5"
              >
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full bg-transparent py-4 px-6 text-white outline-none placeholder:text-slate-600"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-sm transition-all active:scale-95"
                >
                  Notify Me
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange-500/10 border border-orange-500/20 py-4 px-8 rounded-full text-orange-400 font-semibold"
              >
                🎉 You're on the list. We'll be in touch.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Decorative Floating Circles */}
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-orange-500 rounded-full animate-bounce" />
      <div className="absolute bottom-1/4 right-20 w-1 h-1 bg-white rounded-full animate-pulse" />
    </div>
  );
};

export default ComingSoon;
