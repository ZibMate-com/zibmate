"use client";
import { useState, useRef, useEffect } from "react";

export const useSearchSection = () => {
  const [lookingfor, setlookingfor] = useState(false);
  const [location, setlocation] = useState(false);
  const [occupancy, setoccupancy] = useState(false);
  const [price, setPrice] = useState(false);
  const SearchRef = useRef(null);

  const handleLookingForClick = () => {
    setlookingfor((prev) => !prev);
  };
  const handleLocation = () => {
    setlocation((prev) => !prev);
  };
  const handleOccuoancy = () => {
    setoccupancy((prev) => !prev);
  };
  const handlePrice = () => {
    setPrice((prev) => !prev);
  };
  useEffect(() => {
    const handleOutside = (event) => {
      if (SearchRef.current && !SearchRef.current.contains(event.target)) {
        setlookingfor(false);
        setoccupancy(false);
        setlocation(false);
        setPrice(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  });

  return {
    lookingfor,
    handleLookingForClick,
    SearchRef,
    location,
    handleLocation,
    occupancy,
    handleOccuoancy,
    price,
    handlePrice,
  };
};
