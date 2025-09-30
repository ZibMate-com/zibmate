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
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}
      <div className="login_Form 0 px-1 lg:px-8 py-6 border border-gray-400 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className='text-center text-2xl font-bold text-orange-500 '>
            Login
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
        {role === "owner" ? (
          <>
            <div className="mb-3">
              <input
                type="email"
                placeholder='Email Address'
                value={userCred.email}
                onChange={(e) => {
                  setUserCred({
                    ...userCred,
                    email: e.target.value
                  })
                }}
                className=' border border-gray-400 px-2 py-2 w-96 rounded-md outline-none '
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
                  setUserCred({
                    ...userCred,
                    password: e.target.value
                  })
                }}
                className=' border border-gray-400 px-2 py-2 w-96 rounded-md outline-none '
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
                setUserCred({
                  ...userCred,
                  phone: e.target.value
                })
              }}
              className=' border border-gray-400 px-2 py-2 w-96 rounded-md outline-none '
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        )}
        <div className="mb-5">
          <button
            type='button'
            onClick={handleLogin}
            className='bg-orange-500 hover:bg-orange-600 w-full text-white text-center py-2 font-bold rounded-md '
          >
            Login
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mb-5">
          <h1>Or </h1>
          <div>
            < button onClick={handleGoogleSignIn} className="border border-gray-400 flex items-center gap-3 p-2 rounded-xl mt-3">
              <img src="src/assets/svg/google-icon-logo-svgrepo-com.svg " alt="" />
              Sign In using Google
            </button>
          </div>
        </div>
        <div>
          <h2 className='text-black'>Don't Have an account <Link className=' text-orange-500 font-bold' to={'/signup'}>Signup</Link></h2>
        </div>
      </div>
    </div>
  );
}