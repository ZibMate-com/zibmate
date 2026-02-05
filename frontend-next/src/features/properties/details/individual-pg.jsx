"use client";
import {
  Bed,
  Wifi,
  Feather,
  Shirt,
  Bath,
  Utensils,
  Shield,
  Heart,
  Home,
  MapPin,
  CheckCircle,
  Phone,
} from "lucide-react";
import toast from "react-hot-toast";
import { BookingButton } from "./views/booking-form";
import { useParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import Mycontext from "../../../context/mycontext";
import { Loader } from "../../../components/view/loader";
import { motion } from "framer-motion";
import { CallBackModal } from "./views/callback";

export const IndividualPg = () => {
  const { loading, setloading } = useContext(Mycontext);
  const { id } = useParams();
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    images: [],
    price: "",
    discount: "",
    address: "",
    locationLink: "",
    occupancy: "",
    lookingFor: "",
    facilities: [],
    prices: {},
  });

  // Dynamic pricing plans based on product.prices
  const pricingPlans =
    Object.keys(product.prices).length > 0
      ? Object.entries(product.prices).map(([name, price], index) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          price: price,
          desc: `${name} Occupancy`,
          icon: Bed,
          featured: index === 0,
        }))
      : [
          // Fallback if no specific prices found but we have a base price
          {
            name: "Standard Room",
            price: product.price || "N/A",
            desc: "Standard occupancy",
            icon: Bed,
            featured: true,
          },
        ];

  useEffect(() => {
    async function fetchProduct() {
      setloading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${baseUrl}/api/pg/${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch PG details");
        const data = await response.json();

        // Map backend keys to frontend expectations
        setProduct({
          ...data,
          locationLink: data.location_link || data.locationLink,
          lookingFor: data.looking_for || data.lookingFor,
          docId: data.id,
          address: data.location,
          prices: data.prices || {},
          // Ensure arrays where arrays are expected
          facilities: Array.isArray(data.facilities) ? data.facilities : [],
        });
      } catch (err) {
        console.error("Error fetching PG details:", err);
        toast.error("Failed to load property details.");
      } finally {
        setloading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  const handleBooking = () => {
    localStorage.setItem("BookingDetails", JSON.stringify(product));
  };

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen bg-[#f8fafc] pb-20">
      <CallBackModal isOpen={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} pgName={product.name} />

      {/* Header Area */}
      <div className="bg-white border-b border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Zero Brokerage
                </span>
                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="size-3" /> Verified Property
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-3 text-slate-500">
                <MapPin className="size-5 text-orange-500" />
                <span className="text-lg">{product.address}</span>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-right">
              <p className="text-sm text-slate-500 font-medium italic">Monthly starts at</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">₹{product.price}</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Modern Bento Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-125 mb-12">
          <div className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden group relative">
            <img
              src={product.images[0] || "/assets/pgimage1.png"}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              alt="Main"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-300"></div>
          </div>
          <div className="hidden md:block md:col-span-1 rounded-3xl overflow-hidden group relative">
            <img
              src={product.images[1] || product.images[0] || "/assets/pgimage1.png"}
              className="w-full h-full object-cover group-hover:scale-105 transition"
              alt="Room"
            />
          </div>
          <div className="hidden md:block md:col-span-1 rounded-3xl overflow-hidden group relative">
            <img
              src={product.images[2] || product.images[0] || "/assets/pgimage1.png"}
              className="w-full h-full object-cover group-hover:scale-105 transition"
              alt="Interior"
            />
          </div>
          <div className="hidden md:block md:col-span-2 rounded-3xl overflow-hidden group relative">
            <img
              src={product.images[3] || product.images[0] || "/assets/pgimage1.png"}
              className="w-full h-full object-cover group-hover:scale-105 transition"
              alt="View"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
              <button className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg">
                View All Photos
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Pricing Section */}
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-orange-500 rounded-full"></span> Choosing Your Stay
              </h3>
              <div className="grid gap-4">
                {pricingPlans.map((plan, i) => (
                  <motion.div
                    whileHover={{ x: 10 }}
                    key={i}
                    className={`p-6 rounded-3xl border-2 flex flex-col md:flex-row justify-between items-center transition-all ${plan.featured ? "border-orange-500 bg-orange-50/30" : "border-slate-100 bg-white"}`}
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`p-4 rounded-2xl ${plan.featured ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        <plan.icon size={28} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{plan.name}</h4>
                        <p className="text-slate-500 text-sm">{plan.desc}</p>
                      </div>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                      <p className="text-2xl font-black text-slate-900">₹{plan.price}</p>
                      <button className="text-orange-600 font-bold hover:underline transition">Select Plan</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Amenities Grid */}
            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">What this place offers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {product.facilities.length > 0 ? (
                  product.facilities.map((item, idx) => {
                    // Simple mapping or fallback
                    let IconComponent = Wifi;
                    if (["food", "mess", "dining"].some((k) => item.toLowerCase().includes(k)))
                      IconComponent = Utensils;
                    else if (["laundry", "washing"].some((k) => item.toLowerCase().includes(k))) IconComponent = Shirt;
                    else if (["ac", "cooling"].some((k) => item.toLowerCase().includes(k))) IconComponent = Feather;
                    else if (["security", "cctv"].some((k) => item.toLowerCase().includes(k))) IconComponent = Shield;
                    else if (["clean", "bath", "toilet"].some((k) => item.toLowerCase().includes(k)))
                      IconComponent = Bath;

                    return (
                      <div key={idx} className="flex flex-col items-center text-center gap-3">
                        <div className="p-4 bg-orange-50 rounded-2xl text-orange-500">
                          <IconComponent size={24} />
                        </div>
                        <span className="font-semibold text-slate-700">{item}</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-500">No specific facilities listed.</p>
                )}
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">About the Property</h3>
              <p className="text-slate-600 leading-relaxed text-lg italic bg-white p-8 rounded-4xl border-l-4 border-orange-500">
                "{product.description}"
              </p>
            </section>

            <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="">
                {/* Owner Image & Badge */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <div className="size-24 md:size-32 rounded-full overflow-hidden border-4 border-orange-100 shadow-lg">
                      {/* <img
                                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" // Or product.ownerImage
                                            alt="Property Owner"
                                            className="w-full h-full object-cover bg-orange-50"
                                        /> */}
                    </div>
                    <div className="absolute -bottom-2 right-2 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white">
                      <Shield className="size-4" fill="currentColor" />
                    </div>
                  </div>

                  {/* Owner Details */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900">
                        Hosted by{" "}
                        {product.first_name ? `${product.first_name} ${product.last_name || ""}` : "Property Owner"}
                      </h3>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit mx-auto md:mx-0">
                        ID VERIFIED
                      </span>
                    </div>
                    <p className="text-slate-500 mb-4 line-clamp-2">
                      "I take pride in maintaining a clean, quiet, and friendly environment for students and
                      professionals. My goal is to make you feel at home while providing top-notch facilities."
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-slate-50 p-3 rounded-xl">
                        <p className="text-slate-400">Response Rate</p>
                        <p className="font-bold text-slate-800">100%</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl">
                        <p className="text-slate-400">Response Time</p>
                        <p className="font-bold text-slate-800">Within an hour</p>
                      </div>
                      <div className="hidden md:block bg-slate-50 p-3 rounded-xl">
                        <p className="text-slate-400">Member Since</p>
                        <p className="font-bold text-slate-800">Aug 2023</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Action Button */}
                <div className="w-full md:w-auto mt-5 flex justify-end">
                  <button
                    onClick={() => setIsCallModalOpen(true)}
                    className="w-full md:w-auto px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-orange-500 hover:text-orange-500 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="size-4" /> Request Call Back
                  </button>
                </div>
              </div>
            </section>
            {/* Map */}
            <section className="h-96 w-full rounded-[2.5rem] overflow-hidden shadow-inner border-4 border-white">
              <iframe
                title="Map"
                className="w-full h-full grayscale-[0.3]"
                src={product.locationLink}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </section>
          </div>

          {/* Right Column: Sticky Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="p-6">
                <BookingButton handleBooking={handleBooking} />
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 p-4 border border-dashed border-slate-300 rounded-2xl">
                <Shield className="text-green-500" />
                <span className="text-sm font-medium text-slate-500">Secure Payment & Verified Listing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
