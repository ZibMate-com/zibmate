import { useState } from "react"
import Mycontext from "./mycontext";

export const MyState = ({children}) =>{
    const [loading , setloading] = useState(false);

    return <Mycontext.Provider value={{
        loading,
        setloading
    }
}>{children}</Mycontext.Provider>
}