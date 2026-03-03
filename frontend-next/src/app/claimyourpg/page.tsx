"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Zap,
  BarChart3,
  BellRing,
  Shield,
  CheckCircle2,
  X,
} from "lucide-react";

export default function ClaimPropertyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    state: "",
  });

  const features = [
    { icon: <Zap className="text-orange-500" size={20} />, text: "Real-time Vacancy Tracking" },
    { icon: <BarChart3 className="text-orange-500" size={20} />, text: "Automated Rent Collection" },
    { icon: <BellRing className="text-orange-500" size={20} />, text: "Instant Tenant Reminders" },
    { icon: <Shield className="text-orange-500" size={20} />, text: "Secure Agreement Storage" },
  ];

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim() || !nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Please enter a valid name (min 3 characters)";
    }
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state) {
      newErrors.state = "Please select a state";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("zibmate_token"); // Simplification for migration
      if (!token) throw new Error("Authentication required");

      const response = await fetch(`/api/requests/owner/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      console.log("Request submitted successfully:", data);
      setIsSubmitted(true);

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        state: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);

      toast.error(error.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Success Popup Overlay */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-green-600" size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">Request Received!</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Thank you for choosing Zibmate. Our verification team will contact you shortly to set up your
                  dashboard.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full mt-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-95"
                >
                  Got it, thanks!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Form Container */}
      <div className="max-w-6xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Side: Marketing */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black p-12 text-white flex flex-col justify-between">
          <div>
            <div className="inline-block bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-orange-500/30">
              FOR PROPERTY OWNERS
            </div>
            <h1 className="text-5xl font-black leading-tight mb-6 tracking-tight">
              Manage smarter.
              <br />
              Earn better.
            </h1>

            <div className="space-y-4 mb-12">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10"
                >
                  {f.icon}
                  <span className="font-semibold">{f.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
            <p className="text-sm text-orange-300 font-bold mb-2">Performance Insight</p>
            <p className="text-white/90 italic leading-relaxed">
              "Since using Zibmate, my vacancy rate dropped by 40% in just two months."
            </p>
            <p className="text-white/60 text-sm mt-3">— Happy Owner from Gurugram</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-orange-600 mb-3">
              <ShieldCheck size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">Secure & Verified</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">Verify Ownership</h2>
            <p className="text-slate-500">Get access to your personalized dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full pl-12 pr-4 h-14 rounded-2xl border-2 ${
                    errors.fullName ? "border-red-500" : "border-slate-200"
                  } focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium`}
                />
              </div>
              {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 h-14 rounded-2xl border-2 ${
                    errors.email ? "border-red-500" : "border-slate-200"
                  } focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
              <div className="flex gap-2">
                <div className="w-20 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-bold text-slate-600">
                  +91
                </div>
                <div className="relative flex-1">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full pl-12 pr-4 h-14 rounded-2xl border-2 ${
                      errors.phone ? "border-red-500" : "border-slate-200"
                    } focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium`}
                  />
                </div>
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Bangalore"
                  className={`w-full pl-12 pr-4 h-14 rounded-2xl border-2 ${
                    errors.city ? "border-red-500" : "border-slate-200"
                  } focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium`}
                />
              </div>
              {errors.city && <p className="text-red-500 text-xs mt-1 ml-1">{errors.city}</p>}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-4 h-14 rounded-2xl border-2 ${
                  errors.state ? "border-red-500" : "border-slate-200"
                } focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-medium appearance-none bg-white cursor-pointer`}
              >
                <option value="">Select your state</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1 ml-1">{errors.state}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-14 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 active:scale-95 shadow-orange-200"
              } text-white`}
            >
              {loading ? (
                "Submitting..."
              ) : (
                <>
                  Verify & Access Dashboard <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-6">
            By submitting, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
