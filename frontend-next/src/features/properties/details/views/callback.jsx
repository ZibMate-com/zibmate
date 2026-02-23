"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, Mail, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const CallBackModal = ({ isOpen, onClose, pgName, pgId }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get user token (check if user is logged in)
      const userToken = localStorage.getItem("zibmate_token") || localStorage.getItem("zibmate_userToken");

      if (!userToken) {
        toast.error("Please login to request a callback");
        setLoading(false);
        // Optionally redirect to login
        // router.push("/login");
        return;
      }

      const payload = {
        pg_id: pgId,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
      };


      const response = await fetch("/api/requests/tenant/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }
      
      // Show success state
      setSubmitted(true);
      toast.success("Callback request sent successfully!");

      // Reset form and close modal after delay
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          full_name: "",
          email: "",
          phone: "",
        });
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Callback request error:", error);
      toast.error(error.message || "Failed to submit callback request");
    } finally {
      setLoading(false);
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
    });
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
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
                  <button 
                    onClick={handleClose} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="size-5 text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input
                        required
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit phone number"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-black"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request <Send className="size-4" />
                      </>
                    )}
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