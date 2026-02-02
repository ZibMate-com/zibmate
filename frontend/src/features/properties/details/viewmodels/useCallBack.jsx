import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { userCreateFunction } from "../repository/calback";

export const useCallBack = ( onClose ) => {
    const [submitted, setSubmitted] = useState(false);
    const { id } = useParams();
    const [tenentDetails, setTenentDetails] = useState({
        full_name: "",
        email: "",
        phone: "",
        pg_id: ""
    })
    useEffect(() => {
        if (id) {
            setTenentDetails(prev => ({
                ...prev,
                pg_id: id
            }));
        }
    }, [id]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTenentDetails(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await userCreateFunction(tenentDetails, setTenentDetails);
            console.log(response);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                onClose();
            }, 2500);
        } catch (error) {
            console.log(error);

        }

    };

    return {
        submitted,
        handleSubmit,
        tenentDetails,
        handleOnChange
    }
}