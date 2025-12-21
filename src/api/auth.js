import axios from "axios";
import { em } from "framer-motion/client";
import { error } from "three";

// URLs
const API_GATEWAY_URL = "http://localhost:8765"; // API Gateway
const KEYCLOAK_URL = "http://localhost:8080"; // Keycloak server
const KEYCLOAK_REALM = "microservices-realm";
const KEYCLOAK_CLIENT_ID = "spring-cloud-client";

// For admin operations (signup requires admin credentials)
const KEYCLOAK_ADMIN_USERNAME = "admin"; // Or your Keycloak admin username
const KEYCLOAK_ADMIN_PASSWORD = "admin123"; // Or your Keycloak admin password

const axiosInstance = axios.create({
  baseURL: API_GATEWAY_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============= SIGNUP IMPLEMENTATION =============

const keycloakService = {
  /**
   * SIGNUP: Create new user in Keycloak via api-gateway
   */
  signup: async ({ fullName, email, password, confirmPassword }) => {
    try {
      console.log("Starting signup for: ", email);

      // call your api-gateway for signup
      const response = await axiosInstance.post("/api/v1/auth/signup", {
        fullName,
        email,
        password,
        confirmPassword,
      });

      console.log("Signup successfully ", response.data);

      return response.data;
    } catch (error) {
      console.error("Signup failed", error);
      let erroMessage = "Registration failed .please try agaain";

      if (error.response) {
        //handle api-gateway
        const status = error.response.status;
        const data = error.response.data;

        switch (status) {
          case 409: // conflict
            erroMessage = data?.message || "User already exists";
            // data?.message → safely try to read message

            // || → if that fails, use default text
            break;

          case 400: // bad request
            erroMessage = data?.message || "Invalid registration data ";
            break;

          case 422: // validation failed
            erroMessage = data?.message || "vallidation failed";
            break;

          case 500: // internal server errror
            erroMessage = data?.message || "internal server error";
            break;

          default:
            erroMessage = data?.message || `Registration failed (${status})`;
        }
      } else if (error.message) {
        erroMessage = error.message;
      }

      throw new Error(erroMessage);
    }
  },


  /**
   * SIGNIN: Login with username/email and password
   */
  signin: async ({email , password}) =>  {
    try {

      console.log("starting login for : ", email);


      const response = await axiosInstance.post("/api/v1/auth/login", {

        email,
        password

      });


         // 🚨 NEW DEBUG: Check the token structure properly
        if (response.data.accessToken) {
            const token = response.data.accessToken;
            console.log("=== TOKEN DEBUG START ===");
            
            // Split the token
            const parts = token.split('.');
            console.log("Token has", parts.length, "parts");
            
            if (parts.length >= 2) {
                try {
                    // Decode the payload (middle part)
                    const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
                    console.log("Decoded payload:", payload);
                    
                    // Parse as JSON
                    const parsed = JSON.parse(payload);
                    console.log("Parsed JSON - realm_access:", parsed.realm_access);
                    console.log("Parsed JSON - ALL roles:", parsed.realm_access?.roles);
                    console.log("Is ADMIN in token?", parsed.realm_access?.roles?.includes('ADMIN'));
                } catch (e) {
                    console.error("Failed to decode/parse:", e);
                }
            }
            console.log("=== TOKEN DEBUG END ===");
        }
        
        return response.data;
        
        return response.data;


      console.log("login successed : ", response.data);
      // return response.data;

      
    } catch (error) {
      

      console.error("login failed..." , error);

      let erroMessage = "login failed please try again letter";

      if (error.response) {


        // handle api-gateway

        let status = error.response.status;
        let data = error.response.data;


        switch (status) {
          case 409: // conflic
            erroMessage = data?.message || "user already exists";
            break;
            
          case 400: // bad request
            erroMessage = data?.message || "invalid registration data";
            break;
            

          case 422: //  validation failed
            erroMessage = data?.message|| "validation failed";
            break;
          
          case 403:
            erroMessage = data?.message || "Access denied. Please verify your account or contact support"
            break;

          case 404:
            erroMessage = data?.message || "No account found with this email. Please sign up first."
            break;

          case 500:
            erroMessage = data?.message || "internal server error";
            break;
        
          default:
            erroMessage = `registration failed (${status})`
            break;
        }
      }else if (error.message) {

          erroMessage = error.message;
        
      }

    }

    throw new error(erroMessage)
  },

  /**
   * FORGOT PASSWORD: Initiate password reset
   */
  forgotPassword: async (email) => {
    try {
      console.log("🔑 Initiating password reset for:", email);

      // Get admin token
      const adminToken = await getKeycloakAdminToken();

      // Find user by email
      const usersResponse = await axios.get(
        `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users`,
        {
          params: { email: email, exact: true },
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (usersResponse.data.length === 0) {
        throw new Error("User not found");
      }

      const userId = usersResponse.data[0].id;

      // Execute actions email
      const executeActionsResponse = await axios.put(
        `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/execute-actions-email`,
        ["UPDATE_PASSWORD"], // Action to execute
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
          params: {
            client_id: KEYCLOAK_CLIENT_ID,
            lifespan: 43200, // 12 hours in minutes
          },
        }
      );

      return {
        success: true,
        message: "Password reset email sent. Please check your inbox.",
      };
    } catch (error) {
      console.error("Password reset failed:", error);
      throw new Error(
        error.response?.data?.errorMessage || "Failed to send reset email"
      );
    }
  },

  /**
   * RESEND VERIFICATION EMAIL
   */
  resendVerificationEmail: async (email) => {
    try {
      const adminToken = await getKeycloakAdminToken();

      // Find user
      const usersResponse = await axios.get(
        `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users`,
        {
          params: { email: email, exact: true },
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (usersResponse.data.length === 0) {
        throw new Error("User not found");
      }

      const userId = usersResponse.data[0].id;

      // Send verification email
      await axios.put(
        `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/send-verify-email`,
        {},
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          params: {
            client_id: KEYCLOAK_CLIENT_ID,
          },
        }
      );

      return {
        success: true,
        message: "Verification email sent successfully",
      };
    } catch (error) {
      console.error("Resend verification failed:", error);
      throw error;
    }
  },

  // ... [Previous functions: isAuthenticated, getCurrentUser, logout, etc.] ...
};

// ============= HELPER FUNCTIONS =============

/**
 * Get admin token for Keycloak operations
 */
const getKeycloakAdminToken = async () => {
  try {
    // Check if we have a cached admin token
    const cachedToken = localStorage.getItem("kc_admin_token");
    const cachedExp = localStorage.getItem("kc_admin_token_exp");

    if (cachedToken && cachedExp && Date.now() < parseInt(cachedExp)) {
      return cachedToken;
    }

    // Get new admin token
    const response = await axios.post(
      `${KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: "admin-cli",
        grant_type: "password",
        username: KEYCLOAK_ADMIN_USERNAME,
        password: KEYCLOAK_ADMIN_PASSWORD,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const token = response.data.access_token;
    const expiresIn = response.data.expires_in * 1000; // Convert to milliseconds

    // Cache token
    localStorage.setItem("kc_admin_token", token);
    localStorage.setItem("kc_admin_token_exp", Date.now() + expiresIn);

    return token;
  } catch (error) {
    console.error("Failed to get admin token:", error);
    throw new Error(
      "Administrative error. Please check Keycloak admin credentials."
    );
  }
};

/**
 * Get Keycloak user ID by email
 */
const getKeycloakUserId = async (email, adminToken) => {
  try {
    const response = await axios.get(
      `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users`,
      {
        params: { email: email, exact: true },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (response.data.length > 0) {
      return response.data[0].id;
    }

    throw new Error("User not found after creation");
  } catch (error) {
    console.error("Failed to get user ID:", error);
    throw error;
  }
};

/**
 * Send verification email to user
 */
const sendVerificationEmail = async (userId, adminToken) => {
  try {
    await axios.put(
      `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/send-verify-email`,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        params: {
          client_id: KEYCLOAK_CLIENT_ID,
          redirect_uri: `${window.location.origin}/email-verified`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw error;
  }
};

/**
 * Extract user info from JWT token
 */
const getUserInfoFromToken = (token) => {
  try {
    const payload = parseJwt(token);

    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.preferred_username,
      fullName:
        payload.name ||
        `${payload.given_name || ""} ${payload.family_name || ""}`.trim(),
      firstName: payload.given_name,
      lastName: payload.family_name,
      roles: payload.realm_access?.roles || [],
      emailVerified: payload.email_verified || false,
      token: token,
      authProvider: "KEYCLOAK",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to parse user info from token:", error);
    return null;
  }
};

// ... [Previous helper functions: parseJwt, storeKeycloakTokens, clearKeycloakTokens, etc.] ...

export default keycloakService;
