import { Bed, Wifi, Feather, Shirt, Bath, Utensils, Shield, Heart, Home, MapPin, CheckCircle, Phone, Dumbbell, Snowflake, Power, PowerCircle, ZapIcon, X, ChevronLeft, ChevronRight } from "lucide-react"
import { BookingButton } from "./views/booking-form";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Mycontext from "../../../context/mycontext";
import { Loader } from "../../../components/view/loader";
import { motion, AnimatePresence } from "framer-motion";
import { CallBackModal } from "./views/callback";

export const IndividualPg = () => {
    const { loading, setloading } = useContext(Mycontext);
    const { id } = useParams();
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [product, setProduct] = useState({
        property_name: "",
        description: "",
        images: [],
        prices: {},
        discount: 0,
        city: "",
        state: "",
        street: "",
        house_number: "",
        landmark: "",
        maplink: "",
        occupancy: [],
        looking_for: "",
        facilities: [],
        owner_phone: "",
        owner_name: "",
    });

    useEffect(() => {
        async function fetchProduct() {
            setloading(true);
            try {
                const baseUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${baseUrl}/api/pg/${id}`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) throw new Error('Failed to fetch PG details');
                const data = await response.json();

                // Parse JSON fields
                const parsedOccupancy = typeof data.occupancy === 'string' 
                    ? JSON.parse(data.occupancy) 
                    : data.occupancy || [];
                
                const parsedPrices = typeof data.prices === 'string' 
                    ? JSON.parse(data.prices) 
                    : data.prices || {};
                
                const parsedFacilities = typeof data.facilities === 'string' 
                    ? JSON.parse(data.facilities) 
                    : data.facilities || [];

                const parsedImages = typeof data.images === 'string'
                    ? JSON.parse(data.images)
                    : data.images || [];

                setProduct({
                    ...data,
                    occupancy: parsedOccupancy,
                    prices: parsedPrices,
                    facilities: parsedFacilities,
                    images: parsedImages,
                    discount: Number(data.discount) || 0,
                });
            } catch (err) {
                console.error("Error fetching PG details:", err);
            } finally {
                setloading(false);
            }
        }

        if (id) fetchProduct();
    }, [id]);

    // Gallery navigation functions
    const openGallery = (index = 0) => {
        setCurrentImageIndex(index);
        setIsGalleryOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    };

    const closeGallery = () => {
        setIsGalleryOpen(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isGalleryOpen) return;
            
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isGalleryOpen, currentImageIndex]);

    // Get pricing plans from the prices object
    const pricingPlans = Object.entries(product.prices).map(([type, price]) => ({
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Occupancy`,
        price: Number(price),
        desc: `${type} sharing room`,
        icon: Bed,
        featured: type.toLowerCase() === 'single'
    }));

    // Get lowest price for display
    const lowestPrice = Object.values(product.prices).length > 0 
        ? Math.min(...Object.values(product.prices).map(Number))
        : 0;

    // Format address
    const fullAddress = [
        product.house_number,
        product.street,
        product.landmark,
        product.city,
        product.state,
        product.zip
    ].filter(Boolean).join(', ');

    const handleBooking = () => {
        localStorage.setItem('BookingDetails', JSON.stringify(product));
    }

    if (loading) return <Loader />;

    return (
        <section className="min-h-screen bg-[#f8fafc] pb-20">
            <CallBackModal
                isOpen={isCallModalOpen}
                onClose={() => setIsCallModalOpen(false)}
                pgName={product.property_name}
            />

            {/* Photo Gallery Modal */}
            <AnimatePresence>
                {isGalleryOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                        onClick={closeGallery}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeGallery}
                            className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                        >
                            <X size={32} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute top-4 left-4 z-50 bg-black/50 text-white px-4 py-2 rounded-full font-medium">
                            {currentImageIndex + 1} / {product.images.length}
                        </div>

                        {/* Main Image */}
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center px-20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={product.images[currentImageIndex]}
                                alt={`${product.property_name} - Image ${currentImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                            />
                        </motion.div>

                        {/* Navigation Buttons */}
                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        prevImage();
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        nextImage();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </>
                        )}

                        {/* Thumbnail Strip */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-xl px-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(idx);
                                    }}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        idx === currentImageIndex 
                                            ? 'border-white scale-110' 
                                            : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header Area */}
            <div className="bg-white border-b border-gray-200 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Zero Brokerage</span>
                                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <CheckCircle className="size-3" /> Verified Property
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{product.property_name}</h1>
                            <div className="flex items-center gap-2 mt-3 text-slate-500">
                                <MapPin className="size-5 text-orange-500" />
                                <span className="text-lg">{fullAddress}</span>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-right">
                            <p className="text-sm text-slate-500 font-medium italic">Monthly starts at</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-slate-900">₹{lowestPrice}</span>
                                <span className="text-slate-500 font-medium">/mo</span>
                            </div>
                            {product.discount > 0 && (
                                <p className="text-xs text-green-600 font-bold mt-1">
                                    Save ₹{product.discount}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Modern Bento Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-125 mb-12">
                    <div 
                        onClick={() => openGallery(0)}
                        className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden group relative cursor-pointer"
                    >
                        <img 
                            src={product.images[0] || '/placeholder-pg.jpg'} 
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                            alt="Main" 
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300"></div>
                    </div>
                    <div 
                        onClick={() => openGallery(1)}
                        className="hidden md:block md:col-span-1 rounded-3xl overflow-hidden group relative cursor-pointer"
                    >
                        <img 
                            src={product.images[1] || product.images[0] || '/placeholder-pg.jpg'} 
                            className="w-full h-full object-cover group-hover:scale-105 transition" 
                            alt="Room" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
                    </div>
                    <div 
                        onClick={() => openGallery(2)}
                        className="hidden md:block md:col-span-1 rounded-3xl overflow-hidden group relative cursor-pointer"
                    >
                        <img 
                            src={product.images[2] || product.images[0] || '/placeholder-pg.jpg'} 
                            className="w-full h-full object-cover group-hover:scale-105 transition" 
                            alt="Interior" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
                    </div>
                    <div 
                        onClick={() => openGallery(3)}
                        className="hidden md:block md:col-span-2 rounded-3xl overflow-hidden group relative cursor-pointer"
                    >
                        <img 
                            src={product.images[3] || product.images[0] || '/placeholder-pg.jpg'} 
                            className="w-full h-full object-cover group-hover:scale-105 transition" 
                            alt="View" 
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                            <button className="bg-white text-black px-6 py-2 rounded-full font-bold shadow-lg">
                                View All {product.images.length} Photos
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
                            {pricingPlans.length > 0 ? (
                                <div className="grid gap-4">
                                    {pricingPlans.map((plan, i) => (
                                        <motion.div
                                            whileHover={{ x: 10 }}
                                            key={i}
                                            className={`p-6 rounded-3xl border-2 flex flex-col md:flex-row justify-between items-center transition-all ${plan.featured ? 'border-orange-500 bg-orange-50/30' : 'border-slate-100 bg-white'}`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`p-4 rounded-2xl ${plan.featured ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                    <plan.icon size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-slate-900">{plan.name}</h4>
                                                    <p className="text-slate-500 text-sm">{plan.desc}</p>
                                                </div>
                                            </div>
                                            <div className="text-right mt-4 md:mt-0">
                                                <p className="text-2xl font-black text-slate-900">
                                                    ₹{plan.price - product.discount}
                                                </p>
                                                {product.discount > 0 && (
                                                    <p className="text-xs text-slate-400 line-through">₹{plan.price}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500">No pricing information available</p>
                            )}
                        </section>

                        {/* Amenities Grid */}
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8">What this place offers</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                                {product.facilities.length > 0 ? product.facilities.map((item, idx) => {
                                    let IconComponent = Wifi;
                                    const itemLower = item.toLowerCase();
                                    
                                    if (['food', 'mess', 'dining'].some(k => itemLower.includes(k))) IconComponent = Utensils;
                                    else if (['laundry', 'washing'].some(k => itemLower.includes(k))) IconComponent = Shirt;
                                    else if (['ac', 'cooling', 'air conditioning'].some(k => itemLower.includes(k))) IconComponent = Snowflake;
                                    else if (['security', 'cctv'].some(k => itemLower.includes(k))) IconComponent = Shield;
                                    else if (['clean', 'bath', 'toilet'].some(k => itemLower.includes(k))) IconComponent = Bath;
                                    else if(['gym', 'fitness'].some(k => itemLower.includes(k))) IconComponent = Dumbbell;
                                    else if(['power', 'backup'].some(k => itemLower.includes(k))) IconComponent = ZapIcon;
                                    else if(['refrigerator', 'fridge'].some(k => itemLower.includes(k))) IconComponent = Home;
                                    
                                    return (
                                        <div key={idx} className="flex flex-col items-center text-center gap-3">
                                            <div className="p-4 bg-orange-50 rounded-2xl text-orange-500">
                                                <IconComponent size={24} />
                                            </div>
                                            <span className="font-semibold text-slate-700">{item}</span>
                                        </div>
                                    );
                                }) : (
                                    <p className="text-slate-500">No specific facilities listed.</p>
                                )}
                            </div>
                        </section>

                        {/* Description */}
                        <section>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">About the Property</h3>
                            <p className="text-slate-600 leading-relaxed text-lg italic bg-white p-8 rounded-4xl border-l-4 border-orange-500">
                                "{product.description || 'No description available'}"
                            </p>
                        </section>

                        {/* Owner Section */}
                        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                            <div className="">
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="relative">
                                        <div className="size-24 md:size-32 rounded-full overflow-hidden border-4 border-orange-100 shadow-lg bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center">
                                            <span className="text-4xl font-bold text-white">
                                                {product.owner_name ? product.owner_name.charAt(0).toUpperCase() : 'O'}
                                            </span>
                                        </div>
                                        <div className="absolute -bottom-2 right-2 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white">
                                            <Shield className="size-4" fill="currentColor" />
                                        </div>
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                            <h3 className="text-2xl font-bold text-slate-900">
                                                Hosted by {product.owner_name || 'Property Owner'}
                                            </h3>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit mx-auto md:mx-0">
                                                ID VERIFIED
                                            </span>
                                        </div>
                                        <p className="text-slate-500 mb-4">
                                            Looking for: <span className="font-semibold text-slate-700">{product.looking_for || 'Any'}</span>
                                        </p>
                                        {product.owner_phone && (
                                            <p className="text-slate-600 mb-4 flex items-center gap-2 justify-center md:justify-start">
                                                <Phone className="size-4" />
                                                <span className="font-medium">+91 98xxxxxxxx</span>
                                            </p>
                                        )}

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
                                                <p className="text-slate-400">Occupancy</p>
                                                <p className="font-bold text-slate-800">
                                                    {product.occupancy.join(', ') || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                        {product.maplink && (
                            <section className="h-96 w-full rounded-[2.5rem] overflow-hidden shadow-inner border-4 border-white">
                                <iframe 
                                    title="Map" 
                                    className="w-full h-full grayscale-[0.3]" 
                                    src={product.maplink} 
                                    allowFullScreen 
                                    loading="lazy"
                                ></iframe>
                            </section>
                        )}
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