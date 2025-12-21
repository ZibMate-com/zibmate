import { FaWifi, FaRegSnowflake, FaDumbbell } from "react-icons/fa6";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { Component, Heart, MapPin, MessageCircle, Sparkle, Sparkles, StickyNote } from "lucide-react"
export const TopPglist = [
    {
        id: 1,
        name: "MG Club and Resorts",
        description: "A luxurious resort located in the heart of Chandigarh.",
        images: [
            "pg data/WhatsApp Image 2025-07-09 at 19.49.38_6c291a3a.jpg", "pg data/WhatsApp Image 2025-07-09 at 19.49.38_6c291a3a.jpg", "pg data/WhatsApp Image 2025-07-09 at 19.49.38_6c291a3a.jpg", "pg data/WhatsApp Image 2025-07-09 at 19.49.38_6c291a3a.jpg", "pg data/WhatsApp Image 2025-07-09 at 19.49.38_6c291a3a.jpg"
        ],
        price: 3500,
        discount: 200,
        location: "Sector 15, Chandigarh",
        locationLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27870.533525461677!2d75.73012479999998!3d29.170073600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391233b67c4878d9%3A0x67d85cf672dde2e7!2sMG%20Club%20and%20Resorts!5e0!3m2!1sen!2sin!4v1755797518352!5m2!1sen!2sin",
        occupancy: "double",
        lookingFor: "proffesionals",
        facilities: ["Ac", "Laundry", "Food"],
        city: "Mumbai"


    },
    {
        id: 2,
        name: "MG Club and Resorts",
        description: "A luxurious resort located in the heart of Chandigarh.",
        images: [
            "pg data/pg2/IMG-20250806-WA0020.jpg", "pg data/pg2/IMG-20250806-WA0021.jpg", "pg data/pg2/IMG-20250806-WA0022.jpg", "pg data/pg2/IMG-20250806-WA0023.jpg", "pg data/pg2/IMG-20250806-WA0024.jpg"
        ],
        price: 4000,
        discount: 500,
        location: "Sector 15, Chandigarh",
        locationLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27870.533525461677!2d75.73012479999998!3d29.170073600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391233b67c4878d9%3A0x67d85cf672dde2e7!2sMG%20Club%20and%20Resorts!5e0!3m2!1sen!2sin!4v1755797518352!5m2!1sen!2sin",
        occupancy: "triple",
        lookingFor: "students",
        facilities: ["Ac", "Laundry", "Food", "WiFi"],
        city: "Noida"
    },
    {
        id: 3,
        name: "MG Club and Resorts",
        description: "A luxurious resort located in the heart of Chandigarh.",
        images: [
            "pg data/pg3/IMG-20250806-WA0041.jpg", "pg data/pg3/IMG-20250806-WA0042.jpg", "pg data/pg3/IMG-20250806-WA0043.jpg", "pg data/pg3/IMG-20250806-WA0044.jpg", "pg data/pg3/IMG-20250806-WA0045.jpg"
        ],
        price: 10000,
        discount: 500,
        location: "Sector 15, Chandigarh",
        locationLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27870.533525461677!2d75.73012479999998!3d29.170073600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391233b67c4878d9%3A0x67d85cf672dde2e7!2sMG%20Club%20and%20Resorts!5e0!3m2!1sen!2sin!4v1755797518352!5m2!1sen!2sin",
        occupancy: "single",
        lookingFor: "students",
        facilities: ["Microwave"],
        city: "Bangalore"

    },
    {
        id: 4,
        name: "MG Club and Resorts",
        description: "A luxurious resort located in the heart of Chandigarh.",
        images: [
            "pg data/pg5/IMG-20250806-WA0046.jpg", "frontend/public/pg data/pg5/IMG-20250806-WA0052.jpg", "frontend/public/pg data/pg5/IMG-20250806-WA0053.jpg", "frontend/public/pg data/pg5/IMG-20250806-WA0054.jpg", "frontend/public/pg data/pg5/IMG-20250806-WA0055.jpg"
        ],
        price: 14000,
        discount: 500,
        location: "Sector 15, Chandigarh",
        locationLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27870.533525461677!2d75.73012479999998!3d29.170073600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391233b67c4878d9%3A0x67d85cf672dde2e7!2sMG%20Club%20and%20Resorts!5e0!3m2!1sen!2sin!4v1755797518352!5m2!1sen!2sin",
        occupancy: "single",
        lookingFor: "students",
        facilities: ["Laundry", "Food", "WiFi", "Gym"],
        city: "Gurugram"
    },
    

]

export const features = [
    {
        heading: "Unified Dashboard",
        para: "Access all guest and property details in one view for efficient management.",
        component: StickyNote
    },
    {
        heading: "Effortless transactions",
        para: "Streamline rent payments and track them securely for all users.",
        component: Sparkle
    },
    {
        heading: "Real-time updates",
        para: "Receive instant alerts for bookings, payments, and important updates.",
        component: MessageCircle
    },
    {
        heading: "Owner tools",
        para: "Manage listings, approve guests, and monitor occupancy with ease.",
        component: Sparkles
    },
    {
        heading: "Guest portal",
        para: "Guests can access property details, communicate with owners, and manage their stay.",
        component: Heart
    },
    {
        heading: "Secure data",
        para: "Ensure privacy and secure transactions for all users.",
        component: MapPin
    },
]

export const FAQ = [
    {
        id: 1,
        question: "How do I register a new resident?",
        answer: "Log in, select your property, and click 'Add Resident.' Enter their details and save. The resident will get an invite to join the platform."
    },
    {
        id: 2,
        question: "Can I monitor rent payments online?",
        answer: "Yes, you can track all rent payments, view payment history, check due dates, and download receipts directly from your dashboard."
    },
    {
        id: 3,
        question: "Is there a way to message residents?",
        answer: "Yes, use the built-in messaging tool to communicate directly with residents. Share updates, documents, or resolve issues efficiently."
    },
    {
        id: 4,
        question: "What support channels are available?",
        answer: "Get help via live chat or email. Visit our help center for guides and FAQs, or reach out for direct support."
    },

]


