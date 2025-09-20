import React, { useState, useEffect } from "react";
import { loginUser } from "../repository/login";
export const useLogin = () => {
    const [role, setRole] = useState("owner");
    const [userCred, setUserCred] = useState({
        email: "",
        password: "",
        phone: ""
    })
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (role === "owner") {
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
        } else if (role === "buyer") {
            if (!userCred.phone) {
                newErrors.phone = "Phone number is required";
            } else if (!/^[0-9]{10}$/.test(userCred.phone)) {
                newErrors.phone = "Enter a valid 10-digit phone number";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [userCred, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const users = JSON.parse(localStorage.getItem("users")) || [];
        console.log(userCred , users);
        
        if (role === "owner") {
            try {
                await loginUser(userCred.email, userCred.password)
                if (users.find(user => user.email === userCred.email && user.password === userCred.password)) {
                    alert("Login successful!");
                } else {
                    alert("Invalid credentials!");
                }
            } catch (error) {
                setErrors(error)
            }
        } else if (role === "buyer") {
            try {
                await loginUser(userCred.email, userCred.password, userCred.phone)
                if (users.find(user => user.phone === userCred.phone)) {
                    alert("Login successful!");
                } else {
                    alert("Invalid credentials!");
                }
            } catch (error) {
                setErrors(error)
            }
        }
    };
    return {
        role,
        setRole,
        errors,
        userCred,
        setUserCred,
        handleSubmit
    }
}