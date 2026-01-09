

// UserDashboard.jsx
import { useState, useEffect, useRef } from "react";
import {
  User,
  Mail,
  CheckCircle,
  XCircle,
  Shield,
  Calendar,
  Award,
  Activity,
  Settings,
  Bell,
  ChevronRight,
  Clock,
  Key,
  AlertCircle,
  Home,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Phone,
  Cake,
  Heart,
  Package,
  ShoppingBag,
  Moon,
  Sun,
} from "lucide-react";
import * as THREE from "three";
import { getUserProfile, createUserProfile } from "../../api/user";
import Sidebar from "./Sidebar";
import UserProfileSection from "./UserProfileSection";
import ProfileFormSection from "./ProfileFormSection";
import MyProfileSection from "./MyProfileSection";
import DashboardSection from "./DashboardSection";
import SettingsPage from "./SettingsPage";
import SecurityPage from "./SecurityPage";
import NotificationsPage from "./NotificationsPage";
import ActivityLogPage from "./ActivityLogPage";
import { useTheme } from "../../context/ThemeContext"; // Import the theme hook

const ThreeBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 5;

    // Adjust particle color based on theme
    const particleColor = theme === 'dark' ? 0x818cf8 : 0x6366f1; // Indigo-400 for dark, Indigo-500 for light

    const particlesCount = 100;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: theme === 'dark' ? 0.04 : 0.03, // Slightly larger in dark mode
      transparent: true,
      opacity: theme === 'dark' ? 0.3 : 0.5,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [theme]); // Re-initialize when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20"
    />
  );
};

