 <div className=" flex gap-6 justify-between items-center border border-blue-300 shadow-2xs p-4 rounded-xl ">
                        <div className=" p-3 flex  gap-4 text-lg font-semibold rounded-xl">
                            <select name="city" id="" onChange={(event) => handlefilters({ title: "city", values: event.target.value.toString() })}>
                                <option value="Select City">All locations</option>
                                {
                                    locationList.map((location) => {
                                        return (
                                            <option value={location}>{location}</option>
                                        )
                                    })
                                }
                            </select>
                            <select name="price" id="" onChange={(event) => handlefilters({ title: "price", values: event.target.value })}>
                                <option value="Select Budget">Select Budget</option>
                                {
                                    priceRange.map((price) => {
                                        return (
                                            <option value={price}>{price}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="text" className="border p-1 w-3xs rounded-lg text-md placeholder:text-sm placeholder:font-medium placeholder:pl-2" placeholder="search for pg in your location" />
                        </div>
                        <div className="relative flex gap-4 ">
                            <span className="text-md p-2 font-semibold border-2 rounded-3xl">Students Friendly</span>
                            {/* <span className=" flex w-max gap-2 font-medium text-lg items-center" onClick={handleSort}>Sort By <FaChevronDown /></span> */}
                            <span className=" flex w-max gap-2 font-medium text-lg items-center">
                                {
                                    <select name="sort" id="">
                                        <option value="sort by">Sort by</option>
                                        {
                                            sortBy.map((ele) => {
                                                return (
                                                    <option value={ele}>{ele}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    // sortBy.map((ele) => {
                                    //     return (
                                    //         <>
                                    //             {
                                    //                 isSortOpen && <span className="absolute bg-white p-4 mt-2 right-0 rounded-2xl w-max flex flex-col gap-3 border">
                                    //                     <h1 className="font-bold">{ele.title}</h1>
                                    //                     {
                                    //                         ele.values.map((value) => {
                                    //                             return (
                                    //                                 <h2 className="hover:bg-blue-200 p-2 w-full">{value}</h2>
                                    //                             )
                                    //                         })}
                                    //                 </span>
                                    //             }

                                    //         </>


                                    //     )
                                    // })
                                }
                            </span>
                        </div>
                    </div>