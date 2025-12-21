import { useState } from "react"
import Mycontext from "./mycontext";

export const MyState = ({children}) =>{
    const [loading , setloading] = useState(false);
    const [isLoggedIn , setisLoggedIn] = useState(false);
    const [loggedUser ,setUser] = useState(null);
    const [activeStep , setActiveStep] = useState(2);
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