const StatCard = ({ icon: Icon, label, value, color, delay, theme }) => (
  <div
    className={`rounded-2xl p-6 border backdrop-blur-sm hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${
      theme === 'dark' 
        ? 'bg-gray-800/90 border-gray-700/50 text-white' 
        : 'bg-white/90 border-white/30 text-gray-900'
    }`}
    style={{
      animation: `fadeInUp 0.6s ease-out ${delay}s both`,
      boxShadow: theme === 'dark' 
        ? "0 8px 25px rgba(0, 0, 0, 0.25)" 
        : "0 8px 25px rgba(0, 0, 0, 0.08)",
    }}
  >
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-700/50' : ''
      }`}
      style={{ backgroundColor: `${color}${theme === 'dark' ? '20' : '15'}` }}
    >
      <Icon size={24} style={{ color }} />
    </div>
    <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const InfoRow = ({ icon: Icon, label, value, verified, theme }) => (
  <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
    theme === 'dark' 
      ? 'hover:bg-gray-800/50' 
      : 'hover:bg-white/50'
  }`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'
    }`}>
      <Icon size={20} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
    </div>
    <div className="flex-1">
      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{label}</p>
      <div className="flex items-center gap-2">
        <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        {verified !== undefined &&
          (verified ? (
            <CheckCircle size={16} className="text-green-500" />
          ) : (
            <XCircle size={16} className="text-yellow-500" />
          ))}
      </div>
    </div>
  </div>
);

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className={`p-2 rounded-lg transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
        : 'bg-white hover:bg-gray-100 text-gray-700'
    } border ${
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    } shadow-sm`}
    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
  >
    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);

const UserDashboard = ({ user }) => {
  console.log("UserDashboard: User prop received:", user);
  
  const { theme, toggleTheme } = useTheme(); // Get theme from context
  const [userDetails, setUserDetails] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // Set dashboard as default
  const [showSuccess, setShowSuccess] = useState(false);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        setProfileError(null);

        // Extract user data from props/localStorage
        let userData = null;

        try {
          const authData = localStorage.getItem("keycloak_auth");
          if (authData) {
            const parsed = JSON.parse(authData);
            if (parsed.user) {
              userData = {
                id: parsed.user.userId,
                email: parsed.user.email,
                username: parsed.user.username,
                fullName: parsed.user.fullName,
                firstName: parsed.user.fullName?.split(" ")[0] || "",
                lastName:
                  parsed.user.fullName?.split(" ").slice(1).join(" ") || "",
                emailVerified: parsed.user.emailVerified || false,
                enabled: true,
                createdTimestamp: parsed.user.createdTimestamp || Date.now(),
              };
              console.log("Got user data from localStorage:", userData);
            }
          }
        } catch (e) {
          console.warn("Failed to read from localStorage:", e);
        }

        // Use prop data if localStorage doesn't have it
        if (!userData && user) {
          userData = {
            id: user.id || user.userId,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            firstName: user.fullName?.split(" ")[0] || "",
            lastName: user.fullName?.split(" ").slice(1).join(" ") || "",
            emailVerified: user.emailVerified || false,
            enabled: user.enabled !== false,
            createdTimestamp: user.createdTimestamp || Date.now(),
          };
          console.log("Got user data from props:", userData);
        }

        if (!userData) {
          throw new Error("Unable to get user information");
        }

        setUserDetails(userData);

        // Try to fetch user profile from user-service
        try {
          const profileData = await getUserProfile();
          console.log("User profile fetched:", profileData);

          if (profileData) {
            setUserProfile(profileData);
            setActiveTab("profile");
          } else {
            setUserProfile(null);
            // Only show create tab if no profile exists
            if (!userProfile) {
              setActiveTab("create");
            }
          }
        } catch (profileErr) {
          console.warn("Failed to fetch user profile:", profileErr);
          setUserProfile(null);
          // Don't show error for 404 - it's expected if profile doesn't exist
          if (profileErr.message && !profileErr.message.includes("404")) {
            setProfileError(`Profile error: ${profileErr.message}`);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setError(`Failed to load user details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user, showSuccess]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Not available";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAccountAge = () => {
    if (!userDetails?.createdTimestamp) return "Not available";
    const createdDate = new Date(userDetails.createdTimestamp);
    const now = new Date();
    const diffMs = now - createdDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months !== 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years !== 1 ? "s" : ""}`;
    }
  };

  const handleProfileCreated = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    // Refresh profile data
    setUserProfile(null);
    setActiveTab("profile");
  };

  if (loading) {
    return (
      <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
        <ThreeBackground theme={theme} />
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative w-16 h-16">
            <div className={`absolute inset-0 rounded-full border-4 ${
              theme === 'dark' ? 'border-blue-300/30' : 'border-blue-200'
            }`}></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
          <p className={`mt-6 font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error && !userDetails) {
    return (
      <div className={`min-h-screen relative overflow-hidden flex items-center justify-center p-4 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
        <ThreeBackground theme={theme} />
        <div className={`relative rounded-3xl shadow-2xl p-8 border backdrop-blur-xl max-w-md w-full ${
          theme === 'dark' 
            ? 'bg-gray-800/95 border-gray-700/30 text-white' 
            : 'bg-white/95 border-white/20'
        }`}>
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-white" />
          </div>
          <h1 className={`text-xl font-bold mb-2 text-center ${
            theme === 'dark' ? 'text-red-300' : 'text-red-900'
          }`}>
            Authentication Issue
          </h1>
          <p className={`mb-6 text-center ${
            theme === 'dark' ? 'text-red-200' : 'text-red-700'
          }`}>
            {error}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                localStorage.removeItem("keycloak_auth");
                window.location.href = "/login";
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Go to Login
            </button>
            <button
              onClick={() => window.location.reload()}
              className={`w-full font-semibold py-3 rounded-xl transition-colors ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
    }`}>
      <ThreeBackground theme={theme} />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        :root.dark {
          color-scheme: dark;
        }
        
        :root.light {
          color-scheme: light;
        }
      `}</style>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userProfile={userProfile}
          theme={theme}
        />

        {/* Main Content */}
        <div className="flex-1 p-6 ml-64">
          {/* Theme Toggle */}
          <div className="absolute top-6 right-6">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 animate-fadeIn">
              <div className={`border rounded-xl p-4 ${
                theme === 'dark'
                  ? 'bg-green-900/20 border-green-800'
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-500" />
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-green-200' : 'text-green-800'
                    }`}>
                      Profile created successfully!
                    </p>
                    <p className={`text-sm mt-1 ${
                      theme === 'dark' ? 'text-green-300' : 'text-green-600'
                    }`}>
                      Your profile has been saved with addresses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {profileError && (
            <div className={`mb-6 border rounded-xl p-4 animate-fadeIn ${
              theme === 'dark'
                ? 'bg-red-900/20 border-red-800'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-3">
                <AlertCircle size={20} className="text-red-500" />
                <div>
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-red-200' : 'text-red-800'
                  }`}>
                    {profileError}
                  </p>
                  <p className={`text-sm mt-1 ${
                    theme === 'dark' ? 'text-red-300' : 'text-red-600'
                  }`}>
                    Please try again
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-xl">
                <span className="text-2xl font-bold text-white">
                  {userDetails?.firstName?.charAt(0)?.toUpperCase() ||
                    userDetails?.email?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase() ||
                    "U"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {activeTab === "keycloak" && "Keycloak Profile"}
                  {activeTab === "profile" && "My Profile"}
                  {activeTab === "create" && "Create Profile"}
                  {activeTab === "dashboard" && "Dashboard"}
                  {activeTab === "settings" && "Settings"}
                  {activeTab === "security" && "Security"}
                  {activeTab === "notifications" && "Notifications"}
                  {activeTab === "activity" && "Activity Log"}
                </h1>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {activeTab === "keycloak" && "Authentication & basic information"}
                  {activeTab === "profile" && "Complete profile with addresses"}
                  {activeTab === "create" && "Create your complete profile"}
                  {activeTab === "dashboard" && "Overview of your account"}
                  {activeTab === "settings" && "Manage your preferences"}
                  {activeTab === "security" && "Security and privacy settings"}
                  {activeTab === "notifications" && "Notification preferences"}
                  {activeTab === "activity" && "Recent account activity"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Tab Content */}
          {activeTab === "dashboard" && (
            <DashboardSection
              userDetails={userDetails}
              userProfile={userProfile}
              formatTimestamp={formatTimestamp}
              calculateAccountAge={calculateAccountAge}
              setActiveTab={setActiveTab}
              theme={theme}
            />
          )}
          
          {activeTab === "settings" && <SettingsPage theme={theme} />}
          {activeTab === "security" && <SecurityPage theme={theme} />}
          {activeTab === "notifications" && <NotificationsPage theme={theme} />}
          {activeTab === "activity" && <ActivityLogPage theme={theme} />}
          
          {activeTab === "keycloak" && (
            <UserProfileSection
              userDetails={userDetails}
              formatTimestamp={formatTimestamp}
              calculateAccountAge={calculateAccountAge}
              theme={theme}
            />
          )}
          
          {activeTab === "profile" && (
            <MyProfileSection
              userProfile={userProfile}
              setActiveTab={setActiveTab}
              theme={theme}
            />
          )}
          
          {activeTab === "create" && (
            <ProfileFormSection
              userDetails={userDetails}
              onProfileCreated={handleProfileCreated}
              setProfileError={setProfileError}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;