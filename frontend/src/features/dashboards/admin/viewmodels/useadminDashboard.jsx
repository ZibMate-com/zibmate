import { useEffect, useState } from "react"
import { getTenentRequests, sendmail } from "../repository/admin";
import {  useNavigate } from "react-router-dom";
export const useAdminDashboard  = ()=>{
    const [tenentRequest , setTenentRequests] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchTenetRequests = async()=>{
            try {
                 const data =  await getTenentRequests();
                 setTenentRequests(data);
                 
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchTenetRequests();
    },[tenentRequest])

    const handleSendDetails = async (id)=>{
        try {
            const data = await sendmail(id);
            if (data) console.log("Mail sent successfull");
             
        } catch (error) {
            console.log(error);   
        }
    }
    const handleLogout = ()=>{
        localStorage.removeItem('admin-token');
        navigate('/login');
    }
    return {
        tenentRequest,
        handleLogout,
        handleSendDetails
    }
}