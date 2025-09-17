import { FaChevronDown, FaHeart, FaImages, FaLocationArrow, FaMap, FaRupeeSign, FaSearchLocation, FaStar, FaStarHalf } from "react-icons/fa"
import { Filters, locationList, priceRange, sortBy } from "./models/pglist"
import { useEffect, useState } from "react"
import { PgData } from "./models/pgdata";
import { usefilterPGs } from "./viewmodels/filterFunction";
import { Navigate, useNavigate } from "react-router";
import { FilterSection } from "./view/filterSection";
export const Pglist = () => {
    const navigate = useNavigate();
    const [isSortOpen, setSortOpen] = useState(false);
    const handleSort = () => {
        setSortOpen(prev => !prev)
    }
    const [filteredPg, setFilteredPg] = useState(PgData);
    const [filters, setFilters] = useState({
        Occupancy: [],
        lookingFor: [],
        facilities: [],
        price: "",
        city: ""
    })
    const handlefilters = ({ title, values }) => {
        setFilters(prev => {
            if (title === "price" || title === "city") {
                return {
                    ...prev,
                    [title]: values
                };
            } else {
                return {
                    ...prev,
                    [title]: prev[title].includes(values) ? prev[title].filter(v => v !== values) : [...prev[title], values]
                };
            }
        });
    };
    const addPriceRance = () => {
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
                    pg.priceRange = "N/A";
            }
        })
    }
    const handleRemoveFilters = () => {
        setFilters({
            Occupancy: [],
            lookingFor: [],
            facilities: [],
            price: "",
            city: ""
        });
        setFilteredPg(PgData);
    };
    const handlePgdetails = (id) => {
        navigate(`/pgdetails/${id}`);
    };

    useEffect(() => {
        const filteredPgData = PgData.filter(pg => {
            const matchOccupancy =
                filters.Occupancy.length === 0 ||
                filters.Occupancy.includes(pg.occupancy);

            const matchLookingFor =
                filters.lookingFor.length === 0 ||
                filters.lookingFor.includes(pg.lookingFor);

            const matchFacilities =
                filters.facilities.length === 0 ||
                filters.facilities.map(fac =>
                    pg.facilities?.includes(fac)
                );
            const matchPrice =
                !filters.price ||
                pg.priceRange === filters.price;

            const matchCity =
                !filters.city ||
                pg.city?.toLowerCase() === filters.city.toLowerCase();

            return matchOccupancy && matchLookingFor && matchFacilities && matchPrice && matchCity;
        });
        setFilteredPg(filteredPgData);
        addPriceRance();
    }, [filters.city, filters.price, filters.Occupancy, filters.lookingFor, filters.facilities]);



    // const pg = PgData.map((el) => el);
    // console.log(pg.map((el)=> el.occupancy)?.includes(filters.Occupancy));
    // const filteredData = filters.Occupancy? PgData.filter((pg)=> pg?.occupancy?.toLowerCase().includes(filters.Occupancy.toLowerCase())) : PgData;

    //     useEffect(() => {
    //     if (filters.Occupancy) {
    //       const newData = PgData.filter((pg) =>
    //         pg?.occupancy?.toLowerCase().includes(filters.Occupancy.toLowerCase())
    //       );
    //       setFilteredData((value)=>[...value, ...newData]);

    //     } 
    //     if (filters.lookingfor) {
    //         const newData = PgData.filter((pg) =>
    //         pg?.onlyFor?.toLowerCase().includes(filters.lookingfor.toLowerCase())
    //       );
    //        setFilteredData((value)=>[...value, ...newData]);

    //     }
    //     else {
    //       setFilteredData(PgData);
    //     }
    //     setnewPgData(filteredData);
    //   }, [filters, PgData]);


    return (
        <section className="w-full min-h-screen flex justify-center ">
            <div className="w-7xl  gap-4 justify-center mt-10 mb-10">
                {/* <div className=" w-1/3 h-max flex flex-col gap-4 p-4 shadow-2xl shadow-blue-300 rounded-xl border border-blue-300">
                    <span className="w-full flex justify-between items-center">
                        <h1 className="text-2xl text-blue-800 font-bold">Filters</h1>
                        <h2 className="text-purple-600 cursor-pointer hover:underline text-md font-semibold" onClick={handleRemoveFilters}>remove all</h2>
                    </span>
                    {
                        Filters.map((filter, index) => {
                            return (
                                <div className=" flex flex-col gap-2">
                                    <span className="text-xl font-semibold font-Syne">{filter.title}</span>
                                    <div className="grid grid-cols-2 gap-3 border-b p-3">
                                        {
                                            filter.values.map(values => {
                                                return (
                                                    <span
                                                        id={index}
                                                        className={`w-max px-4 py-2 rounded-3xl shadow-md shadow-gray-300 cursor-pointer hover:scale-105 hover:shadow-gray-400 transition-all ${filters[filter.title]?.includes(values) ? "bg-blue-600 text-white border-none" : ""
                                                            }`}
                                                        onClick={() => handlefilters({ title: filter.title, values })}
                                                    >
                                                        <h1>{values}</h1>
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                </div> */}
                <FilterSection />
                <div>
                    <div className=" flex flex-col gap-4  p-4">
                        {
                            filteredPg.map((pg, index) => {
                                return (
                                    <div key={index} className="flex h-53 gap-6 bg-gradient-to-r  shadow-md shadow-blue-200 border-3 border-blue-700 transition-all"
                                        onClick={() => navigate(`/pgdetails/${pg.id}`)}>
                                        <span className="w-2xs relative">
                                            <button className="absolute m-3 right-0"><FaImages className="size-5 fill-white" /></button>
                                            <img className="w-full h-full  object-cover" src={pg.images[0]} alt="" />
                                        </span>
                                        <div className="flex justify-between">
                                            <div className="h-full flex flex-col justify-center gap-5 w-2xs">
                                                <span className="flex gap-2 text-yellow-400">
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStar />
                                                    <FaStarHalf />
                                                </span>
                                                <h1 className="text-xl font-bold">Xyz Pg</h1>
                                                <h2 className="text-sm">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, culpa.
                                                </h2>
                                                <span className="flex items-center gap-2 text-sm">
                                                    <FaLocationArrow className="" />
                                                    {pg.location}
                                                </span>

                                            </div>
                                            <div className="h-full flex flex-col justify-end gap-5 w-2xs items-end p-3">
                                                <span className="flex items-center gap-2 hover:underline cursor-pointer">
                                                    <FaMap /> view on Map
                                                    {/* <iframe title="Google Map" className=" w-20 h-5 rounded-lg" src={pg.locationLink} allowFullScreen="" loading="lazy"></iframe> */}
                                                </span>

                                                {/* <span className="flex items-center gap-2 hover:underline cursor-pointer"></span> */}
                                                <span className="flex items-center text-xl font-bold">
                                                    <FaRupeeSign />
                                                    {pg.price}
                                                </span>
                                                <p>
                                                    save Rs. {pg.discount}
                                                </p>
                                                <span className=" flex gap-5">
                                                    <button className="flex gap-1 items-center">
                                                        <FaHeart /> Favourite
                                                    </button>
                                                    <button className="w-max bg-blue-500 text-white p-3 rounded-xl">
                                                        Contact Owner
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}