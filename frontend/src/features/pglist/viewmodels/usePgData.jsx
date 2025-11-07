import { useState, useEffect, useContext } from "react";
import { getPgData } from "../models/pgdata";
import Mycontext from "../../context/mycontext";

export const usePgData = () => {
    const [pgs, setPgs] = useState([]);
    const {loading ,setloading} =useContext(Mycontext);
    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            try {
                const data = await getPgData();
                console.log(data);
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
    return {
        pgs,
        setPgs,
        loading
    }
}