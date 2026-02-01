const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/requests`;
export const getTenentRequests = async () => {
    try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await fetch(`${BASE_URL}/tenent`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw data || { message: "Request Failed" };
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export const sendmail = async (id) => {
    try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await fetch(`${BASE_URL}/sendmail/${id}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw data || { message: "Request Failed" };
        }
        return data;
    } catch (error) {
        throw error;
    }
}