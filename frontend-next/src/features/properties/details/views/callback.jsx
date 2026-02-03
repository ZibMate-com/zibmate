"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User, Mail, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export const CallBackModal = ({ isOpen, onClose, pgName }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API logic here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            {/* Decorative BG */}
            <div className="absolute -top-10 -right-10 size-32 bg-orange-100/50 rounded-full blur-3xl" />

            {!submitted ? (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Request Call</h3>
                    <p className="text-sm text-slate-500">Owner will contact you shortly</p>
                  </div>
                  {/* <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <X className="size-5 text-slate-400" />
                  </button> */}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input required type="text" placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black placeholder-black" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input required type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black placeholder-black" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input required type="tel" placeholder="+91 98765 43210" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black placeholder-black" />
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-slate-200">
                    Submit Request <Send className="size-4" />
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center"
              >
                <div className="size-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="size-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Request Sent!</h3>
                <p className="text-slate-500">The owner of {pgName} will call you back soon.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};