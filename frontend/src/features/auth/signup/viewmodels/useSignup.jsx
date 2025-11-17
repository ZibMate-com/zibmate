import React, { useState, useEffect, useContext } from "react";
import { signupUser, userSignupFunction } from "../repository/signupFuncion";
import { useNavigate } from "react-router";
import Mycontext from "../../../context/mycontext";import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth,Firedb } from "../../../firebase/firebaseconfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";

// import { token, verifyToken } from "../repository/token";
export const useSignup = () => {
    const navigate = useNavigate();
    const context = useContext(Mycontext);
    const { setloading, setisLoggedIn, loading, isLoggedIn } = context;
    const [role, setRole] = useState("owner");
    const [errors, setErrors] = useState({});
    const [userdata, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
    });

    const userSignupFunction = async () => {
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
                })
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
            localStorage.setItem("users",JSON.stringify(user))
            // setLoading(false);
            if (role.toLowerCase() === "owner") {
                navigate("/postproperty")
            }else navigate("/findpg")
            return true;
        } catch (error) {
            // setLoading(false);
            console.log(error);
            throw error;
        }
    };

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
     const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };
    return {
        role,
        userdata,
        errors,
        validate,
        setRole,
        handleInputChange,
        handleSignup,
        loading,
        isLoggedIn
    }
}