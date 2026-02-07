import toast from "react-hot-toast";

export const getPgData = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`/api/pg`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch PG data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching filtered PGs:", error);
    toast.error("Failed to load properties.");
    return [];
  }
};
