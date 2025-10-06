import { useState, useEffect, useContext } from "react";
import { getPgData } from "../models/pgdata";
import Mycontext from "../../../features/context/mycontext";

export const usePgData = () => {
    const [pgs, setPgs] = useState([]);
    const {loading ,setloading} =useContext(Mycontext);
    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            try {
                const data = await getPgData();
                setPgs(data);
                setloading(false)
                return data
            } catch (error) {
                console.log(error);
                setloading(false)
            }
        };
       setPgs(fetchData);
    }, []);
    console.log("pglist two",pgs);
    
    return {
        pgs,
        setPgs,
        loading
    }
}