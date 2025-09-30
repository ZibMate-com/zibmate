import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "./viewmodels/useSignup";
import {Loader} from "../../../components/view/loader"
// import { token } from "./repository/token";
const Signup = () => {
  const { role, userdata, errors, setRole, setUserData,handleSignup,loading,isLoggedIn } = useSignup();
  console.log(isLoggedIn);
  // console.log(token);
  
  return (
    <div className='flex justify-center items-center h-screen'>
     {
      loading && <Loader/>
     }
      <div className=" px-1 lg:px-8 py-6 border border-gray-400 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className='text-center text-2xl font-bold text-orange-500 '>
            Signup
          </h2>
        </div>
        <div className="flex justify-center gap-3 mb-4">
          <button
            type="button"
            className={`px-6 py-2 rounded-full border font-Lato ${role === "owner"
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            onClick={() => setRole("owner")}
          >
            Owner
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-full border font-Lato ${role === "buyer"
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            onClick={() => setRole("buyer")}
          >
            Buyer
          </button>
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder='First Name'
            value={userdata.firstName}
            onChange={(e) => {
              setUserData({
                ...userdata,
                firstName: e.target.value
              })
            }}
            className=' border border-gray-400 px-2 py-2 w-96 rounded-md outline-none '
          />
          {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder='Last Name'
            value={userdata.lastName}
            onChange={(e) => {
              setUserData({
                ...userdata,
                lastName: e.target.value
              })
            }}
            className=' border border-gray-400 px-2 py-2 w-96 rounded-md outline-none '
          />
          {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
        </div>
        {role === "owner" ? (
          <>
            <div className="text-left mb-3">
              <input
                type="email"
                placeholder="Email"
                value={userdata.email}
                onChange={(e) => setUserData({
                  ...userdata,
                  email: e.target.value
                })}
                className={`w-full p-2 border rounded-lg focus:ring-2 ${errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-500"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="text-left mb-3">
              <input
                type="password"
                placeholder="Password"
                value={userdata.password}
                onChange={(e) => setUserData({
                  ...userdata,
                  password: e.target.value
                })}
                className={`w-full p-2 border rounded-lg focus:ring-2 ${errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-500"
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-left mb-3">
              <input
                type="email"
                placeholder="Email"
                value={userdata.email}
                onChange={(e) => setUserData({
                  ...userdata,
                  email: e.target.value
                })}
                className={`w-full p-2 border rounded-lg focus:ring-2 ${errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-500"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="text-left mb-3">
              <input
                type="tel"
                placeholder="Phone Number"
                value={userdata.phone}
                onChange={(e) => setUserData({
                  ...userdata,
                  phone: e.target.value
                })}
                className={`w-full p-2 border rounded-lg focus:ring-2 ${errors.phone
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-indigo-500"
                  }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </>
        )}
        <div className="mb-5">
          <button
            type='button'
            onClick={handleSignup}
            className='bg-orange-500 hover:bg-orange-600 w-full text-white text-center py-2 font-bold rounded-md '
          >
            SignUp
          </button>
        </div>
        <div>
          <h2 className='text-black'>Have an account <Link className=' text-orange-500 font-bold' to={'/login'}>Login</Link></h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;