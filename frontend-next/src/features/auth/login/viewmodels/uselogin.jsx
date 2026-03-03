"use client";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { userLoginFunction, googleLoginUser } from "../repository/login";
import { useRouter } from "next/navigation";
import Mycontext from "../../../../context/mycontext";
import { Auth, provider } from "../../../firebase/firebaseconfig";
import Cookies from "js-cookie";
import { setUser as setCookieUser } from "../repository/token";
import { signInWithPopup } from "firebase/auth";

const useLogin = () => {
  const router = useRouter();
  const { setloading, setisLoggedIn, setUser } = useContext(Mycontext);

  const [role, setRole] = useState("owner");
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (role === "owner" || role === "user") {
      if (!userCred.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(userCred.email)) {
        newErrors.email = "Enter a valid email address";
      }
      if (!userCred.password) {
        newErrors.password = "Password is required";
      } else if (userCred.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }
    setloading(true);
    try {
      const backendRole = role === "buyer" ? "user" : role;
      const loggedUser = await userLoginFunction({ role: backendRole, userCred, setUserCred });
      setloading(false);
      if (loggedUser) {
        setisLoggedIn(true);
        setUser(loggedUser);
        router.push(role === "owner" ? "/owner-dashboard" : "/findpg");
      }
    } catch (error) {
      setloading(false);
      setisLoggedIn(false);
      setErrors({ general: error.message || "Login failed" });
    }
  };

  const handleGoogleSignIn = async () => {
    setloading(true);
    try {
      const result = await signInWithPopup(Auth, provider);
      const user = result.user;

      const backendRole = role === "buyer" ? "user" : role;

      // Send social profile to our backend
      const data = await googleLoginUser({
        email: user.email,
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ").slice(1).join(" "),
        role: backendRole,
        uid: user.uid,
      });

      if (data.token) {
        Cookies.set("zibmate_token", data.token, { expires: 7, secure: true });
        setCookieUser(data.user);
        setisLoggedIn(true);
        setUser(data.user);

        if (data.user.role === "owner") {
          router.push("/owner-dashboard");
        } else {
          router.push("/findpg");
        }
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      console.error("Google login error:", error);
      toast.error("Google Sign-in failed: " + (error.message || "Unknown error"));
    }
  };

  return {
    role,
    setRole,
    errors,
    userCred,
    setUserCred,
    handleLogin,
    handleGoogleSignIn,
  };
};

export default useLogin;
