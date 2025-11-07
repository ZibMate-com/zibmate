import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "./viewmodels/useSignup";
import {Loader} from "../../../components/view/loader"
const Signup = () => {
  const { role, userdata, errors, setRole, setUserData,handleSignup,loading,isLoggedIn } = useSignup();
  console.log(isLoggedIn);
   const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };
  return (
    <div className='flex justify-center items-center h-screen bg-gray-50 p-4'>
            {loading && <Loader />}
            <div className="w-full max-w-md px-8 py-8 border border-gray-200 rounded-xl shadow-xl bg-white relative">
                
                <div className="mb-6">
                    <h2 className='text-center text-3xl font-extrabold text-orange-600 '>
                        Signup
                    </h2>
                </div>
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        type="button"
                        className={`px-6 py-2 rounded-full transition duration-200 ease-in-out font-semibold text-base focus:outline-none focus:ring-2 focus:ring-offset-2 ${role === "owner"
                            ? "bg-orange-500 text-white border-orange-500 shadow-md focus:ring-orange-500"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-orange-50 hover:border-orange-500 focus:ring-orange-200"
                            }`}
                        onClick={() => setRole("owner")}
                        disabled={loading}
                    >
                        Owner
                    </button>
                    <button
                        type="button"
                        className={`px-6 py-2 rounded-full transition duration-200 ease-in-out font-semibold text-base focus:outline-none focus:ring-2 focus:ring-offset-2 ${role === "buyer"
                            ? "bg-orange-500 text-white border-orange-500 shadow-md focus:ring-orange-500"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-orange-50 hover:border-orange-500 focus:ring-orange-200"
                            }`}
                        onClick={() => setRole("buyer")}
                        disabled={loading}
                    >
                        Buyer
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder='First Name'
                        value={userdata.firstName}
                        onChange={handleInputChange}
                        className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-500 outline-none transition duration-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                        disabled={loading}
                    />
                    {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                </div>
                
                <div className="mb-4">
                    <input
                        type="text"
                        name="lastName"
                        placeholder='Last Name'
                        value={userdata.lastName}
                        onChange={handleInputChange}
                        className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-500 outline-none transition duration-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                        disabled={loading}
                    />
                    {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                </div>

                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={userdata.email}
                        onChange={handleInputChange}
                        className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-500 outline-none transition duration-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                        disabled={loading}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>

                {role === "owner" ? (
                   
                    <div className="mb-5">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userdata.password}
                            onChange={handleInputChange}
                            className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-500 outline-none transition duration-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                            disabled={loading}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>
                ) : (
                  
                    <div className="mb-5">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={userdata.phone}
                            onChange={handleInputChange }
                            className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-500 outline-none transition duration-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                            disabled={loading}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>
                )}
                
        
                <div className="mb-6">
                    <button
                        type='button'
                        onClick={handleSignup}
                        className='bg-orange-600 hover:bg-orange-700 w-full text-white text-center py-3 font-bold rounded-lg transition duration-200 shadow-md disabled:bg-gray-400'
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Create Account'}
                    </button>
                </div>
         
                <div className="mt-6 text-center">
                    <p className='text-gray-600 text-sm'>
                        Have an account? <Link className='text-orange-500 hover:text-orange-700 font-bold transition duration-200' to={'/login'}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
  );
}

export default Signup;