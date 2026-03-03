const BASE_URL = "/api/auth";

// Basic fetch wrapper to handle errors
const fetchRequest = async (url, options) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
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
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    throw error;
  }
};

export const googleLoginUser = async (socialData) => {
  try {
    return await fetchRequest(`${BASE_URL}/google-login`, {
      method: "POST",
      body: JSON.stringify(socialData),
    });
  } catch (error) {
    throw error;
  }
};

export const userLoginFunction = async ({ role, userCred, setUserCred }) => {
  try {
    const data = await loginUser({
      email: userCred.email,
      password: userCred.password,
    });

    // Handle both regular token and adminToken
    if (data.token || data.adminToken) {
      // Tokens are now primarily handled by HTTP-only cookies from the server,
      // but if we need to set it from client-side for immediate state:
      const tokenToStore = data.adminToken || data.token;

      // We don't need to manually set it if the server already did via Set-Cookie,
      // but this ensures it's available if we didn't use HttpOnly.
      // localStorage.setItem("zibmate_token", tokenToStore); // REMOVED

      localStorage.setItem("zibmate_users", JSON.stringify(data.user));

      setUserCred({
        email: "",
        password: "",
        phone: "",
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
