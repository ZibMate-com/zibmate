import { Bed, Wifi, Feather, Shirt, Bath, Utensils, Shield, Heart, Home } from "lucide-react"
import { BookingForm } from "./views/booking-form";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Firedb } from "../firebase/firebaseconfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Header from "../../components/Header";


export const IndividualPg = () => {
    const pgDetails = {
        title: "My Tenant PG (The Cozyness)",
        location: "Sector 45, Gurugram",
        startingPrice: "13,999",
        imageUrl: "pg data/pg5/IMG-20250806-WA0047.jpg",
        pricingPlans: [
            {
                name: "Private Plan (Single)",
                description: "Entire room for yourself with access to premium amenities",
                price: "30,999",
                icon: Bed,
                isFeatured: true
            },
            {
                name: "Double Sharing",
                description: "Shared room with one roommate, access to standard amenities",
                price: "18,499",
                icon: Bed,
                isFeatured: false
            },
            {
                name: "Triple Sharing",
                description: "Shared room with two roommates, our most budget-friendly option",
                price: "13,999",
                icon: Bed,
                isFeatured: false
            }
        ],
        amenities: [
            { name: "High-speed WiFi", icon: 'Wifi', detail: "Fiber optic connection" },
            { name: "Daily Housekeeping", icon: 'Feather', detail: "Cleaning six days a week" },
            { name: "Laundry Services", icon: 'Shirt', detail: "Free two loads per week" },
            { name: "Attached Bathrooms", icon: 'Bath', detail: "Private facilities in most rooms" },
            { name: "Fully Equipped Kitchen", icon: 'Utensils', detail: "For self-cooking (shared)" },
            { name: "24/7 Security", icon: 'Shield', detail: "CCTV & On-site Guards" },
        ],
        about: "Discover comfortable and affordable living at Cozy Homes in Sector 52, Gurgaon with CoFynd. Offering fully furnished single, double, and triple sharing rooms, this PG provides modern amenities like high-speed WiFi, housekeeping, laundry, attached bathrooms, kitchen, and 24/7 security. Perfect for students and working professionals, Cozy Homes ensures a safe, convenient, and vibrant community lifestyle in a prime Gurgaon location — all with zero brokerage.",
        locationlink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27870.533525461677!2d75.73012479999998!3d29.170073600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391233b67c4878d9%3A0x67d85cf672dde2e7!2sMG%20Club%20and%20Resorts!5e0!3m2!1sen!2sin!4v1755797518352!5m2!1sen!2sin",
    };

    const PricingCard = ({ icon: Icon, name, description, price, isFeatured }) => {
        const cardClasses = isFeatured
            ? "bg-gradient-to-br from-orange-50 via-orange-100 to-white border-2 border-orange-300 shadow-lg"
            : "bg-white border border-gray-200 shadow-md";

        return (
            <div className={`w-full flex flex-col sm:flex-row mt-6 justify-between items-start sm:items-center p-5 rounded-xl transition-all hover:shadow-xl ${cardClasses}`}>
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <Icon className="size-10 text-orange-500 flex-shrink-0" />
                    <span className="flex flex-col">
                        <h1 className="text-xl font-semibold text-gray-800">{name}</h1>
                        <h2 className="text-sm text-zinc-500 hidden md:block">{description}</h2>
                    </span>
                </div>
                <span className="text-right flex flex-col items-start sm:items-end">
                    <b className="text-2xl font-bold text-gray-900">Rs {price}</b>
                    <p className="text-orange-500 font-semibold text-base cursor-pointer hover:underline">Enquire Now</p>
                </span>
            </div>
        );
    };

    const AmenityIconMap = { Wifi, Feather, Shirt, Bath, Utensils, Shield, Heart };

    const AmenityItem = ({ name, iconName, detail }) => {
        const Icon = AmenityIconMap[iconName] || Heart;

        return (
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Icon className="size-6 text-orange-500 flex-shrink-0" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-500">{detail}</p>
                </div>
            </div>
        );
    };
    const { id } = useParams();
    console.log(id);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        images: [""],
        price: "",
        discount: "",
        address: "",
        locationLink: "",
        occupancy: "",
        lookingFor: "",
        facilities: [""],
        city: "",
    });

    useEffect(() => {
        async function fetchProduct() {
            try {
                const docRef = doc(Firedb, "pgData", id);
                const snap = await getDoc(docRef);
                // console.log(snap);

                if (snap.exists()) {
                    setProduct({ id: snap.id, ...snap.data() });
                } else {
                    console.log("❌ Product not found");
                    // setError("Product not found");
                }
            } catch (err) {
                console.error("🔥 Error fetching product:", err);
                // setError("Failed to load product");
            } finally {
                // setLoading(false);
            }
        }

        if (id) fetchProduct();
    }, [id])
    console.log(product);

    return (
        <section className="min-h-screen pt-10 pb-20 bg-gray-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end p-6 border-b border-gray-200 mb-6 bg-white rounded-xl shadow-lg">
                    <span className="mb-4 sm:mb-0">
                        <h1 className="text-4xl text-zinc-800 font-extrabold mb-1">{product.name}</h1>
                        <h2 className="text-xl font-normal text-zinc-600 flex items-center gap-2">
                            <Home className='size-5 text-orange-500' /> {product.address}
                        </h2>
                    </span>
                    <span className="text-right">
                        <p className="text-sm text-zinc-500 font-medium">Starting from</p>
                        <b className="text-3xl font-bold text-orange-600"> Rs.{product.price}</b>/month
                    </span>
                </div>


                <div className="w-full max-h-88 flex  rounded-2xl overflow-hidden shadow-2xl mb-10">
                    {
                        product.images.map((img) => {
                            return (
                                <div className="w-full h-full">
                                <img
                                    src={img}
                                    className="w-full h-full object-contain"
                                    alt={`Image of ${product.name}`}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1000x400/9CA3AF/ffffff?text=Image+Not+Available" }}
                                />
                                </div>
                            )
                        })
                    }

                </div>
                <div className="flex w-full gap-10 justify-between">
                    <div className="space-y-12 min-w-4xl">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">Pricing Plans</h1>
                            <div className="space-y-4">
                                {pgDetails.pricingPlans.map((plan, index) => (
                                    <PricingCard key={index} {...plan} />
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 space-y-2">
                                <p className="text-orange-600 font-semibold">*Prices mentioned are starting price and may vary as per plan, availability & services</p>
                                <p>*GST on the price shall be as applicable</p>
                            </div>
                        </div>


                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">Amenities</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {pgDetails.amenities.map((amenity, index) => (
                                    <AmenityItem key={index} name={amenity.name} iconName={amenity.icon} detail={amenity.detail} />
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <iframe title="Google Map" className=" w-full h-full rounded-lg" src={product.locationLink} allowFullScreen="" loading="lazy"></iframe>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">About this Property</h1>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                    </div>
                    <BookingForm />
                </div>
            </div>
        </section>
    )
}