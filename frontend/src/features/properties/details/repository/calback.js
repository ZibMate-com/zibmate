const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/requests`;

export const createRequest = async (payload) => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/tenent/create`, {
            method: 'POST',
            headers: {
                 "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
            throw data || { message: "Request Failed" };
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const userCreateFunction = async (tenentDetails, setTenentDetails) => {
    try {
        const payload = {
            full_name: tenentDetails.full_name,
            email: tenentDetails.email,
            phone: tenentDetails.phone,
            pg_id: tenentDetails.pg_id
        };

        const data = await createRequest(payload);
        console.log(data);

        if (data) {
            setTenentDetails({
                full_name: '',
                email: '',
                phone: '',
            })
            return true;
        } else {
            throw new Error("Signup failed");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}