import { useEffect, useState } from "react"
import { getTenentRequests } from "../repository/admin";
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
                
            }
        }
        fetchTenetRequests();
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem('admin-token');
        navigate('/login');
    }
    return {
        tenentRequest,
        handleLogout
    }
}