import React, { useState, useEffect } from "react";
import { signupUser } from "../repository/signup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { Auth, Firedb } from "../../../firebase/firebaseconfig";
import { useNavigate } from "react-router";
export const useSignup = () => {
    const navigate = useNavigate();
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
        if (userdata.firstName === "" || userdata.email === "" || userdata.password === "") {
            alert("All fields are empty");
            return false;
        }
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

            // setLoading(false);
            navigate("/login");
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


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (validate()) {
    //         try {
    //             const users = JSON.parse(localStorage.getItem("users")) || [];
    //             users.push(userdata);
    //             localStorage.setItem("users", JSON.stringify(users));
    //             await userSignupFunction();
    //             alert("Signup successful!");
    //             setUserData({
    //                 firstName: "",
    //                 lastName: "",
    //                 email: "",
    //                 password: "",
    //                 phone: "",
    //             });
    //         } catch (error) {
    //             alert(error.message || "Signup failed");
    //         }
    //     }
    // };

    return {
        role,
        userdata,
        errors,
        validate,
        setRole,
        setUserData,
        userSignupFunction
    }
}