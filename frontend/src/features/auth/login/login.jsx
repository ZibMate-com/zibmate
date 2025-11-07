import React from "react";
import { Link } from "react-router-dom";
import { useLogin } from "./viewmodels/uselogin";
import { Loader } from "../../../components/view/loader";

export const Login = () => {
  const {
    role,
    setRole,
    userCred,
    setUserCred,
    errors,
    handleLogin,
    loading,
    isLoggedIn,
    handleGoogleSignIn
  } = useLogin();
  console.log(isLoggedIn);

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50 p-4'>
      {loading && <Loader />}
      <div className="w-full max-w-sm px-8 py-8 border border-gray-200 rounded-xl shadow-xl bg-white relative">

        <div className="mb-6">
          <h2 className='text-center text-3xl font-extrabold text-orange-600 '>
            Login
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

        {role === "owner" ? (
          <>
            <div className="mb-4">
              <input
                type="email"
                placeholder='Email Address'
                value={userCred.email}
                onChange={(e) => {
                  setUserCred({ ...userCred, email: e.target.value })
                }}
                className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-500 outline-none transition duration-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-5">
              <input
                type="password"
                placeholder='Password'
                value={userCred.password}
                onChange={(e) => {
                  setUserCred({ ...userCred, password: e.target.value })
                }}
                className='w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-500 outline-none transition duration-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </>
        ) : (
          <div className="mb-5">
            <input
              type="tel"
              placeholder='Phone Number'
              value={userCred.phone}
              onChange={(e) => {
                setUserCred({ ...userCred, phone: e.target.value })
              }}
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
            onClick={handleLogin}
            className='bg-orange-600 hover:bg-orange-700 w-full text-white text-center py-3 font-bold rounded-lg transition duration-200 shadow-md disabled:bg-gray-400'
            disabled={loading}
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </div>

  
        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <p className="mx-4 text-gray-500 text-sm">OR</p>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-3 p-3 w-full rounded-lg transition duration-150 font-medium text-gray-700 disabled:opacity-50"
            disabled={loading}
          >
         
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,19.034-8.159,19.611-18.917V20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.664,8.307,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.914-1.841,13.25-4.908l-6.643-4.898C29.622,34.02,26.963,35,24,35c-5.263,0-9.734-2.887-12.063-7.108l-6.848,5.326C9.522,39.73,16.299,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.002,0.001-0.003,0.002-0.005l6.848,5.326c-0.106,0.083-0.224,0.162-0.347,0.237C39.673,38.874,44,33.483,44,28C44,26.919,43.864,25.867,43.611,24.84V20.083z" />
            </svg>
            Sign In with Google
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className='text-gray-600 text-sm'>
            Don't have an account? <Link className='text-orange-500 hover:text-orange-700 font-bold transition duration-200' to={'/signup'}>Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}