"use client";
import { Heart, RefreshCcw, Sparkle, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MotionSection from '../../../components/view/motionComponents';
import { useContext } from 'react';
import Mycontext from '../../../context/mycontext';
import { Loader } from '../../../components/view/loader';

export const Hero = () => {
  const { loading } = useContext(Mycontext);

  if (loading) return <Loader />;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <MotionSection className='relative min-h-[85vh] w-full px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 py-16 overflow-hidden bg-[#fafafa] '>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-100/20 rounded-full blur-[80px] -z-10" />


      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='flex-1 flex flex-col items-start'
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-orange-100 mb-8"
        >
          <Sparkle className="size-4 text-orange-500 fill-orange-500" />
          <span className="text-xs font-semibold text-orange-700 tracking-wide">
            The smarter way to manage PG living
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className='text-5xl md:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight'>
          Manage your PG <br />
          <span className='text-orange-500'>without the stress.</span>
        </motion.h1>

        <motion.p variants={itemVariants} className='mt-6 text-lg text-slate-600 leading-relaxed max-w-lg'>
          Whether you're an owner looking to automate rent or a tenant seeking a seamless stay, we bring harmony to your living experience.
        </motion.p>

        <motion.div variants={itemVariants} className='flex flex-col gap-4 mt-8'>
          <div className='flex items-center gap-3'>
            <div className='bg-emerald-100 p-1 rounded-full'>
              <CheckCircle2 className='size-4 text-emerald-600' />
            </div>
            <span className='text-sm font-medium text-slate-700'>Instant rent receipts & reminders</span>
          </div>
          <div className='flex items-center gap-3'>
            <div className='bg-emerald-100 p-1 rounded-full'>
              <CheckCircle2 className='size-4 text-emerald-600' />
            </div>
            <span className='text-sm font-medium text-slate-700'>One-click maintenance requests</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 mt-10">
          <button className="px-8 py-4 bg-orange-500 text-white text-base font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 flex items-center gap-2 group active:scale-95">
            Start Your Journey
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="px-8 py-4 bg-white text-slate-700 text-base font-bold rounded-2xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-3 active:scale-95">
            <div className='size-7 rounded-full bg-slate-100 flex items-center justify-center'>
              <Play className="size-3 text-slate-600 fill-slate-600" />
            </div>
            How it works
          </button>
        </motion.div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='flex-1 relative w-full lg:max-w-xl'
      >
        <div className='relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]'>
          <img
            src="assets/brandon-griggs-wR11KBaB86U-unsplash.jpg"
            className='w-full aspect-square object-cover transition-transform duration-700 hover:scale-105'
            alt="Comfortable PG Room"
          />
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-4 z-20 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white flex items-center gap-4"
        >
          <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center">
            <Heart className="size-6 text-orange-500 fill-orange-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">1.2k Tenants</p>
            <p className="text-xs text-slate-500">Love their experience</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-8 -left-6 z-20 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl flex flex-col gap-2 min-w-[180px]"
        >
          <div className='flex items-center gap-2'>
            <div className='size-2 rounded-full bg-emerald-400 animate-pulse' />
            <span className='text-[10px] font-bold uppercase tracking-widest text-slate-400'>Payment Secure</span>
          </div>
          <h4 className='text-xl font-bold'>Rent Collected</h4>
          <p className='text-[10px] text-slate-400 font-medium'>Processing 24/7 automated payouts</p>
        </motion.div>
      </motion.div>

    </MotionSection>
  )
}