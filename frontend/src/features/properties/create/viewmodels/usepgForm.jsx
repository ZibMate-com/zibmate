import { useState, useContext } from "react";
import Mycontext from "../../../../context/mycontext";
import { useNavigate } from "react-router-dom";

export const usePgForm = () => {
    const { setloading } = useContext(Mycontext);
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        discount: "",
        address: "",
        maplink: "",
        occupancy: [],
        prices: {},           
        lookingFor: "Any",
        city: "",
        facilities: []
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    /* ----------------- INPUT HANDLER ----------------- */
    const handleChange = (e, occupancyType = null) => {
        const { name, value } = e.target;

        if (occupancyType) {
            setFormData(prev => ({
                ...prev,
                prices: {
                    ...prev.prices,
                    [occupancyType]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    /* ----------------- IMAGE HANDLERS ----------------- */
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...previews]);
    };

    const removeImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    /* ----------------- TOGGLES ----------------- */
    const toggleOccupancy = (occu) => {
        setFormData(prev => {
            const updated = prev.occupancy.includes(occu)
                ? prev.occupancy.filter(o => o !== occu)
                : [...prev.occupancy, occu];

            return { ...prev, occupancy: updated };
        });
    };

    const toggleFacility = (facility) => {
        setFormData(prev => ({
            ...prev,
            facilities: prev.facilities.includes(facility)
                ? prev.facilities.filter(f => f !== facility)
                : [...prev.facilities, facility]
        }));
    };

    /* ----------------- SUBMIT ----------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);

        try {
            const token = localStorage.getItem("token");
            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("discount", formData.discount || 0);
            data.append("address", formData.address);
            data.append("maplink", formData.maplink);
            data.append("lookingFor", formData.lookingFor);
            data.append("city", formData.city);

            data.append("occupancy", JSON.stringify(formData.occupancy));
            data.append("prices", JSON.stringify(formData.prices)); // ✅ important
            data.append("facilities", JSON.stringify(formData.facilities));

            imageFiles.forEach(file => {
                data.append("images", file);
            });

            const baseUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${baseUrl}/api/pg`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: data
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Failed");
            }

            setloading(false);
            alert("Property posted successfully!");
            navigate("/profile/owner");

        } catch (error) {
            setloading(false);
            console.error(error);
            alert(error.message || "Server error");
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
        setActiveStep
    };
};
