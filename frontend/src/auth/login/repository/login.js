import axios from "axios";

const BASE_URL = "https://zibmate.com//";

export const loginUser = async ({ email, password,phone }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password,phone });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};