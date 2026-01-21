import { useState, useEffect } from "react"
import Mycontext from "./mycontext";

export const MyState = ({ children }) => {
    const [loading, setloading] = useState(false);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [loggedUser, setUser] = useState(null);
    const [activeStep, setActiveStep] = useState(2);

    useEffect(() => {
        const user = localStorage.getItem("users");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setisLoggedIn(true);
        }
    }, []);

    return <Mycontext.Provider value={{
        loading,
        setloading,
        isLoggedIn,
        setisLoggedIn,
        loggedUser,
        setUser,
        activeStep,
        setActiveStep
    }
    }>{children}</Mycontext.Provider>
}