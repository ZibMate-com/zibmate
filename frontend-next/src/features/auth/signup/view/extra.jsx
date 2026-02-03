"use client";
import React, { useState, useEffect } from "react";
import { useSignup } from "./viewmodels/useSignup";
import { signupUser } from "./repository/signup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { Auth, Firedb } from "../../firebase/firebaseconfig";
import { useRouter } from "next/navigation";
export const SignUp = () => {
  const { role, userdata, errors, validate, setRole, setUserData, handleSubmit } = useSignup();
  // console.log(signupUser());
  const router = useRouter();
  const userSignupFunction = async () => {
    // if (userdata.firstName === "" || userdata.email === "" || userdata.password === "") {
    //     alert("All fields are empty");
    //     return false;
    // }
    // setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(Auth, userdata.email, userdata.password);

      const user = {
        name: userdata.firstName,
        email: users.user.email,
        uid: users.user.uid,
        role: role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const UserRef = collection(Firedb, "user");
      await addDoc(UserRef, user);

      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
      });

      // setLoading(false);
      router.push("/login");
      return true;
    } catch (error) {
      // setLoading(false);
      console.log(error);
      throw error;
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl border border-gray-500">
        <form
          className="text-center space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await userSignupFunction();
          }}
        >
          <h2 className="text-3xl font-semibold font-Montserrat">Signup</h2>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              className={`px-6 py-2 rounded-full border font-Lato ${
                role === "owner"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setRole("owner")}
            >
              Owner
            </button>
            <button
              type="button"
              className={`px-6 py-2 rounded-full border font-Lato ${
                role === "buyer"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => setRole("buyer")}
            >
              Buyer
            </button>
          </div>

          <div className="text-left">
            <input
              type="text"
              placeholder="First Name"
              value={userdata.firstName}
              onChange={(e) => setUserData({ ...userdata, firstName: e.target.value })}
              className={`w-full p-2 border rounded-lg focus:ring-2 ${
                errors.firstName ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div className="text-left">
            <input
              type="text"
              placeholder="Last Name"
              value={userdata.lastName}
              onChange={(e) =>
                setUserData({
                  ...userdata,
                  lastName: e.target.value,
                })
              }
              className={`w-full p-2 border rounded-lg focus:ring-2 ${
                errors.lastName ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500"
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          {role === "owner" ? (
            <>
              <div className="text-left">
                <input
                  type="email"
                  placeholder="Email"
                  value={userdata.email}
                  onChange={(e) =>
                    setUserData({
                      ...userdata,
                      email: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded-lg focus:ring-2 ${
                    errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="text-left">
                <input
                  type="password"
                  placeholder="Password"
                  value={userdata.password}
                  onChange={(e) =>
                    setUserData({
                      ...userdata,
                      password: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded-lg focus:ring-2 ${
                    errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500"
                  }`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </>
          ) : (
            <>
              <div className="text-left">
                <input
                  type="email"
                  placeholder="Email"
                  value={userdata.email}
                  onChange={(e) =>
                    setUserData({
                      ...userdata,
                      email: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded-lg focus:ring-2 ${
                    errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="text-left">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={userdata.phone}
                  onChange={(e) =>
                    setUserData({
                      ...userdata,
                      phone: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded-lg focus:ring-2 ${
                    errors.phone ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};
