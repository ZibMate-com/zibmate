import React, { useState } from 'react';
import { Filters } from "../models/pglist";
import { ChevronDown } from 'lucide-react';


export const FilterSection = ({ handlefilters, filters, handleRemoveFilters, handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const [isFacilitiesOpen, setIsFacilitiesOpen] = useState(false);

    // Determines if any filter, including array filters, is active
    const isFilterActive = Object.values(filters).some(value => (Array.isArray(value) ? value.length > 0 : (value && value !== "")));

    const handleFacilityChange = (facilityTitle, facilityValue) => {
        const currentSelections = filters[facilityTitle] || [];
        
        let newSelections;
        if (currentSelections.includes(facilityValue)) {
            newSelections = currentSelections.filter(val => val !== facilityValue);
        } else {
            newSelections = [...currentSelections, facilityValue];
        }

        handlefilters({
            title: facilityTitle,
            values: newSelections
        });
    };

    const facilityFilter = Filters.find(f => f.type === 'multiselect'); 
    const otherFilters = Filters.filter(f => f.type !== 'multiselect');

   
    const renderFilterPill = (filter, index) => {
        const filterKey = filter.title;
        const isActive = (filters[filterKey] && filters[filterKey] !== "");
        const displayValue = filters[filterKey] || filterKey;

    
        return (
            <div
                key={index}
                className={`
                    relative group min-w-[200px] sm:min-w-[150px]
                    flex items-center gap-2 p-2 
                    border rounded-lg cursor-pointer transition-all duration-200
                    ${isActive
                        ? "bg-orange-500 border-orange-500 text-white shadow-md"
                        : "bg-white border-gray-300 hover:border-gray-500 text-gray-700"
                    }
                `}
            >
                <filter.component 
                    className={`size-7 ${isActive ? "text-white" : "text-gray-500 group-hover:text-orange-600"}`} 
                />
                <select
                    name={filterKey}
                    className="absolute inset-0 opacity-0 text-black cursor-pointer w-full h-full"
                    value={filters[filterKey] || ""}
                    onChange={event =>
                        handlefilters({
                            title: filterKey,
                            values: event.target.value
                        })
                    }
                >
                    <option value="">{filter.title}</option>
                    {filter.values.map(val => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </select>
                
                <span className="text-sm font-semibold truncate max-w-[80%]">{displayValue}</span>
            
            </div>
        );
    };

    const currentSelections = facilityFilter ? filters[facilityFilter.title] || [] : [];
    const facilityDisplayValue = currentSelections.length > 0 ? `${currentSelections.length} Selected` : facilityFilter?.title;
    const isFacilityFilterActive = currentSelections.length > 0;
    
    return (
        <div className="w-full  mx-auto py-4 px-4 sm:px-6 lg:px-8  rounded-lg shadow-md">
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search PGs by Name, Locality, or Keyword..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-lg font-medium focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value); 
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center mb-4 border-t pt-4 border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Refine Your Search</h2>
                <button
                    className={`
                        text-sm font-medium transition duration-300 ease-in-out flex items-center gap-1
                        ${isFilterActive 
                            ? "text-red-600 hover:text-red-800 hover:underline" 
                            : "text-gray-400 cursor-not-allowed"
                        }
                    `}
                    onClick={isFilterActive ? handleRemoveFilters : null}
                    disabled={!isFilterActive}
                >
                    Clear All Filters
                </button>
            </div>

            <div className="flex flex-wrap items-start gap-3">
                
                {facilityFilter && (
                    <div className="border border-gray-300 rounded-lg p-3 bg-white w-full sm:w-auto min-w-[200px]">
                        <div 
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setIsFacilitiesOpen(!isFacilitiesOpen)}
                        >
                            <div className="flex items-center gap-2">
                                <facilityFilter.component 
                                    className={`size-5 ${isFacilityFilterActive ? "text-orange-600" : "text-gray-500"}`} 
                                />
                                <span className="text-sm font-bold text-gray-700">
                                    {facilityDisplayValue}
                                </span>
                            </div>
                            <ChevronDown 
                                className={`size-5 text-gray-500 transform transition-transform duration-300 ${isFacilitiesOpen ? 'rotate-180' : 'rotate-0'}`} 
                            />
                        </div>

                        {isFacilitiesOpen && (
                            <div className="mt-3 pt-3 border-t border-gray-200 max-h-60 overflow-y-auto">
                                <p className="text-xs text-gray-500 mb-2">Select all desired amenities:</p>
                                {facilityFilter.values.map((val) => (
                                    <div key={val} className="flex items-center space-x-2 py-1">
                                        <input
                                            id={`checkbox-fac-${val}`}
                                            type="checkbox"
                                            checked={currentSelections.includes(val)}
                                            onChange={() => handleFacilityChange(facilityFilter.title, val)}
                                            className="form-checkbox h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                        />
                                        <label htmlFor={`checkbox-fac-${val}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                                            {val}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                
                {/* Other Filters (Pills) */}
                <div className="flex flex-wrap items-center gap-3">
                    {otherFilters.map(renderFilterPill)}
                </div>
                
            </div>
        </div>
    );
};