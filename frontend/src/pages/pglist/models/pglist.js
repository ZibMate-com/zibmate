import { MapPin, User, Users, Wallet, Wifi } from "lucide-react"

export const Filters = [
    {
        title: "Occupancy",
        values: [
            "single", "double", "triple"
        ],
        component : Users
    },
    {
        title: "lookingFor",
        values: [
            "proffesionals", "students", "working womens"
        ],
        subvalue: [
            "for boys", "for girls", "both"
        ],
        component : User
    },

    {
        title: "facilities",
        values: [
            "Ac", "Laundry", "Food", "Room Cleaning", "Gym", "Microwave"
        ],
        component : Wifi
    },
    {
        title: "Price Range",
        values: ["under 10,000", "10,000 - 15,000", "15,000 - 25,000", "above 25,0000"],
        component : Wallet        
    },
    {
        title: "Location List",
        values: [
            "Gurugram",
            "Noida",
            "Delhi",
            "Bangalore",
            "Mumbai"
        ],
        component : MapPin
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