export const BookingPage = () => {
    return (
        <section className="w-full h-screen relative flex justify-center items-center">
            <img className="w-full h-full object-cover" src="/assets/bookingpagebg2.jpg" alt="" />
            <div className="absolute inset-0 bg-black opacity-35"></div>
            <div className="max-w-md w-full absolute  backdrop-blur-sm shadow-xl rounded-2xl p-6 space-y-4 z-50">
                <h2 className="text-2xl text-white font-semibold ">Your Booking</h2>
                <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                    <div className="bg-gray-100 rounded-lg p-3">
                        <p className="font-medium">Check-In</p>
                        <input type="date" name="check-in" id="check-in" className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
                    </div>
                    {/* <div className="bg-gray-100 rounded-lg p-3">
                        <p className="font-medium">Check-Out</p>
                        <p className="text-gray-600">02/07/2022</p>
                    </div> */}
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium">Room Sharing</p>
                    <select name="room-sharing" id="room-sharing" className="w-full border border-gray-300 rounded-lg p-2 mt-1">
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="suite">Triple</option>
                    </select>
                </div>

                {/* Billing breakdown */}
                <div className="text-sm space-y-2 text-white ">
                    <div className="flex justify-between">
                        <span>Monthly Room</span>
                        <span>4054.35 tokens</span>
                    </div>
                    <div className="flex justify-between text-gray-500 line-through">
                        <span>Standard Preis</span>
                        <span>-350.45 USD</span>
                    </div>
                    <div className="flex justify-between text-lg">
                        <span >Booking price</span>
                        <span>240.09 tokens</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Extras Facilities (0 items)</span>
                        <span>0 tokens</span>
                    </div>
                    
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2 text-sm text-emerald-700">
                    <span>✔</span>
                    <span>We guarantee to adjust  your booking deposit in your rent!</span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>3804.35 tokens</span>
                </div>

                {/* Pay Now */}
                <div className="space-y-2">
                    <p className="text-sm">Pay Now:</p>
                    <button className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                        Pay 300 tokens
                    </button>
                </div>

                {/* Leave a note */}

            </div>
        </section>
    )
}