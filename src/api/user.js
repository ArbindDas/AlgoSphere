import axios from "axios";

const API_GATEWAY_URL = "http://localhost:8765"; // api-gateway
const USER_BASE_URL = "/api/admin/users";

const axiosInstance = axios.create({
    baseURL: API_GATEWAY_URL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        try {
            // Get auth data from localStorage
            const authDataString = localStorage.getItem('keycloak_auth');
            
            if (authDataString) {
                const authData = JSON.parse(authDataString);
                
                // Add token to Authorization header
                if (authData.accessToken) {
                    config.headers.Authorization = `Bearer ${authData.accessToken}`;
                }
            }
        } catch (error) {
            console.error("Error reading auth token:", error);
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If token expired (401) and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Get refresh token
                const authDataString = localStorage.getItem('keycloak_auth');
                
                if (authDataString) {
                    const authData = JSON.parse(authDataString);
                    
                    if (authData.refreshToken) {
                        // Call refresh token endpoint
                        const response = await axios.post(
                            `${API_GATEWAY_URL}/api/v1/auth/refresh`,
                            {
                                refreshToken: authData.refreshToken
                            }
                        );

                        const newAuthData = {
                            ...authData,
                            accessToken: response.data.data.accessToken,
                            refreshToken: response.data.data.refreshToken || authData.refreshToken,
                            timestamp: new Date().toISOString(),
                        };

                        // Store new tokens
                        localStorage.setItem('keycloak_auth', JSON.stringify(newAuthData));

                        // Update the failed request with new token
                        originalRequest.headers.Authorization = `Bearer ${newAuthData.accessToken}`;

                        // Retry the original request
                        return axiosInstance(originalRequest);
                    }
                }
            } catch (refreshError) {
                // Refresh failed, clear auth data and redirect to login
                console.error("Token refresh failed:", refreshError);
                localStorage.removeItem('keycloak_auth');
                
                // Redirect to login page (adjust path as needed)
                window.location.href = '/login';
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Handle errors
const handleError = (error) => {
    if (error.response) {
        // Server responded with error status
        console.error("Response error:", error.response.status, error.response.data);
        throw error.response.data;
    } else if (error.request) {
        // No response received
        console.error("No response error:", error.request);
        throw new Error("No response from server");
    } else {
        // Error in request setup
        console.error("Request error:", error.message);
        throw error;
    }
};

// Get all users
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get(USER_BASE_URL);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get user by ID
export const getUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`${USER_BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Create new user
export const createUser = async (userData) => {
    try {
        const response = await axiosInstance.post(USER_BASE_URL, userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Update user
export const updateUser = async (userId, userData) => {
    try {
        const response = await axiosInstance.put(`${USER_BASE_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Delete user
export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`${USER_BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Send verification email
export const sendVerificationEmail = async (userId) => {
    try {
        const response = await axiosInstance.post(`${USER_BASE_URL}/${userId}/send-verification`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Reset password
export const resetPassword = async (userId, newPassword, temporary = true) => {
    try {
        const response = await axiosInstance.post(`${USER_BASE_URL}/${userId}/reset-password`, null, {
            params: {
                newPassword: newPassword,
                temporary: temporary
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
    try {
        const authDataString = localStorage.getItem('keycloak_auth');
        if (!authDataString) return false;
        
        const authData = JSON.parse(authDataString);
        return !!authData.accessToken;
    } catch (error) {
        return false;
    }
};

// Helper function to logout
export const logout = () => {
    localStorage.removeItem('keycloak_auth');
    delete axiosInstance.defaults.headers.common['Authorization'];
    window.location.href = '/login';
};