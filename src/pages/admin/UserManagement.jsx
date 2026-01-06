import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  User,
  Edit,
  Trash2,
  UserPlus,
  Search,
  Filter,
  RefreshCw,
  Send,
  Power,
  MoreVertical,
  X,
  Shield,
  Key,
} from "lucide-react";
import * as THREE from "three";
import * as userService from "../../api/user"; // Using your provided service
import { useSignupValidation } from "../../pages/auth/signupPage/hooks/useSignupValidation";
// Use your validation hook

const ThreeBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const initThree = useCallback(() => {
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 5;

    // Create floating particles with optimized count
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 50; // Reduced for better performance
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    const cleanup = initThree();
    return cleanup;
  }, [initThree]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
    />
  );
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full ${sizeClasses[size]} border border-white/20 overflow-hidden transform transition-all duration-300 scale-100`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all hover:rotate-90 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
 const {
    formData,  // ✅ Use this from the hook
    errors,
    fieldFocus,
    hasInteracted,
    showPassword,
    showConfirmPassword,
    passwordStrength,
    passwordRequirements,
    isFormValid,
    handleInputChange,
    handleFieldFocus,
    handleFieldBlur,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    validateForm,
    resetForm,  // ✅ Use resetForm from the hook
  } = useSignupValidation();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);


  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    temporary: true,
  });

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".action-menu-button") &&
        !event.target.closest(".action-menu-dropdown")
      ) {
        setActionMenuOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterStatus]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAllUsers();

      if (response && response.success !== false) {
        // Handle both response formats: array or object with data property
        const usersData = Array.isArray(response) ? response : response.data;
        setUsers(usersData || []);
      } else {
        setError(response?.message || "Invalid response from server");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${user.firstName || ""} ${user.lastName || ""}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      if (filterStatus === "active") {
        filtered = filtered.filter((user) => user.enabled);
      } else if (filterStatus === "inactive") {
        filtered = filtered.filter((user) => !user.enabled);
      } else if (filterStatus === "verified") {
        filtered = filtered.filter((user) => user.emailVerified);
      } else if (filterStatus === "unverified") {
        filtered = filtered.filter((user) => !user.emailVerified);
      }
    }

    setFilteredUsers(filtered);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSendVerification = async (userId) => {
    try {
      await userService.sendVerificationEmail(userId);
      alert("Verification email sent successfully");
      fetchUsers();
    } catch (err) {
      alert(
        "Failed to send verification email: " + (err.message || "Unknown error")
      );
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await userService.updateUser(userId, { enabled: newStatus });
      alert(`User ${newStatus ? "enabled" : "disabled"} successfully`);
      fetchUsers();
    } catch (err) {
      alert(
        "Failed to update user status: " + (err.message || "Unknown error")
      );
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (
      window.confirm(
        `Are you sure you want to delete user ${userName}? This action cannot be undone.`
      )
    ) {
      try {
        await userService.deleteUser(userId);
        alert("User deleted successfully");
        fetchUsers();
      } catch (err) {
        alert("Failed to delete user: " + (err.message || "Unknown error"));
      }
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username || "",
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      enabled: user.enabled || true,
      emailVerified: user.emailVerified || false,
    });
    setShowEditModal(true);
    setActionMenuOpen(null);
  };



  const handleCreateUser = () => {
  resetForm(); // Use the hook's resetForm function
  setShowCreateModal(true);
};

  // const handleFormSubmit = async (e, isEdit = false) => {
  //   e.preventDefault();

  //   // Basic validation
  //   if (!formData.fullName || !formData.email || !formData.password) {
  //     alert("Full name, email, and password are required");
  //     return;
  //   }

  //   // Check if passwords match
  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }

  //   // Password strength validation (optional)
  //   if (formData.password.length < 8) {
  //     alert("Password must be at least 8 characters long");
  //     return;
  //   }

  //   try {
  //     if (isEdit && selectedUser) {
  //       // For editing, you might need a different endpoint/payload
  //       // This depends on your update API
  //       await userService.updateUser(selectedUser.id, {
  //         fullName: formData.fullName,
  //         email: formData.email,
  //       });
  //       alert("User updated successfully");
  //       setShowEditModal(false);
  //       setSelectedUser(null);
  //     } else {
  //       // For new users - use the signup API
  //       await userService.createUser({
  //         fullName: formData.fullName,
  //         email: formData.email,
  //         password: formData.password,
  //         confirmPassword: formData.confirmPassword,
  //       });
  //       alert("User created successfully");
  //       setShowCreateModal(false);
  //     }

  //     // Reset form
  //     setFormData({
  //       fullName: "",
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //     });

  //     fetchUsers(); // Refresh the user list
  //   } catch (err) {
  //     alert(
  //       `Failed to ${isEdit ? "update" : "create"} user: ${
  //         err.message || "Unknown error"
  //       }`
  //     );
  //   }
  // };

  // Updated handleFormSubmit that uses validation
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      alert("Please fix the errors before submitting");
      return;
    }

    try {
      // Prepare data for API
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      // Call your API
      await userService.createUser(userData);
      alert("User created successfully");

      // Reset form and close modal
      setShowCreateModal(false);
      resetForm(); // You might want to add this to your hook

      // Refresh user list
      fetchUsers();
    } catch (err) {
      alert(`Failed to create user: ${err.message || "Unknown error"}`);
    }
  };



  // Helper function to get field styling
  const getFieldClasses = (fieldName) => {
    const hasError = errors[fieldName] && hasInteracted[fieldName];
    const isValid =
      !errors[fieldName] && hasInteracted[fieldName] && formData[fieldName];

    return `
    w-full px-4 py-2
    border rounded-xl
    bg-white text-gray-900
    placeholder-gray-400
    caret-gray-900
    focus:ring-2 focus:border-transparent
    outline-none
    transition-colors
    ${
      hasError
        ? "border-red-500 focus:ring-red-500"
        : isValid
        ? "border-green-500 focus:ring-green-500"
        : "border-gray-300 focus:ring-blue-500"
    }
  `;
  };

  // Password strength indicator component
  const PasswordStrengthIndicator = ({ strength }) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-600">
          Strength: <span className={strength.color}>{strength.level}</span>
        </span>
        <span className="text-xs font-medium text-gray-600">
          {strength.metCount}/5 requirements
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${strength.bg}`}
          style={{ width: `${strength.percentage}%` }}
        />
      </div>
    </div>
  );

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handlePasswordChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleResetPassword = async () => {
    if (!passwordData.newPassword) {
      alert("Please enter a new password");
      return;
    }

    try {
      await userService.resetPassword(
        selectedUser.id,
        passwordData.newPassword,
        passwordData.temporary
      );
      alert("Password reset successfully");
      setShowResetPasswordModal(false);
      setPasswordData({ newPassword: "", temporary: true });
      setSelectedUser(null);
    } catch (err) {
      alert("Failed to reset password: " + (err.message || "Unknown error"));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <ThreeBackground />
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden p-8">
        <ThreeBackground />
        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 max-w-md mx-auto mt-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle size={32} className="text-white" />
            </div>
            <p className="text-xl font-bold text-red-900 mb-2">
              Error loading users
            </p>
            <p className="text-red-700 mb-6">{error}</p>
            <button
              onClick={fetchUsers}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <RefreshCw size={18} className="inline mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <ThreeBackground />

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        {/* Compact Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Customer Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">Manage all customers</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-xl text-white">
                <p className="text-xs opacity-80">Total</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <button
                onClick={handleCreateUser}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <UserPlus size={18} />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Compact Search Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-white/20">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white/50"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white/50 text-sm"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              <button
                onClick={fetchUsers}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Refresh users"
              >
                <RefreshCw size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {filteredUsers.length} of {users.length} users
          </p>
        </div>

        {/* Compact User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-white/20 relative hover:scale-105 hover:-translate-y-2 cursor-pointer"
              style={{
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 20px 60px rgba(99, 102, 241, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 relative group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"></div>
                <div className="absolute top-3 right-3">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActionMenuOpen(
                          actionMenuOpen === user.id ? null : user.id
                        );
                      }}
                      className="action-menu-button p-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                      <MoreVertical size={16} className="text-white" />
                    </button>

                    {actionMenuOpen === user.id && (
                      <div className="action-menu-dropdown absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl py-1 z-10 border border-gray-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700 text-sm"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleUserStatus(user.id, user.enabled);
                            setActionMenuOpen(null);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700 text-sm"
                        >
                          <Power size={14} />
                          {user.enabled ? "Disable" : "Enable"}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(user);
                            setShowResetPasswordModal(true);
                            setActionMenuOpen(null);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700 text-sm"
                        >
                          <Key size={14} />
                          Reset Password
                        </button>
                        {!user.emailVerified && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendVerification(user.id);
                              setActionMenuOpen(null);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700 text-sm"
                          >
                            <Send size={14} />
                            Send Verification
                          </button>
                        )}
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(
                              user.id,
                              user.username || user.email
                            );
                            setActionMenuOpen(null);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600 text-sm"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-2xl">
                    <span className="text-lg font-bold text-blue-600 group-hover:text-purple-600 transition-colors duration-500">
                      {(user.firstName || user.username || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate">
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user.username || user.email}
                    </h3>
                    <div className="flex gap-1 mt-1">
                      {user.enabled ? (
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-semibold">
                          Inactive
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                          user.emailVerified
                            ? "bg-emerald-500 text-white"
                            : "bg-yellow-500 text-white"
                        }`}
                      >
                        {user.emailVerified ? "✓" : "⚠"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                      <User size={14} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Username</p>
                      <p className="text-sm font-medium truncate">
                        {user.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-purple-200 transition-all duration-300">
                      <Mail size={14} className="text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-green-200 transition-all duration-300">
                      <Calendar size={14} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Joined</p>
                      <p className="text-sm font-medium">
                        {formatDate(user.createdTimestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">ID</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-mono">
                        {user.id ? user.id.substring(0, 8) + "..." : "N/A"}
                      </span>
                    </div>
                  </div>

                  {user.requiredActions && user.requiredActions.length > 0 && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-800 font-semibold">
                        ⚠️ Actions Required
                      </p>
                      <p className="text-xs text-red-600 mt-0.5">
                        {user.requiredActions.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-12 text-center border border-white/20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-gray-400" />
            </div>
            <p className="text-lg font-semibold text-gray-700 mb-1">
              No users found
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>

      {/* Create Modal */}

      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Create New User"
        size="lg"
      >
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                onFocus={() => handleFieldFocus("fullName")}
                onBlur={() => handleFieldBlur("fullName")}
                placeholder="John Doe"
                required
                className={getFieldClasses("fullName")}
              />
              {errors.fullName && hasInteracted.fullName && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.fullName}
                </p>
              )}
              {!errors.fullName &&
                hasInteracted.fullName &&
                formData.fullName && (
                  <p className="mt-1 text-xs text-green-600 flex items-center">
                    <span className="mr-1">✓</span>
                    Full name is valid
                  </p>
                )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onFocus={() => handleFieldFocus("email")}
                onBlur={() => handleFieldBlur("email")}
                placeholder="john@example.com"
                required
                className={getFieldClasses("email")}
              />
              {errors.email && hasInteracted.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.email}
                </p>
              )}
              {!errors.email && hasInteracted.email && formData.email && (
                <p className="mt-1 text-xs text-green-600 flex items-center">
                  <span className="mr-1">✓</span>
                  Email is valid
                </p>
              )}
            </div>

            {/* Password with visibility toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onFocus={() => handleFieldFocus("password")}
                  onBlur={() => handleFieldBlur("password")}
                  placeholder="••••••••"
                  required
                  className={getFieldClasses("password") + " pr-10"}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <span className="text-sm">👁️</span>
                  ) : (
                    <span className="text-sm">👁️‍🗨️</span>
                  )}
                </button>
              </div>

              <PasswordStrengthIndicator strength={passwordStrength} />

              {errors.password && hasInteracted.password && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.password}
                </p>
              )}
              {!errors.password &&
                hasInteracted.password &&
                formData.password &&
                passwordStrength.metCount === 5 && (
                  <p className="mt-1 text-xs text-green-600 flex items-center">
                    <span className="mr-1">✓</span>
                    Password is strong and meets all requirements
                  </p>
                )}
            </div>

            {/* Confirm Password with visibility toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  onFocus={() => handleFieldFocus("confirmPassword")}
                  onBlur={() => handleFieldBlur("confirmPassword")}
                  placeholder="••••••••"
                  required
                  className={getFieldClasses("confirmPassword") + " pr-10"}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <span className="text-sm">👁️</span>
                  ) : (
                    <span className="text-sm">👁️‍🗨️</span>
                  )}
                </button>
              </div>

              {errors.confirmPassword && hasInteracted.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.confirmPassword}
                </p>
              )}
              {!errors.confirmPassword &&
                hasInteracted.confirmPassword &&
                formData.confirmPassword &&
                formData.password === formData.confirmPassword && (
                  <p className="mt-1 text-xs text-green-600 flex items-center">
                    <span className="mr-1">✓</span>
                    Passwords match
                  </p>
                )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Password Requirements:
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                {passwordRequirements.map((req, index) => (
                  <li key={req.text} className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        req.met ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    {req.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="
            flex-1 px-6 py-2
            border border-gray-300
            text-gray-700
            rounded-xl
            hover:bg-gray-50
            transition-all
            font-medium
            focus:outline-none
            focus:ring-2 focus:ring-gray-500
            bg-white
          "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!isFormValid()}
                className={`
            flex-1 px-6 py-2
            text-white
            rounded-xl
            transition-all
            font-medium
            shadow-lg
            focus:outline-none
            focus:ring-2 focus:ring-blue-500
            ${
              isFormValid()
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
                : "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-70"
            }
          `}
              >
                Create User
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedUser(null);
        }}
        title="Edit User"
        size="lg"
      >
        {selectedUser && (
          <form onSubmit={(e) => handleFormSubmit(e, true)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="enabled"
                    checked={formData.enabled}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        enabled: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Enabled</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="emailVerified"
                    checked={formData.emailVerified}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        emailVerified: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Email Verified</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                  }}
                  className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={showResetPasswordModal}
        onClose={() => {
          setShowResetPasswordModal(false);
          setPasswordData({ newPassword: "", temporary: true });
          setSelectedUser(null);
        }}
        title="Reset Password"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Reset password for{" "}
                <span className="font-semibold">
                  {selectedUser.username || selectedUser.email}
                </span>
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password *
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="temporary"
                    checked={passwordData.temporary}
                    onChange={handlePasswordChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Temporary password (requires change on next login)
                  </span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowResetPasswordModal(false);
                  setPasswordData({ newPassword: "", temporary: true });
                  setSelectedUser(null);
                }}
                className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="flex-1 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
