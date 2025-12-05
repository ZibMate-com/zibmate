import { useState,useEffect, useContext } from "react";
import { Firedb } from "../../firebase/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import Mycontext from "../../context/mycontext";
export const usePgForm = () => {
    const {loading,setloading} = useContext(Mycontext);
 
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        images: [""],
        price: "",
        discount: "",
        address: "",
        locationLink: "",
        occupancy: "",
        lookingFor: "",
        facilities: [""],
        city: "",
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleArrayChange = (e, index, field) => {
        const newArray = [...formData[field]];
        newArray[index] = e.target.value;
        setFormData({ ...formData, [field]: newArray });
    };


    const addArrayField = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        try {
            await addDoc(collection(Firedb, "pgData"), {
                ...formData,
                id: Number(formData.id),
                price: Number(formData.price),
                discount: Number(formData.discount),
            });
           setloading(false)
            setFormData({
                name: "",
                description: "",
                images: [""],
                price: "",
                discount: "",
                address: "",
                locationLink: "",
                occupancy: "",
                lookingFor: "",
                facilities: [""],
                city: "",
            });
        } catch (error) {
            setloading(false)
            console.error("Error adding document: ", error);
        }
    };

return {
    formData,
    handleChange,
    handleSubmit,
    handleArrayChange,
    addArrayField,
    loading,
    activeStep
}
}