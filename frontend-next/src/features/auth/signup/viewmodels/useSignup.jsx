"use client";
import React, { useState, useContext } from "react";
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
                alert("Signup successful! Please login.");
                router.push("/login");
            }
            setloading(false);
        } catch (error) {
            setloading(false);
            setErrors({ general: error.message || "Signup failed" });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    return {
        role,
        userdata,
        errors,
        setRole,
        handleInputChange,
        handleSignup,
    }
}