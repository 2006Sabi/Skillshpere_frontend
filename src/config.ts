
// Centralized configuration for API Base URL
// Falls back to the production URL if the environment variable is not set.
// This ensures that deployed builds work even if the specific VITE env var isn't explicitly configured in the host.

const getApiBaseUrl = () => {
    // Check if we are in development mode (running locally)
    // import.meta.env.MODE is provided by Vite
    if (import.meta.env.MODE === 'development') {
        return import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5001";
    }

    // In production (or any other mode), default to the deployed backend
    return import.meta.env.VITE_API_BASE_URL || "https://backend-skillsphere-0r4p.onrender.com";
};

export const API_BASE = getApiBaseUrl();
