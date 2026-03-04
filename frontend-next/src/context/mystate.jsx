"use client";
import { useState, useEffect } from "react";
import Mycontext from "./mycontext";
import { getToken, getUser } from "@/features/auth/login/repository/token";

export const MyState = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loggedUser, setUser] = useState(null);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const user = getUser();
    const token = getToken();
    if (user && token) {
      setUser(user);
      setisLoggedIn(true);
    }
  }, []);

  return (
    <Mycontext.Provider
      value={{
        loading,
        setloading,
        isLoggedIn,
        setisLoggedIn,
        loggedUser,
        setUser,
        activeStep,
        setActiveStep,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};
