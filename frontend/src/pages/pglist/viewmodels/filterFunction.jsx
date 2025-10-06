import { useEffect, useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePgData } from "./usePgData";
import { getPgData } from "../models/pgdata";
import Mycontext from "../../../features/context/mycontext";
// import { pgs } from "../models/pgs";


export const useFilterPGs = () => {
  const navigate = useNavigate();
  // const {pgs ,setpgs} = usePgData();
   const [pgs, setPgs] = useState([]);
    const {loading ,setloading} =useContext(Mycontext);
    const [filteredPg, setFilteredPg] = useState([]);
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
  const [isSortOpen, setSortOpen] = useState(false);
  const handleSort = () => setSortOpen(prev => !prev);


  const [filters, setFilters] = useState({
    Occupancy: "",
    lookingFor: "",
    facilities: "",
    price: "",
    city: ""
  });

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

  useEffect(() => {
    addPriceRange();
    const filteredpgs = pgs.filter(pg => {
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

      return matchOccupancy && matchLookingFor && matchFacilities  && matchCity && matchPrice;
    });
    setFilteredPg(filteredpgs);
  }, [filters.city, filters.Occupancy, filters.lookingFor, filters.facilities,filters.price]);

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