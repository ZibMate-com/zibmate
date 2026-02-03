import { Users, Home, Banknote, MapPin, Wifi } from "lucide-react";

export const Filters = [
  {
    title: "lookingFor",
    type: "select",
    values: ["Male", "Female", "Any"],
    component: Users,
  },
  {
    title: "Occupancy",
    type: "select",
    values: ["Single", "Double", "Triple"],
    component: Home,
  },
  {
    title: "price",
    type: "select",
    values: ["under 10,000", "10,000 - 15,000", "15,000 - 25,000", "above 25,000"],
    component: Banknote,
  },
  {
    title: "city",
    type: "select",
    values: ["New York", "Los Angeles", "Chicago", "Houston", "Pune", "Mumbai", "Bangalore", "Delhi"],
    component: MapPin,
  },
  {
    title: "facilities",
    type: "multiselect",
    values: ["WiFi", "AC", "Food", "Laundry", "Power Backup", "CCTV", "Cleaning"],
    component: Wifi,
  },
];
