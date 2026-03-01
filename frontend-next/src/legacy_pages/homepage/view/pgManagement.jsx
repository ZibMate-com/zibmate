"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import MotionSection from "../../../components/view/motionComponents";
import organize from "../../../assets/organize.png";
import payment from "../../../assets/payments.png";
import bridge from "../../../assets/bridge.png";
import alerts from "../../../assets/alerts.png";

export const PgManagement = () => {
  const containerRef = useRef(null);

  const cardStyles = `relative group overflow-hidden rounded-[3rem] border border-white/20 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-all duration-700 hover:shadow-[0_20px_80px_rgba(249,115,22,0.15)]`;

  return (
    <MotionSection className="relative w-full py-32 px-6 overflow-hidden bg-[#fafafa]" id="management">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-orange-500 uppercase bg-orange-100/50 rounded-full"
          >
            Smart Infrastructure
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight"
          >
            Management{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-rose-500">
              Redefined
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Stop juggling apps. Experience a fluid, intelligent ecosystem built specifically for the modern property
            owner
          </motion.p>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px] md:auto-rows-[350px]">
          {/* Card 1: The "Hero" Feature */}
          <motion.div
            whileHover={{ y: -10 }}
            className={`${cardStyles} md:col-span-8 md:row-span-1 flex flex-row items-center p-10`}
          >
            <div className="flex-1 z-10">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Onboard in Seconds</h3>
              <p className="text-slate-500 text-lg max-w-xs">
                Smart KYC and automated room allocation without the paperwork headache.
              </p>
              <button className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-full font-medium hover:bg-orange-500 transition-colors">
                Try it now
              </button>
            </div>
            <div className="flex-1 relative h-full hidden lg:block">
              <Image
                src={organize}
                alt="UI"
                className="absolute top-10 left-10 w-[120%] max-w-none rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
              />
            </div>
          </motion.div>

          {/* Card 2: Aesthetic Stats/Payments */}
          <motion.div
            whileHover={{ y: -10 }}
            className={`${cardStyles} md:col-span-4 md:row-span-2 bg-gradient-to-br from-orange-500 to-rose-500 p-10 text-white border-none`}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-white">Automated Collections</h3>
                <p className="text-orange-100 text-lg">
                  Set it and forget it. Rent hits your account, receipts hit theirs.
                </p>
              </div>
              <div className="relative mt-10 md:inline-block hidden">
                <Image
                  src={payment}
                  alt="Payments"
                  className="rounded-2xl shadow-xl group-hover:translate-y-[-10px] transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Communication Bridge */}
          <motion.div whileHover={{ y: -10 }} className={`${cardStyles} md:col-span-4 md:row-span-1 p-10`}>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Direct Bridge</h3>
            <p className="text-slate-500">Eliminate the middleman with direct resident chat.</p>
            <div className="mt-8 flex justify-center">
              <div className="relative object-cover">
                <div className="absolute inset-0 bg-orange-400 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <Image
                  src={bridge}
                  alt="Chat"
                  className="relative w-100 h-60   group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Card 4: Dark Mode Alert Center */}
          <motion.div
            whileHover={{ y: -10 }}
            className={`${cardStyles} md:col-span-4 md:row-span-1 bg-slate-900 p-10 border-none shadow-orange-900/20`}
          >
            <div className="flex flex-col h-full">
              <span className="text-2xl font-bold text-slate-900 mb-2">LIVE SYSTEM</span>
              {/* <h3 className="text-2xl font-bold text-white mb-2">Instant Alert Engine</h3> */}
              <p className="text-slate-400">Real-time notifications for repairs and payments.</p>
              <div className="mt-auto overflow-hidden rounded-t-xl bg-slate-800 p-4 border-t border-x border-slate-700 group-hover:bg-slate-700 transition-colors">
                <Image src={alerts} alt="Alerts" className="w-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
};
