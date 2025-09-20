import React, { useState, useEffect } from "react";
import { signupUser } from "../repository/signup";
export const useSignup = () => {
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

        if (!userdata.lastName) {
            newErrors.lastName = "Last name is required";
        } else if (!nameRegex.test(userdata.lastName)) {
            newErrors.lastName = "Last name must contain only letters";
        }

        if (role === "owner") {
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
        } else if (role === "buyer") {
            if (!userdata.phone) {
                newErrors.phone = "Phone number is required";
            } else if (!/^[0-9]{10}$/.test(userdata.phone) || userdata.phone == "0000000000" || userdata.phone == "1111111111" || userdata.phone == "9999999999") {
                newErrors.phone = "Enter a valid 10-digit phone number";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [userdata]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const users = JSON.parse(localStorage.getItem("users")) || [];
                users.push(userdata);
                localStorage.setItem("users", JSON.stringify(users));
                await signupUser(userdata);
                alert("Signup successful!");
                setUserData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    phone: "",
                });
            } catch (error) {
                alert("Signup failed");
            }
        }
    };

    return {
        role,
        userdata,
        errors,
        validate,
        handleSubmit,
        setRole,
        setUserData
    }
}