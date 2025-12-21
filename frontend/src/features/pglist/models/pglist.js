import { MapPin, User, Users, Wallet, Wifi, BedIcon } from "lucide-react"

export const Filters = [
    {
        title: "Occupancy",
        type: "singleselect",
        component: BedIcon,
        values: ["single", "double", "triple"],
    },
    {
        title: "lookingFor",
        values: [
            "proffesionals", "students", "working womens"
        ],
        subvalue: [
            "for boys", "for girls", "both"
        ],
        component: User
    },

    {
        title: "facilities",
        type: "multiselect",
        component: Wifi,
        values: ["High-Speed Wi-Fi", "Laundry Service", "Gym Access", "Parking","Ac","Food"],
    },
    {
        title: "price",
        type: "singleselect",
        values: ["under 10,000", "10,000 - 15,000", "15,000 - 25,000", "above 25,0000"],
        component: Wallet
    },
    {
        title: "city",
        type: "singleselect",
        values: [
            "Gurugram",
            "Noida",
            "Delhi",
            "Bangalore",
            "Mumbai"
        ],
        component: MapPin
    }

]

// export const sortBy = [
//   {
//     title : "Price",
//     values : [
//         "Low to high" , "High to low"
//     ]
//   }
// ]
export const sortBy = [
    "Low to high",
    "High to low"
]
export const priceRange = [
    "under 10,000", "10,000 - 15,000", "15,000 - 25,000", "above 25,0000"
]
export const locationList = [
    "Gurugram",
    "Noida",
    "Delhi",
    "Bangalore",
    "Mumbai"
]
