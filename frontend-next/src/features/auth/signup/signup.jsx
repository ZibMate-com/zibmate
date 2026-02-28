"use client";
import React from "react";
import Link from "next/link";
import { useSignup } from "./viewmodels/useSignup";
import { Loader } from "../../../components/view/loader";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Phone, ArrowRight, Home, CheckCircle2 } from "lucide-react";
import logo from "@/assets/logoorange.png";
import Image from "next/image";

const Signup = () => {
  const { role, userdata, errors, setRole, handleInputChange, handleSignup, loading } = useSignup();

  return (
    <div className="flex min-h-screen bg-white font-Montserrat">
      {loading && <Loader />}

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Cozy Interior"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/40 via-slate-900/80 to-slate-900" />

        <div className="relative z-10 w-full p-10 flex flex-col justify-between text-white">
          <div>
            <Image src={logo} alt="Logo" className="w-45 rounded-lg" />
          </div>

          <div className="space-y-8">
            <h1 className="text-5xl font-black leading-[1.1]">
              Join the <span className="text-orange-400">community</span> <br />
              of modern dwellers.
            </h1>
            <ul className="space-y-4">
              {["Verified listings only", "Zero-hassle digital contracts", "Instant communication with owners"].map(
                (text, i) => (
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    key={i}
                    className="flex items-center gap-3 text-slate-200 font-medium"
                  >
                    <CheckCircle2 className="text-orange-400 size-5" /> {text}
                  </motion.li>
                ),
              )}
            </ul>
          </div>

          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} ZIBMATE Inc. All rights reserved.</p>
        </div>
      </div>

      <div className="w-full max-h-screen lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-50">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 font-medium">Find your spot in the neighborhood today.</p>
          </div>

          <div className="flex p-1.5 bg-slate-200/50 rounded-2xl mb-6 relative">
            <motion.div
              animate={{ x: role === "owner" ? 0 : "100%" }}
              className="absolute top-1.5 left-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm z-0"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setRole("owner")}
              className={`relative z-10 flex-1 py-3 text-sm font-bold transition-colors ${role === "owner" ? "text-orange-600" : "text-slate-500"}`}
            >
              I'm an Owner
            </button>
            <button
              onClick={() => setRole("buyer")}
              className={`relative z-10 flex-1 py-3 text-sm font-bold transition-colors ${role === "buyer" ? "text-orange-600" : "text-slate-500"}`}
            >
              I'm a Guest
            </button>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={userdata.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-sm text-black placeholder-black"
                />
                {errors.firstName && (
                  <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold uppercase">{errors.firstName}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={userdata.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-sm text-black placeholder-black"
                />
                {errors.lastName && (
                  <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold uppercase">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userdata.email}
                onChange={handleInputChange}
                className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-sm text-black placeholder-black"
              />
              {errors.email && (
                <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold uppercase">{errors.email}</p>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Secure Password"
                    value={userdata.password}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-sm text-black placeholder-black"
                  />
                  {errors.password && (
                    <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold uppercase">{errors.password}</p>
                  )}
                </div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={userdata.phone}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-sm text-black placeholder-black"
                  />
                  {errors.phone && (
                    <p className="text-rose-500 text-[10px] mt-1 ml-2 font-bold uppercase">{errors.phone}</p>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleSignup}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? "Creating your account..." : "Get Started"}
                <ArrowRight className="size-5" />
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-slate-500 font-medium text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-600 font-black hover:underline decoration-2 underline-offset-4">
              Log in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
