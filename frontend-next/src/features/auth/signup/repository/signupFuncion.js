const BASE_URL = "/api/auth";

export const signupUser = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      throw data || { message: "Signup failed" };
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const userSignupFunction = async ({ role, userdata, setUserData }) => {
  try {
    const payload = {
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      email: userdata.email,
      password: userdata.password,
      phone: userdata.phone,
      role: role,
    };

    const data = await signupUser(payload);

    if (data.userId && data.token) {
      // Store token and user data in localStorage
      localStorage.setItem('zibmate_token', data.token);
      localStorage.setItem('zibmate_users', JSON.stringify(data.user));
      
      // Clear form
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
      });
      
      return true;
    } else {
      throw new Error("Signup failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('zibmate_token');
  }
  return null;
};