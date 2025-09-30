import React, { useState, useEffect, useContext } from "react";
import { signupUser, userSignupFunction } from "../repository/signupFuncion";
import { useNavigate } from "react-router";
import Mycontext from "../../../context/mycontext";
import { token, verifyToken } from "../repository/token";
export const useSignup = () => {
    const navigate = useNavigate();
    const context = useContext(Mycontext);
    const { setloading, setisLoggedIn, loading, isLoggedIn} = context;
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

    const handleSignup = async () => {
        // Only validate form inputs here
        if (!validate()) {
            setisLoggedIn(false);
            return;
        }

        setloading(true);

        try {
            const { success, token } = await userSignupFunction({ role, userdata, setUserData });
            if (success) {
                  localStorage.setItem("token", token);
                //   if (verifyToken()) {
                setisLoggedIn(true);
                navigate("/pglist");
                console.log(token);
                //   } else {
                    setisLoggedIn(false);
                //   }
            } else {
                setisLoggedIn(false);
            }

            setloading(false);
        } catch (error) {
            setloading(false);
            setisLoggedIn(false);
            setErrors({ general: error.message });
        }
    };

    return {
        role,
        userdata,
        errors,
        validate,
        setRole,
        setUserData,
        handleSignup,
        loading,
        isLoggedIn
    }
}