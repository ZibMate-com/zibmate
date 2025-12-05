import { useContext, useState } from "react";
import Mycontext from "../../context/mycontext";
import { Firedb } from "../../firebase/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
export const useVerificationForm = () => {
  const { loading, setloading, activeStep, setActiveStep } = useContext(Mycontext);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    PersonalData: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      gender: "",
      nationality: "",
      aadhar: ""
    },
    PropertyData: {
      propertyName: "",
      houseNumber: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      zip: ""
    }

  });
  
  const [errors, setErrors] = useState({});

  const validate = (formType) => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const aadhaarRegex = /^\d{13}$/;
    const phoneRegex = /^\d{10}$/;
    const zipRegex = /^\d{6}$/;


    if (formType === "personal") {
      if (!formData.PersonalData.firstname.trim())
        newErrors.firstname = "First name is required";
      else if (!nameRegex.test(formData.PersonalData.firstname))
        newErrors.firstname = "First name must contain only letters";

      if (!formData.PersonalData.lastname.trim())
        newErrors.lastname = "Last name is required";
      else if (!nameRegex.test(formData.PersonalData.lastname))
        newErrors.lastname = "Last name must contain only letters";

      if (!formData.PersonalData.email)
        newErrors.email = "Email is required";
      else if (!emailRegex.test(formData.PersonalData.email))
        newErrors.email = "Invalid email format";

      if (!formData.PersonalData.phone)
        newErrors.phone = "Phone number is required";
      else if (!phoneRegex.test(formData.PersonalData.phone))
        newErrors.phone = "Phone must be 10 digits";

      if (!formData.PersonalData.gender)
        newErrors.gender = "Gender is required";

      if (!formData.PersonalData.nationality.trim())
        newErrors.nationality = "Nationality is required";

      if (!formData.PersonalData.aadhar)
        newErrors.aadhar = "Aadhaar number is required";
      else if (!aadhaarRegex.test(formData.PersonalData.aadhar))
        newErrors.aadhar = "Aadhaar must be 12 digits";
    }


    if (formType === "property") {
      if (!formData.PropertyData.propertyName.trim())
        newErrors.propertyName = "Property name is required";

      if (!formData.PropertyData.houseNumber.trim())
        newErrors.houseNumber = "House / Flat number is required";

      if (!formData.PropertyData.street.trim())
        newErrors.street = "Street / Locality is required";

      if (!formData.PropertyData.city.trim())
        newErrors.city = "City is required";

      if (!formData.PropertyData.state.trim())
        newErrors.state = "State is required";

      if (!formData.PropertyData.zip)
        newErrors.zip = "ZIP Code is required";
      else if (!zipRegex.test(formData.PropertyData.zip))
        newErrors.zip = "ZIP must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const section = e.target.dataset.section;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };
  const handleNext = (e) => {
    e.preventDefault()
    if (validate("personal")) {
      setActiveStep(prev => prev + 1);
      sessionStorage.setItem("personal-details", JSON.stringify(formData.PersonalData))
    } else {
      console.log("try again");
      console.log(errors);

    }

  }

  const handleBack = () => {
    setActiveStep(prev => prev - 1)
  }

  // const handlePersonalSubmit = (e) => {
  //     e.preventDefault();
  //     if (validate("personal")) {
  //         console.log("Form submitted successfully:");

  //     } else {
  //         console.log("Validation failed. Please check errors.",errors);
  //     }
  // };
  const handlePropertySubmit = (e) => {
    e.preventDefault();
    if (validate("property")) {
      setActiveStep(prev => prev + 1);
      sessionStorage.setItem("property-details", JSON.stringify(formData.PropertyData))
    } else {
      console.log("Validation failed. Please check errors.");
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    const perosonalDetails = JSON.parse(sessionStorage.getItem("personal-details"))
    const propertyDetaiils = JSON.parse(sessionStorage.getItem("property-details"))
    try {
      await addDoc(collection(Firedb, "verificationReq"), {
        ...perosonalDetails,
        ...propertyDetaiils,
        name : String(perosonalDetails.firstname),
        phone : Number(perosonalDetails.phone),
        email : String(perosonalDetails.email)
      });
      setloading(false)
      navigate("/profile/owner")
      sessionStorage.removeItem("personal-details")
      sessionStorage.removeItem("property-details")
    } catch (error) {
      setloading(false)
      console.error("Error adding document: ", error);
    }
  };
  return {
    loading,
    setloading,
    activeStep,
    errors,
    formData,
    handleNext,
    handleBack,
    handleChange,
    handlePropertySubmit,
    handleFinalSubmit
  }
}