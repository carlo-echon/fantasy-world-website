"use client"

export const checkIsAdmin = () => {
    // Check if running in a browser environment
    if (typeof window !== "undefined") {
        const storedIsAdmin = localStorage.getItem("isAdmin");
        return storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
    }

    // Default return if not in the browser environment
    return false;
};