"use client";
import { useState, useContext } from "react";
import Mycontext from "../../../../context/mycontext";
import { useRouter } from "next/navigation";

export const usePgForm = () => {
    const { setloading } = useContext(Mycontext);
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discount: "",
        address: "",
        locationLink: "",
        occupancy: [],
        lookingFor: "Any",
        city: "",
        facilities: [], // Changed to actual array
    });

    const [imageFiles, setImageFiles] = useState([]); // Store actual File objects
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);

        // Create previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const toggleOccupancy = (occu) => {
        setFormData(prev => ({
            ...prev,
            occupancy: prev.occupancy.includes(occu)
                ? prev.occupancy.filter(f => f !== occu)
                : [...prev.occupancy, occu]
        }));
    };
    const toggleFacility = (facility) => {
        setFormData(prev => ({
            ...prev,
            facilities: prev.facilities.includes(facility)
                ? prev.facilities.filter(f => f !== facility)
                : [...prev.facilities, facility]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        try {
            const token = localStorage.getItem("token");

            // Use FormData for file uploads
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('discount', formData.discount || 0);
            data.append('location', formData.address);
            data.append('locationLink', formData.locationLink);
            data.append('occupancy', JSON.stringify(formData.occupancy));
            data.append('lookingFor', formData.lookingFor);
            data.append('city', formData.city);
            data.append('facilities', JSON.stringify(formData.facilities));

            // Append all images
            imageFiles.forEach(file => {
                data.append('images', file);
            });

            const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await fetch(`${baseUrl}/api/pg`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                    // checking if Content-Type needs to be omitted for FormData, yes it does.
                },
                body: data
            });

            if (!response.ok) {
                const errData = await response.json();
                throw { response: { data: errData } }; // mimicking axios error structure for catch block
            }

            setloading(false);
            alert("Property posted successfully!");
            router.push("/profile/owner");
        } catch (error) {
            setloading(false);
            console.error("Error posting property: ", error);
            alert("Failed to post property: " + (error.response?.data?.message || "Server error"));
        }
    };

    return {
        formData,
        imagePreviews,
        handleChange,
        handleFileChange,
        removeImage,
        toggleFacility,
        toggleOccupancy,
        handleSubmit,
        activeStep,
        setActiveStep,
    };
};