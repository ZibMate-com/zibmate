import axios from "axios";
const BASE_URL = "https://zibmate.com/"

export const signupUser = async (payload) => {
  try {
    const backendPayload = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password,
      role : payload.role
    };
    const response = await axios.post(`${BASE_URL}/signup`, backendPayload);
    return response.data;
    
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};