"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
const initialData = {
  basic_details: {
    fullName: "",
    email: "",
    phone: "",
    status: "",
    city: "",
    stayDuration: "",
  },
  pg_details: {
    roomType: "",
    monthlyRent: "",
    foodQuality: "",
    referralSource: "",
    otherSource: "",
  },
  problems: {
    findingProblems: [],
    currentProblems: [],
    wishIKnew: "",
    otherFindingProblem: "",
  },
  reviews: {
    topPriorities: [],
    reviewImportance: "",
    finalComments: "",
  },
};

const initialErrors = {
  basic_details: {},
  pg_details: {},
  problems: {},
  reviews: {},
};

export const useSurveyForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (section, e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: "",
      },
    }));
  };

  const handleCheckbox = (section, field, value) => {
    setFormData((prev) => {
      const current = prev[section][field];
      const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updated,
        },
      };
    });
  };

  const validateSection = (section) => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (section === "basic_details") {
      //   if (!formData.basic_details.fullName.trim()) {
      //     newErrors.basic_details.fullName = 'Full name is required';
      //     isValid = false;
      //   }

      //   if (!formData.basic_details.phone.trim()) {
      //     newErrors.basic_details.phone = 'Phone number is required';
      //     isValid = false;
      //   } else if (!/^[6-9]\d{9}$/.test(formData.basic_details.phone)) {
      //     newErrors.basic_details.phone = 'Enter a valid 10-digit Indian phone number';
      //     isValid = false;
      //   }
      if (!formData.basic_details.email.trim()) {
        newErrors.basic_details.email = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.basic_details.email)) {
        newErrors.basic_details.email = "Enter a valid email";
        isValid = false;
      }
      if (!formData.basic_details.status) {
        newErrors.basic_details.status = "Please select your status";
        isValid = false;
      }
      if (!formData.basic_details.city.trim()) {
        newErrors.basic_details.city = "City is required";
        isValid = false;
      }
      if (!formData.basic_details.stayDuration) {
        newErrors.basic_details.stayDuration = "Please select stay duration";
        isValid = false;
      }
    }

    if (section === "pg_details") {
      if (!formData.pg_details.roomType) {
        newErrors.pg_details.roomType = "Please select room type";
        isValid = false;
      }
      if (!formData.pg_details.monthlyRent) {
        newErrors.pg_details.monthlyRent = "Please select monthly rent range";
        isValid = false;
      }
      if (!formData.pg_details.referralSource) {
        newErrors.pg_details.referralSource = "Please select how you found your PG";
        isValid = false;
      }
    }

    if (section === "problems") {
      if (formData.problems.findingProblems.length === 0) {
        newErrors.problems.findingProblems = "Select at least one problem";
        isValid = false;
      }
      if (formData.problems.currentProblems.length === 0) {
        newErrors.problems.currentProblems = "Select at least one current problem";
        isValid = false;
      }
    }

    if (section === "reviews") {
      if (formData.reviews.topPriorities.length === 0) {
        newErrors.reviews.topPriorities = "Select at least one priority";
        isValid = false;
      }
      if (!formData.reviews.reviewImportance) {
        newErrors.reviews.reviewImportance = "Please select review importance";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors(initialErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSection("reviews")) return;

    try {
      const res = await fetch("/api/survey-form/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Thank you for submitting the form!");
        resetForm();
        router.push("/coming-soon");
      } else if (res.status === 409) {
        toast.error("You've already submitted the survey with this email");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return {
    formData,
    errors,
    validateSection,
    handleChange,
    handleCheckbox,
    handleSubmit,
    resetForm,
  };
};
