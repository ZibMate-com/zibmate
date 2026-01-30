"use client";
import { useState, useEffect } from "react";

import MotionSection from "../../../components/view/motionComponents";
import { motion } from "framer-motion";
import { MapPin, Users, Building2, Tag, Star } from "lucide-react";
import Link from "next/link";

export const Toplistsection = () => {
  const [topPgs, setTopPgs] = useState([]);

  useEffect(() => {
    const fetchTopPgs = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await fetch(`${baseUrl}/api/pg/top`, {
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to fetch top PGs');
        const data = await response.json();
        setTopPgs(data);
      } catch (error) {
        console.error("Error fetching top PGs:", error);
      }
    };
    fetchTopPgs();
  }, []);
  return (
    <MotionSection className="w-full py-12 px-4 md:px-10 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Exclusive Selection</span>
            <h1 className="font-extrabold text-slate-900 text-3xl md:text-5xl mt-2">
              Handpicked for you <br /> <span className="text-blue-600">in your location</span>
            </h1>
          </div>
          <Link href="/findpg" className="hidden md:block">
            <button className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View all properties &rarr;
            </button>
          </Link>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topPgs.map((pg) => (
            <motion.div
              key={pg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden">
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-orange-400 text-orange-400" /> 4.8
                  </span>
                </div>
                {pg.discount > 0 && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      OFFER
                    </span>
                  </div>
                )}
                <motion.img
                  src={pg.images[0]}
                  alt={pg.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Section */}
              <div className="p-5">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {pg.name}
                  </h2>
                  <div className="flex items-center text-sm text-gray-400 mt-1">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-orange-500" /> {pg.location}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-black text-slate-900">₹{pg.price - pg.discount}</span>
                    <span className="text-xs text-gray-400 ml-1">/mo</span>
                  </div>
                  {pg.discount > 0 && (
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-1 rounded-md uppercase">
                      Save ₹{pg.discount}
                    </span>
                  )}
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md text-[11px] font-medium text-slate-600">
                    <Users className="h-3 w-3 mr-1" /> {pg.occupancy}
                  </div>
                  <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md text-[11px] font-medium text-slate-600">
                    <Building2 className="h-3 w-3 mr-1" /> {pg.lookingFor}
                  </div>
                </div>

                {/* CTA Button */}
                <Link href={`/findpg/${pg.id}`}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3.5 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-slate-200 group-hover:bg-orange-600 group-hover:shadow-orange-200 transition-all duration-300"
                  >
                    View Details
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="w-full text-center mt-16">
          <Link href="/findpg">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-900 text-lg font-bold hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-gray-100"
            >
              Explore All Listings
            </motion.button>
          </Link>
        </div>
      </div>
    </MotionSection>
  );
};