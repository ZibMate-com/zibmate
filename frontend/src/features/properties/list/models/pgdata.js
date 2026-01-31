export const getPgData = async () => {
    try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${baseUrl}/api/pg`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to fetch PG data');
        return await response.json();
    } catch (error) {
        console.error("Error fetching filtered PGs:", error);
        return [];
    }
};
