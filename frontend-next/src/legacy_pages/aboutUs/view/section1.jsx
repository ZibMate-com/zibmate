"use client";
import { ArrowRight, ShieldCheck, Star, MapPin, Zap, Search } from "lucide-react";
import { motion } from "framer-motion";
import MotionSection from "../../../components/view/motionComponents";
import Link from "next/link";

export const SectionOne = () => {
  return (
    <MotionSection className="w-full py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
      {/* Subtle Background Text - "TRUSTED" */}
      <div className="absolute top-20 left-0 text-[12rem] font-bold text-slate-50 select-none -z-10 leading-none">
        ZIB
      </div>

      <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        
        {/* LEFT SIDE: MULTI-LAYERED VISUAL STACK */}
        <div className="w-full lg:w-1/2 relative">
          
          {/* Main Hero Image */}
          <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(249,115,22,0.15)]">
            <motion.img
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop" 
              className="w-full h-[650px] object-cover"
              alt="Premium PG Accomodation"
            />
            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 via-transparent to-transparent" />
          </div>

          {/* Floating UI Card 1: Location Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute top-16 -left-8 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3"
          >
            <div className="size-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
              <MapPin className="size-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Prime Locations</p>
              <p className="text-sm font-extrabold text-slate-900">Near Tech Parks & Unis</p>
            </div>
          </motion.div>

          {/* Floating UI Card 2: Rating Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-20 -right-4 z-20 bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-800"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="flex text-orange-400">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="size-3 fill-orange-400" />)}
              </div>
              <span className="text-xs font-bold text-slate-400">4.9/5 Rating</span>
            </div>
            <p className="text-sm font-medium italic text-slate-200">"Found a safe PG in 2 days without <br/> paying a single rupee in brokerage!"</p>
            <p className="text-xs text-orange-500 font-bold mt-3">— Rahul S., Software Engineer</p>
          </motion.div>

          {/* Abstract Pattern Decor */}
          <div className="absolute -bottom-6 -left-6 size-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob" />
        </div>

        {/* RIGHT SIDE: TEXT & INTERACTION */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-orange-500" />
              <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase">Your Housing Partner</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-8">
              Premium stays. <br />
              <span className="relative inline-block text-orange-500">
                Direct Deals.
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 7C20 7 30 2 50 2C70 2 80 7 100 7" stroke="#F97316" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
              Zibmate is India's first <span className="text-slate-900 font-bold">Broker-Free</span> ecosystem for students and professionals. We verify every PG, so you don't have to worry about hidden charges or fake photos.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              {[
                { label: "Verified Owners", icon: ShieldCheck },
                { label: "Real-Time Site Visits", icon: Search },
                { label: "Instant Booking", icon: Zap },
              ].map((pill, idx) => (
                <div key={idx} className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-50 border border-slate-100 hover:border-orange-200 hover:bg-orange-50 transition-all cursor-default">
                  <pill.icon className="size-4 text-orange-500" />
                  <span className="text-sm font-bold text-slate-700">{pill.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link href={"/findpg"}>
              <button className="relative group px-10 py-5 bg-orange-500 text-white rounded-2xl font-bold overflow-hidden transition-all active:scale-95 shadow-xl shadow-orange-500/25">
                <span className="relative z-10 flex items-center gap-2">
                  Explore PGs Near You
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-slate-900 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              </Link>
              <Link href={'/claimyourpg'}>
              <button className="px-10 py-5 bg-transparent text-slate-900 border-2 border-slate-900 rounded-2xl font-bold hover:bg-slate-900 hover:text-white transition-all active:scale-95">
                List Your PG
              </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
};