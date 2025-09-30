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
            } catch (error) {
                console.log(error);
                setloading(false)
                
            }
        };
        fetchData();
    }, []);
    return {
        pgs,
        setPgs,
        loading
    }
}