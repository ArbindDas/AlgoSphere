

import axios from "axios";

const APP_URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: APP_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to automatically add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

const getToken = () => {
  const userData = localStorage.getItem("user");

  if (userData) {
    try {
      const user = JSON.parse(userData); // FIXED: Was parsing string "userData" instead of variable userData
      
      // for GOOGLE OAuth users
      if (user.authProvider === "GOOGLE") {
        const authToken = localStorage.getItem("accessToken");
        if (authToken) {
          // clear regular token
          localStorage.removeItem("token");
          return authToken;
        }
      } else {
        // for regular user
        const regularToken = user.token || localStorage.getItem("token");
        if (regularToken) {
          // Clear OAuth tokens to avoid conflicts
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return regularToken;
        }
      }
    } catch (error) {
      console.error("Error parsing user data", error);
      clearAllTokens();
    }
  }

  // If no user data, check for any token
  const authToken = localStorage.getItem("accessToken");
  const regularToken = localStorage.getItem("token");

  // If both tokens exist, clear conflict
  if (authToken && regularToken) {
    clearAllTokens();
    return null;
  }
  
  return regularToken || authToken; // Return whichever token exists
};

// Clear all authentication data
const clearAllTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


const signup = async (fullName, email, password) => {
  try {
    console.log("📝 Attempting registration for:", email);

    const response = await axiosInstance.post("/api/v1/auth/signup", {
      fullName,
      email,
      password,
    });

    console.log("✅ Registration response:", response.data);

    // Check response structure - it should be ApiResponseWrapper<SignupResponse>
    const apiResponse = response.data;
    
    if (!apiResponse || apiResponse.status !== 201) {
      throw new Error(apiResponse?.message || "Registration failed");
    }

    // Extract signup data (NOT login data - no token!)
    const signupData = apiResponse.data; // This is SignupResponse
    
    console.log("📦 Signup data received:", signupData);

    // IMPORTANT: Signup does NOT return a token!
    // Do NOT store token or user info in localStorage yet
    // The user needs to login separately

    // You might store just the email for convenience
    localStorage.setItem("lastRegisteredEmail", email);
    
    // Clear after 10 minutes
    setTimeout(() => {
      localStorage.removeItem("lastRegisteredEmail");
    }, 10 * 60 * 1000);

    return {
      success: true,
      message: apiResponse.message || "Registration successful",
      data: signupData,
      email: email,
      requiresLogin: true // User needs to login separately
    };

  } catch (error) {
    console.error("❌ Registration failed:", error);
    
    // Use your existing handleError function
    handleError(error, "Registration");
    
    // Enhanced error handling
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      console.error("Error status:", status);
      console.error("Error data:", data);

      let errorMessage = "Registration failed";

      switch (status) {
        case 400:
          errorMessage = data?.message || "Invalid registration data";
          if (data?.errors) {
            errorMessage = Object.values(data.errors).join(", ");
          }
          break;
        case 409:
          errorMessage = "Email already exists";
          break;
        case 422:
          errorMessage = data?.message || "Validation failed";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = data?.message || `Registration failed (${status})`;
      }

      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error("No response from server. Check your connection.");
    } else {
      throw error;
    }
  }
};

const signin = async (email, password) => {
  try {
    // Clear old auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    const response = await axiosInstance.post("/api/v1/auth/signin", {
      email,
      password,
    });

    console.log("📦 Full response:", response.data);
    
    // Extract from nested structure
    const apiWrapper = response.data;          // ApiResponseWrapper
    const loginResponse = apiWrapper.data;     // LoginResponse object
    
    if (!loginResponse || !loginResponse.token) {
      throw new Error("Invalid login response");
    }

    // ✅ PRIMARY SOURCE: Response Body
    const token = loginResponse.token;
    const userInfo = {
      email: loginResponse.email,
      token: token,
      userId: loginResponse.userId,
      fullName: loginResponse.fullName,
      roles: loginResponse.roles || [],
      tokenType: loginResponse.tokenType || "Bearer",
      timestamp: new Date().toISOString()
    };

    // Store authentication
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userInfo));
    
    // Optional: Store for debugging
    console.log("🔑 Token (from body):", token.substring(0, 20) + "...");
    console.log("👤 User info stored:", userInfo);
    
    // Optional: Verify headers also have it
    const headerToken = response.headers['x-auth-token'];
    console.log("🔍 Token in headers too?", headerToken ? "Yes" : "No");

    return {
      success: true,
      user: userInfo,
      message: apiWrapper.message
    };

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};



// Update handleError function to not throw generic errors
const handleError = (error, operation) => {
  if (error.response) {
    // Server responded with error
    const errorData = error.response.data;
    console.error(`${operation} failed:`, errorData);

    // Auto logout if 401 Unauthorized
    if (error.response.status === 401) {
      logout();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Return the error instead of throwing
    return error;
  } else if (error.request) {
    // Request made but no response
    console.error(`${operation} failed: No response from server`);
    return new Error("Network error - no response from server");
  } else {
    // Request setup error
    console.error(`${operation} failed:`, error.message);
    return new Error(`Error setting up ${operation.toLowerCase()} request`);
  }
};


// const logout = async (logoutAllDevices = false) => {
//   try {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       console.log('No token found, already logged out');
//       return;
//     }

//     const response = await axiosInstance.post(
//       '/api/v1/auth/logout',
//       null, // No request body
//       {
//         params: { allDevices: logoutAllDevices },
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       }
//     );

//     console.log('Logout successful:', response.data);

//     // Clear local storage
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('cart');

//     // Clear axios default headers
//     delete axiosInstance.defaults.headers.common['Authorization'];

//     return response.data;

//   } catch (error) {
//     console.error('Logout failed:', error);
    
//     // Still clear local storage even if API call fails
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
    
//     throw error;
//   }
// };

const logout = async (logoutAllDevices = false) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('No token found, already logged out');
      return { success: true, message: 'Already logged out locally' };
    }

    const response = await axiosInstance.post(
      '/api/v1/auth/logout',
      null,
      {
        params: { allDevices: logoutAllDevices },
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    // Validate response
    if (response.status === 200) {
      console.log(`✅ ${logoutAllDevices ? 'All devices' : 'Current device'} logout successful`);
      
      // Clear local storage
      clearUserData();
      
      return {
        success: true,
        message: logoutAllDevices 
          ? 'Logged out from all devices' 
          : 'Logged out successfully',
        data: response.data
      };
    } else {
      throw new Error(`Unexpected response: ${response.status}`);
    }

  } catch (error) {
    console.error('❌ Logout failed:', error);
    clearUserData(); // Still clear local data
    
    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed',
      error: error
    };
  }
}

// Usage
const handleLogout = async () => {
  try {
    await logout(false); // Logout from current device only
    // OR
    // await logout(true); // Logout from all devices
    navigate('/login');
  } catch (error) {
    // Even if API fails, we're logged out locally
    navigate('/login');
  }
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Get current user info
const getCurrentUser = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};

const authService = {
  signup,
  signin,
  getToken,
  clearAllTokens,
  logout,
  isAuthenticated,
  getCurrentUser,
  handleLogout
};

export default authService;