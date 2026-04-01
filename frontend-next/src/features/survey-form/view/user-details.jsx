import React from "react";
import { motion } from "framer-motion";

const SurveySectionOne = ({ formData, handleChange, errors, onNext }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // reusable error message component
  const ErrorMsg = ({ msg }) =>
    msg ? (
      <p className="mt-1.5 text-xs font-semibold text-red-500 flex items-center gap-1">
        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {msg}
      </p>
    ) : null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600 w-full" />

      <div className="p-8 md:p-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Basic Details</h2>
          <p className="text-gray-500 mt-2">Let's start with a bit about you and your journey.</p>
        </header>

        <motion.form variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Full Name */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.basic_details.fullName}
              onChange={(e) => handleChange("basic_details", e)}
              className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 focus:bg-white focus:ring-0 transition-all placeholder:text-gray-300 shadow-inner ${
                errors?.basic_details?.fullName
                  ? "border-red-300 focus:border-red-400"
                  : "border-transparent focus:border-orange-500"
              }`}
            />
            <ErrorMsg msg={errors?.basic_details?.fullName} />
          </motion.div>

          {/* Email & Phone */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="john@nexus.com"
                value={formData.basic_details.email}
                onChange={(e) => handleChange("basic_details", e)}
                className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 focus:bg-white focus:ring-0 transition-all ${
                  errors?.basic_details?.email
                    ? "border-red-300 focus:border-red-400"
                    : "border-transparent focus:border-orange-500"
                }`}
              />
              <ErrorMsg msg={errors?.basic_details?.email} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 00000 00000"
                value={formData.basic_details.phone}
                onChange={(e) => handleChange("basic_details", e)}
                className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 focus:bg-white focus:ring-0 transition-all ${
                  errors?.basic_details?.phone
                    ? "border-red-300 focus:border-red-400"
                    : "border-transparent focus:border-orange-500"
                }`}
              />
              <ErrorMsg msg={errors?.basic_details?.phone} />
            </div>
          </motion.div>

          {/* Status */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              Current Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Student", "Professional", "Intern", "Other"].map((option) => (
                <label key={option} className="relative cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    value={option}
                    className="sr-only"
                    onChange={(e) => handleChange("basic_details", e)}
                  />
                  <div
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${
                      formData.basic_details.status === option
                        ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100"
                        : errors?.basic_details?.status
                          ? "border-red-200 bg-red-50/20 hover:bg-white"
                          : "border-gray-50 bg-gray-50/50 hover:bg-white hover:border-gray-200"
                    }`}
                  >
                    <span
                      className={`text-sm font-bold ${
                        formData.basic_details.status === option ? "text-orange-700" : "text-gray-500"
                      }`}
                    >
                      {option}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            {/* ✅ error shown once below the grid, not inside each card */}
            <ErrorMsg msg={errors?.basic_details?.status} />
          </motion.div>

          {/* City & Duration */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                Current City
              </label>
              <input
                type="text"
                name="city"
                placeholder="e.g. Bangalore"
                value={formData.basic_details.city}
                onChange={(e) => handleChange("basic_details", e)}
                className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 focus:bg-white focus:ring-0 transition-all ${
                  errors?.basic_details?.city
                    ? "border-red-300 focus:border-red-400"
                    : "border-transparent focus:border-orange-500"
                }`}
              />
              <ErrorMsg msg={errors?.basic_details?.city} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-2">
                Stay Duration
              </label>
              <div className="relative">
                <select
                  name="stayDuration"
                  value={formData.basic_details.stayDuration}
                  onChange={(e) => handleChange("basic_details", e)}
                  className={`w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 focus:bg-white focus:ring-0 transition-all appearance-none cursor-pointer ${
                    errors?.basic_details?.stayDuration
                      ? "border-red-300 focus:border-red-400"
                      : "border-transparent focus:border-orange-500"
                  }`}
                >
                  <option value="">Select duration</option>
                  <option value="< 1 month">&lt; 1 month</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <ErrorMsg msg={errors?.basic_details?.stayDuration} />
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer variants={itemVariants} className="pt-8 border-t border-gray-100 flex justify-end">
            <button
              onClick={onNext}
              type="button"
              className="group px-12 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-xl shadow-orange-200 transition-all flex items-center gap-2"
            >
              Start Survey
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.footer>
        </motion.form>
      </div>
    </div>
  );
};

export default SurveySectionOne;
