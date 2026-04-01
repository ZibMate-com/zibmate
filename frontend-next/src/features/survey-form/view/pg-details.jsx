import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const SurveySectionTwo = ({ formData, handleChange, errors, onNext, onBack }) => {
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
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">PG Details</h2>
            <p className="text-gray-500 mt-2">Help us understand your current living standards.</p>
          </div>
          <span className="text-orange-600 font-bold bg-orange-50 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            Step 2 / 4
          </span>
        </div>

        <form className="space-y-10">
          {/* Room Type */}
          <section>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              What type of room do you live in?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Single", "Double sharing", "Triple or more"].map((type) => (
                <label key={type} className="group relative cursor-pointer">
                  <input
                    type="radio"
                    name="roomType"
                    value={type}
                    className="sr-only"
                    onChange={(e) => handleChange("pg_details", e)} // ✅ fixed
                  />
                  <div
                    className={`p-4 text-center rounded-2xl border-2 transition-all duration-200 ${
                      formData.pg_details.roomType === type // ✅ fixed
                        ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100"
                        : errors?.pg_details?.roomType
                          ? "border-red-200 bg-red-50/20"
                          : "border-gray-100 bg-gray-50/50 hover:border-orange-200 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`text-sm font-semibold ${
                        formData.pg_details.roomType === type ? "text-orange-700" : "text-gray-600"
                      }`}
                    >
                      {type}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            <ErrorMsg msg={errors?.pg_details?.roomType} />
          </section>

          {/* Monthly Rent */}
          <section>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              Monthly Rent (Approx)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["< ₹5,000", "₹5,000–₹8,000", "₹8,000–₹12,000", "₹12,000+"].map((range) => (
                <label
                  key={range}
                  className={`flex items-center p-4 rounded-xl border cursor-pointer hover:bg-white hover:shadow-sm transition-all ${
                    formData.pg_details.monthlyRent === range
                      ? "border-orange-500 bg-white"
                      : errors?.pg_details?.monthlyRent
                        ? "border-red-200 bg-red-50/20"
                        : "border-gray-100 bg-gray-50/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="monthlyRent"
                    value={range}
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    onChange={(e) => handleChange("pg_details", e)} // ✅ fixed
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">{range}</span>
                </label>
              ))}
            </div>
            <ErrorMsg msg={errors?.pg_details?.monthlyRent} />
          </section>

          {/* Food Quality */}
          <section>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">
              How's the food quality?
            </label>
            <textarea
              name="foodQuality"
              rows="3"
              value={formData.pg_details.foodQuality}
              placeholder="E.g. Variety is good, but dinner is often late..."
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 transition-all placeholder:text-gray-400"
              onChange={(e) => handleChange("pg_details", e)} // ✅ fixed
            />
            {/* optional field — no error */}
          </section>

          {/* Referral Source */}
          <section>
            <label className="block text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
              How did you find your PG?
            </label>
            <div className="space-y-2">
              {[
                "Broker",
                "Friend / reference",
                "Google / online",
                "Walking / offline search",
                "Facebook / WhatsApp groups",
                "Other",
              ].map((source) => (
                <div key={source} className="flex flex-col">
                  <label className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                    <input
                      type="radio"
                      name="referralSource"
                      value={source}
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                      onChange={(e) => handleChange("pg_details", e)} // ✅ fixed
                    />
                    <span className="ml-4 text-sm font-medium text-gray-600 group-hover:text-gray-900">{source}</span>
                  </label>

                  <AnimatePresence>
                    {source === "Other" && formData.pg_details.referralSource === "Other" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-8 overflow-hidden"
                      >
                        <input
                          type="text"
                          name="otherSource"
                          placeholder="Tell us how..."
                          className="w-full py-2 mb-4 border-b-2 border-orange-500 bg-transparent focus:outline-none text-sm font-medium"
                          onChange={(e) => handleChange("pg_details", e)} // ✅ fixed
                          autoFocus
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <ErrorMsg msg={errors?.pg_details?.referralSource} />
          </section>

          {/* Navigation */}
          <footer className="pt-8 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={onBack}
              type="button"
              className="text-gray-400 hover:text-gray-600 text-sm font-bold uppercase tracking-widest transition-colors"
            >
              Back
            </button>
            <button
              onClick={onNext}
              type="button"
              className="px-12 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-95"
            >
              Continue
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default SurveySectionTwo;
