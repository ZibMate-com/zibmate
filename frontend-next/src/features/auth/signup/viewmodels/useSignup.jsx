"use client";
import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { userSignupFunction } from "../repository/signupFuncion";
import { useRouter } from "next/navigation";
import Mycontext from "../../../../context/mycontext";

export const useSignup = () => {
  const router = useRouter();
  const { setloading, setisLoggedIn } = useContext(Mycontext);
  const [role, setRole] = useState("owner");
  const [errors, setErrors] = useState({});
  const [userdata, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;

    if (!userdata.firstName) {
      newErrors.firstName = "First name is required";
    } else if (!nameRegex.test(userdata.firstName)) {
      newErrors.firstName = "First name must contain only letters";
    }

    if (!userdata.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userdata.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!userdata.password) {
      newErrors.password = "Password is required";
    } else if (userdata.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!userdata.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(userdata.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    } else if (/^(\d)\1{9}$/.test(userdata.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    } else if (["1234567890", "0987654321", "1234512345", "9876543210"].includes(userdata.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    } else if (/^(\d{5})\1$/.test(userdata.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) {
      return;
    }

    setloading(true);
    try {
      const backendRole = role === "buyer" ? "user" : role;
      const success = await userSignupFunction({ role: backendRole, userdata, setUserData });

      if (success) {
        toast.success("Signup successful! Welcome aboard!");

        // Redirect based on role
        if (role === "owner") {
          router.push("/owner-dashboard"); // Owner dashboard
        } else {
          router.push("/findpg"); // Buyer/User page
        }
      }
      setloading(false);
    } catch (error) {
      setloading(false);
      toast.error(error.message || "Signup failed");
      setErrors({ general: error.message || "Signup failed" });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    role,
    userdata,
    errors,
    setRole,
    handleInputChange,
    handleSignup,
  };
};
