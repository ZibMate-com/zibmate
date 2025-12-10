import React, { use, useRef,useState } from "react";
import { Button } from "@/components/ui/button";
import { PgData } from "./pglist";
import { MapPin, Users, Tag, Building2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { NavLink } from "react-router-dom";
const PgCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {PgData.map((pg) => (
        <motion.div
          key={pg.id}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition" >
            <motion.div className="h-48 w-full overflow-hidden">
              <motion.img
                src={pg.images[0]}
                alt={pg.name}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            <div className="p-4 space-y-3">
              <div>
                <h2 className="text-lg font-semibold line-clamp-1">{pg.name}</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" /> {pg.location}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-gray-800">
                  ₹{pg.price - pg.discount}
                </p>
                {pg.discount > 0 && (
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                    Save ₹{pg.discount}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <span className="flex items-center"><Users className="h-4 w-4 mr-1" /> {pg.occupancy}</span>
                <span className="flex items-center"><Building2 className="h-4 w-4 mr-1" /> {pg.lookingFor}</span>
                <span className="flex items-center col-span-2">
                  <Tag className="h-4 w-4 mr-1" /> {pg.facilities.join(", ")}
                </span>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavLink to={`/findpg/${pg.docId}`}>
                <Button className="w-full mt-2 rounded-xl">View Details</Button>
                </NavLink>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PgCards;
// import { Button } from "@/components/ui/button";
// import { PgData } from "./pglist";
// import { MapPin, Users, Tag, Building2 } from "lucide-react";
// import { motion, useInView } from "framer-motion";

// const PgCards = () => {
 
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {PgData.map((pg) => (
//         <motion.div
//           key={pg.id}
//           whileTap={{ scale: 0.98 }}
//           transition={{ type: "spring", stiffness: 200, damping: 15 }}
//         >
//           <div className="rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition" >
//             <motion.div className="h-48 w-full overflow-hidden">
//               <motion.img
//                 src={pg.images[0]}
//                 alt={pg.name}
//                 className="h-full w-full object-cover"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ duration: 0.4 }}
//               />
//             </motion.div>

//             <div className="p-4 space-y-3">
//               <div>
//                 <h2 className="text-lg font-semibold line-clamp-1">{pg.name}</h2>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <MapPin className="h-4 w-4 mr-1" /> {pg.location}
//                 </div>
//               </div>
//               <div className="flex justify-between items-center">
//                 <p className="text-xl font-bold text-gray-800">
//                   ₹{pg.price - pg.discount}
//                 </p>
//                 {pg.discount > 0 && (
//                   <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-lg">
//                     Save ₹{pg.discount}
//                   </span>
//                 )}
//               </div>

//               <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
//                 <span className="flex items-center"><Users className="h-4 w-4 mr-1" /> {pg.occupancy}</span>
//                 <span className="flex items-center"><Building2 className="h-4 w-4 mr-1" /> {pg.lookingFor}</span>
//                 <span className="flex items-center col-span-2">
//                   <Tag className="h-4 w-4 mr-1" /> {pg.facilities.join(", ")}
//                 </span>
//               </div>

//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Button className="w-full mt-2 rounded-xl">View Details</Button>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default PgCards;