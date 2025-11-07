import { Calendar,Users,Mail } from "lucide-react";
export const BookingForm = () => {
   
    return (
        <div className="lg:sticky w-full lg:top-24 bg-white p-6 rounded-xl shadow-2xl border border-orange-100/50 h-max">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 text-center">Book Your Stay</h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); console.log("Booking Enquiry Submitted!"); }}>
                
                {/* Check-in Date */}
                <div>
                    <label htmlFor="checkin" className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-orange-400" />
                        <input 
                            type="date" 
                            id="checkin" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                            required
                        />
                    </div>
                </div>

                {/* Number of Occupants */}
                <div>
                    <label htmlFor="occupants" className="block text-sm font-medium text-gray-700 mb-2">Sharing Type</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-orange-400" />
                        <select 
                            id="occupants" 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                            required
                        >
                            <option value="" disabled>Select Sharing Type</option>
                            <option value="1">Single Occupancy</option>
                            <option value="2">Double Sharing</option>
                            <option value="3">Triple Sharing</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            {/* Simple SVG for dropdown arrow */}
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Contact Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-orange-400" />
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="your@email.com"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full p-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 mt-6"
                >
                    Request Callback & View
                </button>
                
                <p className="text-xs text-center text-gray-500 pt-2">We will connect you with the property manager within 2 hours.</p>

            </form>
        </div>
    );
};