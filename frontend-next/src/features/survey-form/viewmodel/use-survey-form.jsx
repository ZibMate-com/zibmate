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

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

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

    if (section === "basic_details" && name === "email") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtp("");
    }
  };

  const handleCheckbox = (section, field, value) => {
    setFormData((prev) => {
      const current = prev[section][field];
      const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];

      return {
        ...prev,
        [section]: { ...prev[section], [field]: updated },
      };
    });

    // Clear error for this checkbox group as soon as user picks something
    setErrors((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: "" },
    }));
  };

  const sendOtp = async () => {
    const email = formData.basic_details.email;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prev) => ({
        ...prev,
        basic_details: { ...prev.basic_details, email: "Enter a valid email first" },
      }));
      return;
    }

    setOtpLoading(true);
    try {
      const res = await fetch("/api/otp-verification/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        setOtp("");
        toast.success("OTP sent to your email!");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) return;

    setOtpLoading(true);
    try {
      const res = await fetch("/api/otp-verification/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.basic_details.email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        setOtpVerified(true);
        setOtp("");
        setErrors((prev) => ({
          ...prev,
          basic_details: { ...prev.basic_details, email: "" },
        }));
        toast.success("Email verified! ✅");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch {
      toast.error("Verification failed. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const validateSection = (section) => {
    const sectionErrors = {};

    if (section === "basic_details") {
      if (!formData.basic_details.email.trim()) {
        sectionErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.basic_details.email)) {
        sectionErrors.email = "Enter a valid email";
      } else if (!otpVerified) {
        sectionErrors.email = "Please verify your email with OTP";
      }

      if (!formData.basic_details.status) {
        sectionErrors.status = "Please select your status";
      }

      if (!formData.basic_details.city.trim()) {
        sectionErrors.city = "City is required";
      }

      if (!formData.basic_details.stayDuration) {
        sectionErrors.stayDuration = "Please select stay duration";
      }
    }

    if (section === "pg_details") {
      if (!formData.pg_details.roomType) {
        sectionErrors.roomType = "Please select room type";
      }
      if (!formData.pg_details.monthlyRent) {
        sectionErrors.monthlyRent = "Please select monthly rent range";
      }
      if (!formData.pg_details.referralSource) {
        sectionErrors.referralSource = "Please select how you found your PG";
      }
    }

    if (section === "problems") {
      if (formData.problems.findingProblems.length === 0) {
        sectionErrors.findingProblems = "Select at least one problem";
      }
      if (formData.problems.currentProblems.length === 0) {
        sectionErrors.currentProblems = "Select at least one current problem";
      }
    }

    if (section === "reviews") {
      if (formData.reviews.topPriorities.length === 0) {
        sectionErrors.topPriorities = "Select at least one priority";
      }
    }

    // Only update the current section's errors, leave others untouched
    setErrors((prev) => ({
      ...prev,
      [section]: sectionErrors,
    }));

    // Valid if no error keys exist in this section
    return Object.keys(sectionErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors(initialErrors);
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
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
    otp,
    setOtp,
    otpSent,
    otpVerified,
    otpLoading,
    sendOtp,
    verifyOtp,
  };
};
