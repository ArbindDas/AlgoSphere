

import axios from "axios";

// URLs
const API_GATEWAY_URL = "http://localhost:8765"; // API Gateway
const AUTH_STORAGE_KEY = "keycloak_auth_data";

const axiosInstance = axios.create({
  baseURL: API_GATEWAY_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============= TOKEN MANAGEMENT =============

/**
 * Store authentication data
 */
const storeAuthData = (authData) => {
  try {
    // Store in localStorage
    localStorage.setItem('keycloak_auth', JSON.stringify(authData));
    
    // Also set default Authorization header for axios
    if (authData.accessToken) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authData.accessToken}`;
    }
    
    console.log("🔐 Auth data stored to localStorage");
  } catch (error) {
    console.error("Failed to store auth data:", error);
  }
};

/**
 * Get stored authentication data
 */
const getAuthData = () => {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to get auth data:", error);
    return null;
  }
};

/**
 * Clear authentication data
 */
const clearAuthData = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    delete axiosInstance.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error("Failed to clear auth data:", error);
  }
};

/**
 * Get access token
 */
const getAccessToken = () => {
  const authData = getAuthData();
  return authData?.accessToken || null;
};

/**
 * Get refresh token
 */
const getRefreshToken = () => {
  const authData = getAuthData();
  return authData?.refreshToken || null;
};

/**
 * Check if user is authenticated
 */
const isAuthenticated = () => {
  const authData = getAuthData();
  if (!authData?.accessToken) return false;
  
  // Optional: Check token expiry
  try {
    const token = authData.accessToken;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expiry;
  } catch {
    return true; // If we can't parse, assume valid
  }
};

/**
 * Refresh token function
 */
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axiosInstance.post("/api/v1/auth/refresh-token", {
      refreshToken: refreshToken
    });

    if (response.data.accessToken) {
      const authData = getAuthData() || {};
      const newAuthData = {
        ...authData,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken || refreshToken,
      };
      storeAuthData(newAuthData);
      return newAuthData.accessToken;
    }
    
    throw new Error("Token refresh failed");
  } catch (error) {
    console.error("Token refresh error:", error);
    clearAuthData(); // Clear invalid tokens
    throw error;
  }
};

// ============= AXIOS INTERCEPTOR FOR AUTO-REFRESH =============

// Add request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const newToken = await refreshAccessToken();
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        clearAuthData();
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// ============= UPDATED SERVICE =============

const keycloakService = {
  /**
   * SIGNUP: Create new user in Keycloak via api-gateway
   */
  signup: async ({ fullName, email, password, confirmPassword }) => {
    try {
      console.log("Starting signup for: ", email);

      const response = await axiosInstance.post("/api/v1/auth/signup", {
        fullName,
        email,
        password,
        confirmPassword,
      });

      console.log("Signup successful ", response.data);
      return response.data;
    } catch (error) {
      console.error("Signup failed", error);
      let errorMessage = "Registration failed. Please try again";

      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
          case 409:
            errorMessage = data?.message || "User already exists";
            break;
          case 400:
            errorMessage = data?.message || "Invalid registration data";
            break;
          case 422:
            errorMessage = data?.message || "Validation failed";
            break;
          case 500:
            errorMessage = data?.message || "Internal server error";
            break;
          default:
            errorMessage = data?.message || `Registration failed (${status})`;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  },

  /**
   * SIGNIN: Login with username/email and password
   */

    signin: async ({ email, password }) => {
  try {
    console.log("Starting login for: ", email);

    const response = await axiosInstance.post("/api/v1/auth/login", {
      email,
      password,
    });

    console.log("🔍 FULL RESPONSE:", response.data);

    // ✅ Extract data from nested structure
    const { data } = response.data;
    
    if (!data || !data.accessToken) {
      console.error("Invalid response structure:", response.data);
      throw new Error("Invalid server response");
    }

    // ✅ CRITICAL: STORE THE TOKEN!
    const authData = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user,
      expiresIn: data.expiresIn,
      refreshExpiresIn: data.refreshExpiresIn,
      scope: data.scope,
      tokenType: data.tokenType,
      timestamp: new Date().toISOString(),
    };
    
    storeAuthData(authData);
    
    console.log("✅ Login successful!", {
      message: response.data.message,
      user: data.user,
      tokenPreview: data.accessToken.substring(0, 30) + '...'
    });

    return response.data;
    
  } catch (error) {
    console.error("Login failed...", error);
    throw error;
  }
},
  /**
   * LOGOUT: Clear tokens and logout from server
   */
  logout: async () => {
    try {
      const authData = getAuthData();
      
      if (authData?.accessToken) {
        // Call backend logout endpoint
        await axiosInstance.post("/api/v1/auth/logout", {
          refreshToken: authData.refreshToken,
        });
      }
      
      // Clear local storage regardless
      clearAuthData();
      console.log("User logged out successfully");
      
      return { success: true, message: "Logged out successfully" };
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local storage even if server call fails
      clearAuthData();
      throw error;
    }
  },

  /**
   * GET CURRENT USER: Get stored user info
   */
  getCurrentUser: () => {
    const authData = getAuthData();
    if (!authData?.user) return null;
    
    return {
      ...authData.user,
      isAuthenticated: true,
      token: authData.accessToken,
    };
  },

  /**
   * VALIDATE TOKEN: Check if token is valid
   */
  validateToken: async () => {
    try {
      const token = getAccessToken();
      if (!token) return { valid: false };
      
      const response = await axiosInstance.post("/api/v1/auth/validate", {
        token: token,
      });
      
      return response.data;
    } catch (error) {
      console.error("Token validation failed:", error);
      return { valid: false };
    }
  },

  /**
   * REFRESH TOKEN: Manually refresh token
   */
  refreshToken: async () => {
    return refreshAccessToken();
  },

  /**
   * CHECK AUTH STATUS
   */
  isAuthenticated: () => {
    return isAuthenticated();
  },

  /**
   * GET ACCESS TOKEN
   */
  getToken: () => {
    return getAccessToken();
  },

  /**
   * FORGOT PASSWORD
   */
  forgotPassword: async (email) => {
    try {
      console.log("🔑 Initiating password reset for:", email);
      
      const response = await axiosInstance.post("/api/v1/auth/forgot-password", {
        email: email,
      });
      
      return response.data;
    } catch (error) {
      console.error("Password reset failed:", error);
      throw new Error(
        error.response?.data?.message || "Failed to send reset email"
      );
    }
  },

  /**
   * RESEND VERIFICATION EMAIL
   */
  resendVerificationEmail: async (email) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/resend-verification", {
        email: email,
      });
      
      return response.data;
    } catch (error) {
      console.error("Resend verification failed:", error);
      throw error;
    }
  },
};

// ============= INITIALIZATION =============

// Initialize axios with stored token on page load
const initAuth = () => {
  const token = getAccessToken();
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Call initialization
initAuth();

export default keycloakService;