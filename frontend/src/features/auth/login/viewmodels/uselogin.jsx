import React, { useState, useEffect, useContext } from "react";
import { loginUser, userLoginFunction } from "../repository/login";
import { useNavigate } from "react-router-dom";
import Mycontext from "../../../context/mycontext";
import { EmailAuthProvider, linkWithCredential, signInWithPopup } from "firebase/auth";
import { Auth, Firedb, provider } from "../../../firebase/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";

 const useLogin = () => {
    const navigate = useNavigate();
    const { setloading, setisLoggedIn, loading, isLoggedIn, loggedUser, setUser } = useContext(Mycontext);

    const [role, setRole] = useState("owner");
    const [userCred, setUserCred] = useState({
        email: "",
        password: "",
        phone: ""
    });
    // const [googleUser , setgoogleUser] = useState({})
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(Auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unSubscribe();
        }
    }, [])

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



    const handleLogin = async () => {
        if (!validate() && !verifyToken()) {
            setisLoggedIn(false);
            return;
        }
        setloading(true);
        try {
            const success = await userLoginFunction({ role, userCred, setUserCred });
            setloading(false);
            if (success) {
                setisLoggedIn(true);
                if (role === "buyer") {
                    navigate("/findpg");
                    localStorage.setItem("role", JSON.stringify(role))
                } else {
                    navigate(`/`);
                }
            } else {
                setisLoggedIn(false);
            }
        } catch (error) {
            setloading(false);
            setisLoggedIn(false);
            setErrors({ general: error.message });

        }
    };

    const handleGoogleSignIn = async () => {
        setloading(true);
        try {
            const result = await signInWithPopup(Auth, provider);
            const userAuth = result.user;
            const { displayName, email, uid } = userAuth;

            const userRef = collection(Firedb, "user");
            const q = query(userRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              
                const existingUser = querySnapshot.docs[0].data();

                if (existingUser.role !== role) {
                    alert(`This email is already registered as a ${existingUser.role}. Please log in as ${existingUser.role}.`);
                    setloading(false);
                    return;
                }

                localStorage.setItem("users", JSON.stringify(existingUser));
                setisLoggedIn(true);
                navigate(role === "buyer" ? "/findpg" : "/");
                setloading(false);
                return;
            }

        
            const newUser = {
                name: displayName,
                email: email,
                role: role,
                uid: uid,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            await addDoc(userRef, newUser);

            localStorage.setItem("users", JSON.stringify(newUser));
            setisLoggedIn(true);
            navigate(role === "buyer" ? "/findpg" : "/");
            setloading(false);

        } catch (error) {
            console.error("Google sign-in error:", error);
            setloading(false);
            setisLoggedIn(false);
            setErrors({ general: error.message });
        }
    };

    return {
        role,
        setRole,
        errors,
        userCred,
        setUserCred,
        handleLogin,
        loading,
        isLoggedIn,
        handleGoogleSignIn,
    };
};
export default useLogin