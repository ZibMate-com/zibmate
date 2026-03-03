"use client";
import Link from "next/link";
import { Loader } from "../../../components/view/loader";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Phone, ArrowRight, Home, User } from "lucide-react";
import logo from "@/assets/logoorange.png";
import useLogin from "./viewmodels/uselogin";
import Image from "next/image";

export const Login = () => {
  const { role, setRole, errors, userCred, setUserCred, handleLogin, loading, isLoggedIn, handleGoogleSignIn } =
    useLogin();
  return (
    <div className="flex min-h-screen bg-white font-Montserrat">
      {loading && <Loader />}

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Modern Architecture"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 via-slate-900/40 to-transparent" />

        <div className="relative z-10 w-full p-16 flex flex-col justify-between text-white">
          <div>
            <Image src={logo} alt="Logo" className="w-45 rounded-lg" />
          </div>

          <div>
            <h1 className="text-6xl font-black leading-tight mb-6">
              Welcome back to <br />
              <span className="text-orange-400">Better Living.</span>
            </h1>
            <p className="text-xl text-slate-200 max-w-md leading-relaxed">
              Log in to manage your spaces or discover your next neighborhood favorite.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
            <span>Join 5,000+ happy residents</span>
            <div className="h-4 w-px bg-slate-500" />
            <span>Verified Listings</span>
          </div>
        </div>
      </div>

      <div className="w-full max-h-screen lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-50">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-black text-slate-900 mb-2">Hello Again!</h2>
            <p className="text-slate-500 font-medium">Let's get you into your account.</p>
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
              I'm a Buyer
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {role === "owner" ? (
                <motion.div
                  key="owner-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Work Email"
                      value={userCred.email}
                      onChange={(e) => setUserCred({ ...userCred, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-black placeholder-black"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={userCred.password}
                      onChange={(e) => setUserCred({ ...userCred, password: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-black placeholder-black"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="buyer-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative"
                >
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={userCred.phone}
                    onChange={(e) => setUserCred({ ...userCred, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-black placeholder-black"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleLogin}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? "Signing you in..." : "Continue"}
              <ArrowRight className="size-5" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Quick Connect</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-4 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl flex items-center justify-center gap-3 transition-all font-bold text-slate-700 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,19.034-8.159,19.611-18.917V20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.664,8.307,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.914-1.841,13.25-4.908l-6.643-4.898C29.622,34.02,26.963,35,24,35c-5.263,0-9.734-2.887-12.063-7.108l-6.848,5.326C9.522,39.73,16.299,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.002,0.001-0.003,0.002-0.005l6.848,5.326c-0.106,0.083-0.224,0.162-0.347,0.237C39.673,38.874,44,33.483,44,28C44,26.919,43.864,25.867,43.611,24.84V20.083z"
              />
            </svg>
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-slate-500 font-medium text-lg">
            Not part of the community yet?{" "}
            <Link
              href="/signup"
              className="text-orange-600 font-black hover:underline decoration-2 underline-offset-4 transition-all"
            >
              Join for free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
