import { motion } from "framer-motion";
import { MapPin, Users, Building2, Star } from "lucide-react";
import Link from "next/link";


export const FilteredPg = ({ filteredPg }) => {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {filteredPg.map((pg) => {
        // Parse JSON fields if they're strings
        const occupancy = typeof pg.occupancy === 'string' 
          ? JSON.parse(pg.occupancy) 
          : pg.occupancy;
        
        const prices = typeof pg.prices === 'string' 
          ? JSON.parse(pg.prices) 
          : pg.prices;
        
        const images = typeof pg.images === 'string' 
          ? JSON.parse(pg.images) 
          : pg.images;

        // Get the lowest price from the prices object
        const lowestPrice = prices ? Math.min(...Object.values(prices)) : 0;
        
        // Get occupancy display text
        const occupancyText = occupancy && occupancy.length > 0 
          ? occupancy.join(', ') 
          : 'N/A';

        return (
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
                src={images && images.length > 0 ? images[0] : '/placeholder-pg.jpg'}
                alt={pg.property_name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="p-5">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {pg.property_name}
                </h2>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-orange-500" />{pg.street}, {pg.city} ,{pg.state}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-black text-slate-900">
                    ₹{lowestPrice - (pg.discount || 0)}
                  </span>
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
                  <Users className="h-3 w-3 mr-1" /> {occupancyText}
                </div>
                <div className="flex items-center bg-slate-50 px-2 py-1 rounded-md text-[11px] font-medium text-slate-600">
                  <Building2 className="h-3 w-3 mr-1" /> {pg.looking_for || pg.lookingFor || 'Any'}
                </div>
              </div>

              {/* CTA Button */}
              <Link href={ `/findpg/${pg.id}`}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3.5 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-slate-200 group-hover:bg-orange-600 group-hover:shadow-orange-200 transition-all duration-300"
                >
                  View Details
                </motion.button>
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};