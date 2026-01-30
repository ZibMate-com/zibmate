"use client";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import MotionSection from "../../../components/view/motionComponents";
import Link from "next/link";
import { motion } from "framer-motion";

export const SectionThree = () => {
  return (
    <section className="w-full relative py-24 px-6 md:px-12 lg:px-24 bg-slate-50/50">
      <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center gap-12 overflow-hidden rounded-[3rem] bg-slate-900 relative shadow-2xl">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-50 transition-transform duration-[10s] hover:scale-110"
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
            alt="Property Management"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        {/* Content Side */}
        <div className="relative z-10 w-full lg:w-3/5 p-8 md:p-16 lg:p-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="size-2 rounded-full bg-orange-500 animate-pulse" />
              Unified Ecosystem
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Connecting owners and <br />
              <span className="text-orange-500">guests seamlessly.</span>
            </h1>

            <div className="mt-10 space-y-4">
              {[
                "Streamline property management for all users.",
                "Centralize payments and communication securely.",
                "Modern platform for efficient operations."
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all cursor-default group"
                >
                  <div className="size-10 rounded-xl bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                    <CheckCircle2 className="size-5 text-orange-500 group-hover:text-white" />
                  </div>
                  <span className="text-lg text-slate-200 font-medium">{text}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-6">
              <Link href="/contact">
                <button className="group px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold text-base hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 flex items-center gap-2 active:scale-95">
                  Contact Us
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <div className="hidden sm:flex items-center gap-3 text-slate-400">
                <div className="size-10 rounded-full border border-slate-700 flex items-center justify-center">
                  <MessageCircle className="size-5" />
                </div>
                <p className="text-sm font-medium">Available 24/7 Support</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Accent for Desktop */}
        <div className="hidden lg:block absolute right-20 top-20">
          <div className="size-64 rounded-full bg-orange-500/10 blur-[100px]" />
        </div>
      </div>
    </section>
  );
};