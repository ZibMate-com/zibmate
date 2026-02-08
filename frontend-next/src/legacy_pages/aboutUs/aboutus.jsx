"use client";
import React from "react";
import { motion } from "framer-motion";
import { SectionOne } from "./view/section1";
import { SectionTwo } from "./view/section2";
import { SectionThree } from "./view/section3";
import { Users, Home, ShieldCheck, Heart } from "lucide-react";

export const AboutUs = () => {
  return (
    <main className="overflow-x-hidden bg-white">
      {/* --- HERO SECTION: The Big Picture --- */}
      <section className="relative pt-20 pb-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
              Moving simplified
            </span>
            <h1 className="mt-4 text-5xl md:text-7xl font-bold text-slate-900 tracking-tight">
              A home is more than <br />
              <span className="text-orange-500">just four walls</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Zibmate was born out of a simple realization: finding a PG shouldn't feel like a gamble. 
              We've built a bridge between transparent owners and seekers like you.
            </p>
          </motion.div>
        </div>
        
        {/* Background Decorative Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-orange-100/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] size-[400px] bg-slate-200/50 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* --- INTEGRATED SECTIONS --- */}
      
      {/* Section 01: Focus on Features & Technology */}
      <SectionOne />

      {/* --- QUICK STATS / TRUST BAND --- */}
      <div className="w-full py-12 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { label: "Direct Connections", value: "100%", icon: Users },
                { label: "Verified PGs", value: "2,500+", icon: Home },
                { label: "Brokerage Paid", value: "₹0", icon: ShieldCheck },
                { label: "Happy Residents", value: "15k+", icon: Heart },
            ].map((stat, i) => (
                <div key={i} className="text-center group">
                    <stat.icon className="size-6 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                    <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
      </div>

      {/* Section 02: Focus on Philosophy & Community */}
      <SectionTwo />

      {/* --- THE VALUES SECTION: Why Zibmate? --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900">Why thousands trust Zibmate</h2>
                <div className="h-1 w-20 bg-orange-500 mx-auto mt-4 rounded-full" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
                <ValueCard 
                    title="Real PGs, Real Details"
                    desc="We list actual photos and verified amenities so what you see is exactly what you get."
                />
                <ValueCard 
                    title="Zero Brokerage"
                    desc="By connecting you directly with owners, we've eliminated the 'middleman' tax forever."
                />
                <ValueCard 
                    title="No Pressure"
                    desc="Take your time. Chat with owners, visit the place, and decide when you feel ready."
                />
            </div>
        </div>
      </section>

      {/* Section 03: Final Call to Action */}
      <SectionThree />
      
    </main>
  );
};

const ValueCard = ({ title, desc }) => (
    <div className="p-8 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100">
        <div className="size-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6">
            <ShieldCheck className="size-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
);

