export const savedPgService = {
  savePg: async (pgId) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Please login to save PGs");

    const response = await fetch("/api/pg/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pgId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to save PG");
    }

    return response.json();
  },

  getSavedPgs: async () => {
    const token = localStorage.getItem("token");
    if (!token) return [];

    const response = await fetch("/api/pg/save", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return [];
    }

    return response.json();
  },
};
