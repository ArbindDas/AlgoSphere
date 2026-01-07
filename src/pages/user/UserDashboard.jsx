
import { useState, useEffect, useRef } from "react";
import { 
  User, Mail, CheckCircle, XCircle, Shield, Calendar, 
  Award, Activity, Settings, Bell, ChevronRight, Clock,
  Key, AlertCircle
} from "lucide-react";
import * as THREE from 'three';
import { getUser } from "../../api/user";

const ThreeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 5;

    // Create floating particles
    const particlesCount = 100;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.03,
      transparent: true,
      opacity: 0.5
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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20" />;
};

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <div 
    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    style={{
      animation: `fadeInUp 0.6s ease-out ${delay}s both`,
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
    }}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
         style={{ backgroundColor: `${color}15` }}>
      <Icon size={24} style={{ color }} />
    </div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const InfoRow = ({ icon: Icon, label, value, verified }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 group">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-100">
      <Icon size={20} className="text-blue-600" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex items-center gap-2">
        <p className="font-semibold text-gray-900">{value}</p>
        {verified !== undefined && (
          verified ? (
            <CheckCircle size={16} className="text-green-500" />
          ) : (
            <XCircle size={16} className="text-yellow-500" />
          )
        )}
      </div>
    </div>
  </div>
);

const UserDashboard = ({ user }) => {
  console.log("UserDashboard: User prop received:", user);
  
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to get user ID from multiple sources
        let userId = null;
        
        // Option 1: Try from localStorage (most reliable based on your data)
        try {
          const authData = localStorage.getItem('keycloak_auth');
          if (authData) {
            const parsed = JSON.parse(authData);
            if (parsed.user?.userId) {
              userId = parsed.user.userId;
              console.log("Got userId from localStorage:", userId);
            }
          }
        } catch (e) {
          console.warn("Failed to read from localStorage:", e);
        }
        
        // Option 2: Try from user prop
        if (!userId && user) {
          userId = user.userId || user.id || user.sub;
          console.log("Got userId from user prop:", userId);
        }
        
        if (!userId) {
          throw new Error("Unable to determine user ID. User object: " + JSON.stringify(user));
        }
        
        console.log("Fetching user details for ID:", userId);
        
        try {
          const apiResponse = await getUser(userId);
          console.log("API Response:", apiResponse);
          
          // Handle API response format
          let userData = apiResponse;
          
          // If response has success/data structure
          if (apiResponse && apiResponse.success !== undefined && apiResponse.data) {
            userData = apiResponse.data;
          }
          
          setUserDetails(userData);
        } catch (apiError) {
          console.error("API call failed:", apiError);
          
          // Create fallback user from localStorage
          try {
            const authData = localStorage.getItem('keycloak_auth');
            if (authData) {
              const parsed = JSON.parse(authData);
              if (parsed.user) {
                const fallbackUser = {
                  id: parsed.user.userId,
                  username: parsed.user.username,
                  email: parsed.user.email,
                  firstName: parsed.user.fullName?.split(' ')[0] || '',
                  lastName: parsed.user.fullName?.split(' ').slice(1).join(' ') || '',
                  emailVerified: parsed.user.emailVerified || false,
                  enabled: true,
                  createdTimestamp: Date.now(),
                  requiredActions: [],
                  attributes: {}
                };
                setUserDetails(fallbackUser);
                setError("Using cached user data (API unavailable)");
                return;
              }
            }
          } catch (fallbackError) {
            console.error("Fallback also failed:", fallbackError);
            throw apiError;
          }
          
          throw apiError;
        }
        
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setError(`Failed to load user details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Not available";
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate account age
  const calculateAccountAge = () => {
    if (!userDetails?.createdTimestamp) return "Not available";
    const createdDate = new Date(userDetails.createdTimestamp);
    const now = new Date();
    const diffMs = now - createdDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <ThreeBackground />
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !userDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden flex items-center justify-center p-4">
        <ThreeBackground />
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 max-w-md w-full">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-red-900 mb-2 text-center">Authentication Issue</h1>
          <p className="text-red-700 mb-6 text-center">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => {
                localStorage.removeItem('keycloak_auth');
                window.location.href = '/login';
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Go to Login
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <ThreeBackground />
      
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
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Error banner if using fallback data */}
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} className="text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">{error}</p>
                <p className="text-yellow-600 text-sm mt-1">Some features may be limited</p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Header */}
        <div className="text-center mb-8" style={{ animation: 'fadeInUp 0.6s ease-out' }}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <span className="text-3xl font-bold text-white">
              {userDetails?.firstName?.charAt(0)?.toUpperCase() || 
               userDetails?.email?.charAt(0)?.toUpperCase() || 
               user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back{userDetails?.firstName ? `, ${userDetails.firstName}` : '!'}
          </h1>
          <p className="text-lg text-gray-600">
            {userDetails?.email || user?.email || 'User Dashboard'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={Activity} 
            label="Account Status" 
            value={userDetails?.enabled ? "Active" : "Inactive"}
            color="#10b981"
            delay={0.1}
          />
          <StatCard 
            icon={Shield} 
            label="Email Verified" 
            value={userDetails?.emailVerified ? "Verified" : "Pending"}
            color={userDetails?.emailVerified ? "#10b981" : "#f59e0b"}
            delay={0.2}
          />
          <StatCard 
            icon={Calendar} 
            label="Member Since" 
            value={userDetails?.createdTimestamp 
              ? new Date(userDetails.createdTimestamp).getFullYear()
              : "N/A"
            }
            color="#8b5cf6"
            delay={0.3}
          />
          <StatCard 
            icon={Clock} 
            label="Account Age" 
            value={calculateAccountAge()}
            color="#6366f1"
            delay={0.4}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                ID: {userDetails?.id ? `${userDetails.id.substring(0, 8)}...` : 'N/A'}
              </div>
            </div>

            <div className="space-y-2">
              <InfoRow 
                icon={User} 
                label="Full Name" 
                value={`${userDetails?.firstName || ''} ${userDetails?.lastName || ''}`.trim() || 'Not set'}
              />
              <InfoRow 
                icon={Mail} 
                label="Email Address" 
                value={userDetails?.email || 'Not set'}
                verified={userDetails?.emailVerified}
              />
              <InfoRow 
                icon={User} 
                label="Username" 
                value={userDetails?.username || 'Not set'}
              />
              <InfoRow 
                icon={Shield} 
                label="Account Status" 
                value={userDetails?.enabled ? 'Active' : 'Inactive'}
                verified={userDetails?.enabled}
              />
              <InfoRow 
                icon={Calendar} 
                label="Account Created" 
                value={formatTimestamp(userDetails?.createdTimestamp)}
              />
              <InfoRow 
                icon={Key} 
                label="User ID" 
                value={userDetails?.id || 'Not available'}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: Settings, label: 'Account Settings', color: '#6366f1' },
                  { icon: Shield, label: 'Security', color: '#8b5cf6' },
                  { icon: Bell, label: 'Notifications', color: '#f59e0b' },
                  { icon: Activity, label: 'Activity Log', color: '#10b981' }
                ].map((action, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${action.color}15` }}
                      >
                        <action.icon size={18} style={{ color: action.color }} />
                      </div>
                      <span className="font-medium text-gray-700">{action.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Account Health */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-bold mb-3">Account Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-100">Profile Completion</span>
                  <span className="font-bold">
                    {(userDetails?.firstName && userDetails?.emailVerified) ? '100%' : 
                     userDetails?.firstName ? '75%' : '50%'}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: (userDetails?.firstName && userDetails?.emailVerified) ? '100%' : 
                            userDetails?.firstName ? '75%' : '50%'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;