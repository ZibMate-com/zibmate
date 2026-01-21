

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

// Basic fetch wrapper to handle errors
const fetchRequest = async (url, options) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw data || { message: "Request failed" };
  }
  return data;
};

export const loginUser = async ({ email, password }) => {
  try {
    return await fetchRequest(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  } catch (error) {
    throw error;
  }
};

export const googleLoginUser = async (socialData) => {
  try {
    return await fetchRequest(`${BASE_URL}/google-login`, {
      method: 'POST',
      body: JSON.stringify(socialData)
    });
  } catch (error) {
    throw error;
  }
};

export const userLoginFunction = async ({ role, userCred, setUserCred }) => {
  try {
    const data = await loginUser({
      email: userCred.email,
      password: userCred.password
    });

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("users", JSON.stringify(data.user));
      setUserCred({
        email: "",
        password: "",
        phone: ""
      });
      return true;
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};