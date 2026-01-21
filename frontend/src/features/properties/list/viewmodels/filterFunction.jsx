import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPgData } from "../models/pgdata";
import Mycontext from "../../../../context/mycontext";
// import { pgs } from "../models/pgs";


export const useFilterPGs = () => {
  const navigate = useNavigate();
  // const {pgs ,setpgs} = usePgData();
  const [pgs, setPgs] = useState([]);
  const { loading, setloading } = useContext(Mycontext);
  const [filteredPg, setFilteredPg] = useState([]);
  const FilterRef = useRef();
  const [isSortOpen, setSortOpen] = useState(false);
  const handleSort = () => setSortOpen(prev => !prev);
  const [filters, setFilters] = useState({
    Occupancy: "",
    lookingFor: "",
    facilities: [],
    price: "",
    city: ""
  });

  // useEffect(() => {
  //   const handleOutside = (event) => {
  //     if (FilterRef.current && !FilterRef.current.contains(event.target)) {
  //       setFilters()
  //     }
  //   }
  //   document.addEventListener('mousedown', handleOutside);
  //   return () => document.removeEventListener('mousedown', handleOutside)
  // })
  useEffect(() => {
    const fetchData = async () => {
      setloading(true)
      try {
        const data = await getPgData();
        setPgs(data);
        setloading(false)
        setFilteredPg(data)
        return data
      } catch (error) {
        console.log(error);
        setloading(false)
      }
    };

    fetchData();

  }, []);

  const addPriceRange = () => {
    pgs.forEach(pg => {
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
    setFilteredPg(pgs);
  };

  const handlePgdetails = (id) => {
    navigate(`/pgdetails/${id}`);
  };
  const handleSearch = (query) => {
    const result = filteredPg.filter(item => item.name.toLowerCase().includes(query) || item.address.toLowerCase().includes(query) || item.city.toLowerCase().includes(query))
    setFilteredPg(result);
  }

  useEffect(() => {
    addPriceRange();
    const filteredpgs = pgs.filter(pg => {
      const matchOccupancy =
        !filters.Occupancy || pg.occupancy === filters.Occupancy;

      const matchLookingFor =
        !filters.lookingFor || pg.lookingFor === filters.lookingFor;

      const matchFacilities =
        !filters.facilities?.length || filters.facilities.some(faci => pg.facilities.includes(faci));

      const matchPrice =
        !filters.price || filters.price === "Price Range" || pg.priceRange === filters.price;

      const matchCity =
        !filters.city || (pg.city && pg.city.toLowerCase() === filters.city.toLowerCase());

      return matchOccupancy && matchLookingFor && matchFacilities && matchCity && matchPrice;
    });
    setFilteredPg(filteredpgs);
  }, [filters.city, filters.Occupancy, filters.lookingFor, filters.facilities, filters.price]);

  return {
    filteredPg,
    handlePgdetails,
    handlefilters,
    filters,
    handleRemoveFilters,
    isSortOpen,
    handleSort,
    handleSearch
  };
};