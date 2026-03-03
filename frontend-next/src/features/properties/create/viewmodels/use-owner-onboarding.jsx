"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Mycontext from "../../../../context/mycontext";

export const useOwnerOnboardingForm = () => {
  const { setloading, activeStep, setActiveStep } = useContext(Mycontext);
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    personal: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      gender: "",
      nationality: "",
    },
    property: {
      propertyName: "",
      houseNumber: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      zip: "",
      discount: "",
      maplink: "",
      occupancy: [],
      prices: {},
      lookingFor: "Any",
      facilities: [],
      description: "",
    },
  });

  // ✅ CHANGED: Store Cloudinary URLs instead of File objects
  const [imagePreviews, setImagePreviews] = useState([]);

  /* ------------------ VALIDATION ------------------ */
  const validate = (step) => {
    const e = {};
    const phoneRegex = /^\d{10}$/;
    const zipRegex = /^\d{6}$/;

    if (step === 1) {
      const p = formData.personal;
      if (!phoneRegex.test(p.phone)) e.phone = "Invalid phone";
      if (!p.gender) e.gender = "Gender required";
    }

    if (step === 2) {
      const p = formData.property;
      if (!p.propertyName) e.propertyName = "Required";
      if (!p.houseNumber) e.houseNumber = "Required";
      if (!p.street) e.street = "Required";
      if (!p.city) e.city = "Required";
      if (!p.state) e.state = "Required";
      if (!zipRegex.test(p.zip)) e.zip = "Invalid ZIP";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ------------------ HANDLERS ------------------ */
  const handleChange = (e, section, occupancyType = null) => {
    const { name, value } = e.target;

    if (section === "property" && occupancyType) {
      setFormData((prev) => ({
        ...prev,
        property: {
          ...prev.property,
          prices: {
            ...prev.property.prices,
            [occupancyType]: value,
          },
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const toggleOccupancy = (occu) => {
    setFormData((prev) => ({
      ...prev,
      property: {
        ...prev.property,
        occupancy: prev.property.occupancy.includes(occu)
          ? prev.property.occupancy.filter((o) => o !== occu)
          : [...prev.property.occupancy, occu],
      },
    }));
  };

  const toggleFacility = (facility) => {
    setFormData((prev) => ({
      ...prev,
      property: {
        ...prev.property,
        facilities: prev.property.facilities.includes(facility)
          ? prev.property.facilities.filter((f) => f !== facility)
          : [...prev.property.facilities, facility],
      },
    }));
  };

  // ✅ NEW: Handle Cloudinary URLs
  const handleCloudinaryImages = (urls) => {
    setImagePreviews(urls);
  };

  /* ------------------ NAVIGATION ------------------ */
  const next = () => {
    if (validate(activeStep)) setActiveStep((s) => s + 1);
  };

  const back = () => setActiveStep((s) => s - 1);

  const submitAll = async () => {
    setloading(true);
    try {
      const adminToken = localStorage.getItem("zibmate_adminToken");

      if (!adminToken) {
        throw new Error("No admin token found. Please login again.");
      }

      // ✅ CHANGED: Send JSON instead of FormData
      const propertyPayload = {
        ...formData.property,
        phone: formData.personal.phone,
        imageUrls: imagePreviews, // ✅ Send Cloudinary URLs
      };

      const res = await fetch("/api/pg", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json", // ✅ Changed to JSON
        },
        body: JSON.stringify({ property: JSON.stringify(propertyPayload) }),
      });

      const responseText = await res.text();
      console.log("Response status:", res.status);
      console.log("Response text:", responseText);

      if (!res.ok) {
        throw new Error(`Server error (${res.status}): ${responseText}`);
      }

      const result = JSON.parse(responseText);
      console.log("Success:", result);

      alert("Onboarding completed!");
      router.push("/admin-dashboard");
    } catch (err) {
      console.error("Submission error:", err);
      alert(err.message || "Something went wrong!");
    } finally {
      setloading(false);
    }
  };

  return {
    activeStep,
    errors,
    formData,
    handleChange,
    toggleOccupancy,
    toggleFacility,
    handleCloudinaryImages, // ✅ Export new handler
    imagePreviews,
    next,
    back,
    submitAll,
  };
};
