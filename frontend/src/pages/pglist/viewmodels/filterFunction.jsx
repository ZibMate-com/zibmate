import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PgData } from "../models/pgdata";

export const useFilterPGs = () => {
  const navigate = useNavigate();
  const [isSortOpen, setSortOpen] = useState(false);
  const handleSort = () => setSortOpen(prev => !prev);

  const [filteredPg, setFilteredPg] = useState(PgData);

  const [filters, setFilters] = useState({
    Occupancy: "",
    lookingFor: "",
    facilities: "",
    price: "",
    city: ""
  });

  const addPriceRange = () => {
    PgData.forEach(pg => {
      switch (true) {
        case pg.price < 10000:
          pg.priceRange = "under 10,000";
          break;
        case pg.price >= 10000 && pg.price < 15000:
          pg.priceRange = "10,000 - 15,000";
          break;
        case pg.price >= 15000 && pg.price < 25000:
          pg.priceRange = "15,000 - 25,000";
          break;
        case pg.price >= 25000:
          pg.priceRange = "above 25,000";
          break;
        default:
          pg.priceRange = "Select Budget";
      }
    });
  };

  const handlefilters = ({ title, values }) => {
    setFilters(prev => ({
      ...prev,
      [title]: values
    }));
  };

  const handleRemoveFilters = () => {
    setFilters({
      Occupancy: "",
      lookingFor: "",
      facilities: "",
      price: "",
      city: ""
    });
    setFilteredPg(PgData);
  };

  const handlePgdetails = (id) => {
    navigate(`/pgdetails/${id}`);
  };

  useEffect(() => {
    addPriceRange();
    const filteredPgData = PgData.filter(pg => {
      const matchOccupancy =
        !filters.Occupancy || pg.occupancy === filters.Occupancy;

      const matchLookingFor =
        !filters.lookingFor || pg.lookingFor === filters.lookingFor;

      const matchFacilities =
        !filters.facilities || (pg.facilities && pg.facilities.includes(filters.facilities));

      const matchPrice =
        !filters.price || filters.price === "Price Range" || pg.priceRange === filters.price;

      const matchCity =
        !filters.city || (pg.city && pg.city.toLowerCase() === filters.city.toLowerCase());

      return matchOccupancy && matchLookingFor && matchFacilities && matchPrice && matchCity;
    });
    setFilteredPg(filteredPgData);
  }, [filters.city, filters.price, filters.Occupancy, filters.lookingFor, filters.facilities]);

  return {
    filteredPg,
    handlePgdetails,
    handlefilters,
    filters,
    handleRemoveFilters,
    isSortOpen,
    handleSort,
  };
};