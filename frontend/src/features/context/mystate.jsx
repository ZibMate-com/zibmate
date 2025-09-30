import { useState } from "react"
import Mycontext from "./mycontext";

export const MyState = ({children}) =>{
    const [loading , setloading] = useState(false);
    const [isLoggedIn , setisLoggedIn] = useState(false);
    const [loggedUser ,setUser] = useState(null);
    return <Mycontext.Provider value={{
        loading,
        setloading,
        isLoggedIn,
        setisLoggedIn,
        loggedUser,
        setUser
    }
}>{children}</Mycontext.Provider>
}