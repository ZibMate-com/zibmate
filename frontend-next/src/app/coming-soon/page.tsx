"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ComingSoon = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-08-01T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      setTimeLeft({
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((difference % (1000 * 60)) / 1000)),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center overflow-hidden font-sans px-6 selection:bg-orange-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 blur-[160px] rounded-full pointer-events-none" />

      <nav className="absolute top-0 w-full px-8 py-10 flex justify-between items-center z-30">
        {/* <div className="text-white font-semibold text-lg tracking-tighter flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-tr from-orange-500 to-rose-600 rounded-md" />
          <span className="text-orange-500">zibmate</span>
        </div> */}
        <div className="hidden md:block">
          <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-[10px] uppercase tracking-widest">
            Launching Autumn 2026
          </span>
        </div>
      </nav>

      <main className="z-10 text-center max-w-2xl w-full pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          <span className="text-[10px] font-bold text-orange-500/90 uppercase tracking-[0.2em]">
            The Blueprint is Ready
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[clamp(2.5rem,8vw,4.5rem)] font-medium text-white tracking-tight leading-[1.05] mb-6"
        >
          Stop Managing <br />
          <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
            Start living
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[16px] md:text-[18px] text-white/40 leading-relaxed max-w-[520px] mx-auto mb-14 font-light"
        >
          In th next <span className="text-orange-500 font-normal">4 months</span> we're ending the chaos of PG
          management forever. A seamless ecosystem built for the modern era.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-16"
        >
          {(Object.entries(timeLeft) as [keyof TimeLeft, number][]).map(([unit, value]) => (
            <div key={unit} className="group flex flex-col items-center gap-3">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/[0.02] border border-white/[0.08] rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:border-orange-500/30 transition-colors">
                <span className="text-3xl md:text-4xl font-light text-white tracking-tighter tabular-nums">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] font-medium tracking-[0.2em] text-white/20 uppercase group-hover:text-orange-500/50 transition-colors">
                {unit}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-[440px] mx-auto relative group"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="relative flex items-center p-1.5 pl-6 bg-white/[0.03] border border-white/10 rounded-full focus-within:border-orange-500/50 focus-within:ring-4 focus-within:ring-orange-500/5 transition-all duration-500 shadow-2xl backdrop-blur-xl"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email for early access"
                  className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/20 font-light"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-500 active:scale-95 text-white px-8 py-3 rounded-full text-[13px] font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)]"
                >
                  Join the Waitlist
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[14px] text-orange-100 py-4 px-8 rounded-full bg-gradient-to-r from-orange-600 to-rose-600 border border-white/10 shadow-xl font-medium"
              >
                ✨ You’re officially in the inner circle. Stay tuned.
              </motion.div>
            )}
          </AnimatePresence>
          <p className="mt-6 text-[11px] text-white/15 tracking-wide">
            Join 500+ owners and residents ready for the change.
          </p>
        </motion.div>
      </main>

      {/* Footer Info */}
      <footer className="absolute bottom-10 text-white/10 text-[10px] tracking-[0.3em] uppercase">
        Nexus Protocol © 2026
      </footer>
    </div>
  );
};

export default ComingSoon;
