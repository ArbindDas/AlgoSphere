

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
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import * as THREE from "three";
import * as userService from "../../api/user";
import { useSignupValidation } from "../../pages/auth/signupPage/hooks/useSignupValidation";
import { useTheme } from "../../context/ThemeContext";

const ThreeBackground = ({ theme }) => {
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

    const particleColor = theme === 'dark' ? 0x818cf8 : 0x6366f1;

    const geometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: particleColor,
      size: 0.05,
      transparent: true,
      opacity: theme === 'dark' ? 0.4 : 0.6,
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
  }, [theme]);

  useEffect(() => {
    const cleanup = initThree();
    return cleanup;
  }, [initThree]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none -z-10 ${
        theme === 'dark' ? 'opacity-20' : 'opacity-30'
      }`}
    />
  );
};

const Modal = ({ isOpen, onClose, title, children, size = "md", theme }) => {
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
        className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-black/70 backdrop-blur-md' 
            : 'bg-black/60 backdrop-blur-md'
        } transition-opacity duration-300`}
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className={`relative ${
          theme === 'dark'
            ? 'bg-gray-900/95 backdrop-blur-xl border-gray-700'
            : 'bg-white/95 backdrop-blur-xl border-white/20'
        } rounded-3xl shadow-2xl w-full ${sizeClasses[size]} border overflow-hidden transform transition-all duration-300 scale-100`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-bold ${
              theme === 'dark'
                ? 'text-white'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className={`p-2 ${
                theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-300'
                  : 'hover:bg-gray-100'
              } rounded-xl transition-all hover:rotate-90 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
  const { theme, toggleTheme } = useTheme();
  const {
    formData,
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
    resetForm,
  } = useSignupValidation();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(6);
  
  // Sorting State
  const [sortConfig, setSortConfig] = useState({
    key: 'username',
    direction: 'asc'
  });

  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    enabled: true,
    emailVerified: false,
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    temporary: true,
  });

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

  useEffect(() => {
    sortUsers();
  }, [filteredUsers, sortConfig]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAllUsers();

      if (response && response.success !== false) {
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
    setCurrentPage(1); // Reset to first page when filtering
  };

  const sortUsers = () => {
    const sorted = [...filteredUsers].sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      // Handle nested properties
      if (sortConfig.key === 'name') {
        aValue = `${a.firstName || ''} ${a.lastName || ''}`.trim();
        bValue = `${b.firstName || ''} ${b.lastName || ''}`.trim();
      }
      
      // Handle null/undefined values
      if (aValue == null) aValue = '';
      if (bValue == null) bValue = '';
      
      // Handle dates
      if (sortConfig.key === 'createdTimestamp') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      // Compare values
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setSortedUsers(sorted);
  };

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
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

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (startPage > 1) {
        pageNumbers.unshift('...');
        pageNumbers.unshift(1);
      }
      if (endPage < totalPages) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
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
    console.log("Editing user:", user);

    setSelectedUser(user);

    let firstName = user.firstName || "";
    let lastName = user.lastName || "";

    if ((!firstName || !lastName) && user.fullName) {
      const nameParts = user.fullName.split(" ");
      firstName = nameParts[0] || "";
      lastName = nameParts.slice(1).join(" ") || "";
    }

    let username = user.username || "";
    const email = user.email || "";

    if (username === email || username.includes("@")) {
      username = username.split("@")[0];
    }

    setEditFormData({
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      enabled: user.enabled !== undefined ? user.enabled : true,
      emailVerified: user.emailVerified || false,
    });

    setShowEditModal(true);
    setActionMenuOpen(null);
  };

  const handleCreateUser = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fix the errors before submitting");
      return;
    }

    try {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      await userService.createUser(userData);
      alert("User created successfully");

      setShowCreateModal(false);
      resetForm();
      fetchUsers();
    } catch (err) {
      alert(`Failed to create user: ${err.message || "Unknown error"}`);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!editFormData.email?.trim()) {
        alert("Email is required");
        return;
      }

      if (!emailRegex.test(editFormData.email)) {
        alert("Please enter a valid email address");
        return;
      }

      const updatedData = {
        email: editFormData.email.trim(),
        firstName: editFormData.firstName?.trim() || "",
        lastName: editFormData.lastName?.trim() || "",
        enabled: Boolean(editFormData.enabled),
        emailVerified: Boolean(editFormData.emailVerified),
      };

      console.log("Sending update (without username):", updatedData);

      const response = await userService.updateUser(
        selectedUser.id,
        updatedData
      );
      console.log("Update response:", response);

      alert("User updated successfully");
      setShowEditModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update error:", err);

      if (err.response?.status === 409) {
        alert("Email already exists. Please use a different email.");
      } else if (err.response?.status === 400) {
        alert("Invalid data. Please check your inputs.");
      } else {
        alert(
          `Error: ${
            err.response?.data?.message || err.message || "Unknown error"
          }`
        );
      }
    }
  };

  const getFieldClasses = (fieldName) => {
    const hasError = errors[fieldName] && hasInteracted[fieldName];
    const isValid =
      !errors[fieldName] && hasInteracted[fieldName] && formData[fieldName];

    return `
    w-full px-4 py-2
    border rounded-xl
    ${theme === 'dark' 
      ? 'bg-gray-800 text-white placeholder-gray-400 caret-white' 
      : 'bg-white text-gray-900 placeholder-gray-400 caret-gray-900'}
    focus:ring-2 focus:border-transparent
    outline-none
    transition-colors
    ${
      hasError
        ? "border-red-500 focus:ring-red-500"
        : isValid
        ? "border-green-500 focus:ring-green-500"
        : theme === 'dark'
        ? "border-gray-700 focus:ring-blue-500"
        : "border-gray-300 focus:ring-blue-500"
    }
  `;
  };

  const PasswordStrengthIndicator = ({ strength }) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className={`text-xs font-medium ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Strength: <span className={strength.color}>{strength.level}</span>
        </span>
        <span className={`text-xs font-medium ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {strength.metCount}/5 requirements
        </span>
      </div>
      <div className={`w-full h-2 ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
      } rounded-full overflow-hidden`}>
        <div
          className={`h-full transition-all duration-300 ${strength.bg}`}
          style={{ width: `${strength.percentage}%` }}
        />
      </div>
    </div>
  );

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
      <div className={`min-h-screen relative overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
        <ThreeBackground theme={theme} />
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative w-20 h-20">
            <div className={`absolute inset-0 rounded-full border-4 ${
              theme === 'dark' ? 'border-blue-700' : 'border-blue-200'
            }`}></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
          <p className={`mt-4 font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen relative overflow-hidden p-8 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      }`}>
        <ThreeBackground theme={theme} />
        <div className={`relative ${
          theme === 'dark'
            ? 'bg-gray-900/80 backdrop-blur-xl border-gray-700'
            : 'bg-white/80 backdrop-blur-xl border-white/20'
        } rounded-3xl shadow-2xl p-8 border max-w-md mx-auto mt-20`}>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle size={32} className="text-white" />
            </div>
            <p className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-red-300' : 'text-red-900'
            }`}>
              Error loading users
            </p>
            <p className={`mb-6 ${theme === 'dark' ? 'text-red-400' : 'text-red-700'}`}>
              {error}
            </p>
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
    <div className={`min-h-screen relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
    }`}>
      <ThreeBackground theme={theme} />

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        {/* Compact Header with Theme Toggle */}
        <div className={`${
          theme === 'dark'
            ? 'bg-gray-900/80 backdrop-blur-xl border-gray-700'
            : 'bg-white/80 backdrop-blur-xl border-white/20'
        } rounded-2xl shadow-xl p-6 border`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className={`text-2xl font-bold ${
                theme === 'dark'
                  ? 'text-white'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              }`}>
                Customer Management
              </h2>
              <p className={`text-sm mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Manage all customers
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
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
        <div className={`${
          theme === 'dark'
            ? 'bg-gray-900/80 backdrop-blur-xl border-gray-700'
            : 'bg-white/80 backdrop-blur-xl border-white/20'
        } rounded-2xl shadow-lg p-4 border`}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}
                size={18}
              />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white/50 border-gray-200'
                }`}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-3 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white/50 border-gray-200'
                }`}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              <button
                onClick={fetchUsers}
                className={`p-2 ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                } rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500`}
                title="Refresh users"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>
          <p className={`mt-2 text-xs ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Showing {currentUsers.length} of {sortedUsers.length} users (Page {currentPage} of {totalPages})
          </p>
        </div>

        {/* Sorting Controls */}
        <div className={`${
          theme === 'dark'
            ? 'bg-gray-900/50 backdrop-blur-xl border-gray-700'
            : 'bg-white/50 backdrop-blur-xl border-white/20'
        } rounded-xl p-3 border`}>
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Sort by:</span>
            {['username', 'email', 'name', 'createdTimestamp'].map((key) => (
              <button
                key={key}
                onClick={() => handleSort(key)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 text-sm ${
                  sortConfig.key === key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {key === 'name' ? 'Full Name' : 
                 key === 'createdTimestamp' ? 'Join Date' : 
                 key.charAt(0).toUpperCase() + key.slice(1)}
                {sortConfig.key === key && (
                  sortConfig.direction === 'asc' ? 
                  <ChevronUp size={14} /> : 
                  <ChevronDown size={14} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Compact User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-900/80 backdrop-blur-xl border-gray-700'
                  : 'bg-white/80 backdrop-blur-xl border-white/20'
              } rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-visible group border relative hover:scale-105 hover:-translate-y-2 cursor-pointer`}
              style={{
                boxShadow: theme === 'dark' 
                  ? "0 10px 30px rgba(0, 0, 0, 0.3)" 
                  : "0 10px 30px rgba(0, 0, 0, 0.1)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = theme === 'dark'
                  ? "0 20px 60px rgba(99, 102, 241, 0.6), 0 0 40px rgba(139, 92, 246, 0.5)"
                  : "0 20px 60px rgba(99, 102, 241, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme === 'dark'
                  ? "0 10px 30px rgba(0, 0, 0, 0.3)"
                  : "0 10px 30px rgba(0, 0, 0, 0.1)";
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
                      <div
                        className={`absolute right-0 mt-2 w-44 rounded-xl shadow-2xl py-1 z-[99999] border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-white border-gray-200'
                        }`}
                        style={{
                          boxShadow:
                            "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                          animation: "dropdownFadeIn 0.2s ease-out",
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}
                          className={`w-full px-3 py-2 text-left flex items-center gap-2 text-sm transition-colors ${
                            theme === 'dark'
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          }`}
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
                          className={`w-full px-3 py-2 text-left flex items-center gap-2 text-sm transition-colors ${
                            theme === 'dark'
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          }`}
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
                          className={`w-full px-3 py-2 text-left flex items-center gap-2 text-sm transition-colors ${
                            theme === 'dark'
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                          }`}
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
                            className={`w-full px-3 py-2 text-left flex items-center gap-2 text-sm transition-colors ${
                              theme === 'dark'
                                ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                            }`}
                          >
                            <Send size={14} />
                            Send Verification
                          </button>
                        )}
                        <div className={`border-t my-1 ${
                          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}></div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(
                              user.id,
                              user.username || user.email
                            );
                            setActionMenuOpen(null);
                          }}
                          className={`w-full px-3 py-2 text-left flex items-center gap-2 text-sm transition-colors ${
                            theme === 'dark'
                              ? 'text-red-400 hover:bg-red-900/30 hover:text-red-300'
                              : 'text-red-600 hover:bg-red-50 hover:text-red-700'
                          }`}
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
                      {(() => {
                        const displayName = user.username || user.email || "";
                        const cleanName = displayName.includes("@")
                          ? displayName.split("@")[0]
                          : displayName;

                        if (cleanName && cleanName.length > 0) {
                          return cleanName.charAt(0).toUpperCase();
                        }

                        if (user.firstName)
                          return user.firstName.charAt(0).toUpperCase();

                        return "U";
                      })()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate">
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user.fullName ||
                          `${
                            user.username || user.email?.split("@")[0] || "User"
                          }`}
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
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  theme === 'dark'
                    ? 'from-blue-900/20 to-purple-900/20'
                    : 'from-blue-50 to-purple-50'
                } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-blue-900/30 group-hover:bg-blue-800/50'
                        : 'bg-blue-100 group-hover:bg-blue-200'
                    }`}>
                      <User size={14} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Username</p>
                      <p className="text-sm font-medium truncate">
                        {user.username}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-purple-900/30 group-hover:bg-purple-800/50'
                        : 'bg-purple-100 group-hover:bg-purple-200'
                    }`}>
                      <Mail size={14} className="text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Email</p>
                      <p className="text-sm font-medium truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-green-900/30 group-hover:bg-green-800/50'
                        : 'bg-green-100 group-hover:bg-green-200'
                    }`}>
                      <Calendar size={14} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>Joined</p>
                      <p className="text-sm font-medium">
                        {formatDate(user.createdTimestamp)}
                      </p>
                    </div>
                  </div>

                  <div className={`pt-2 border-t ${
                    theme === 'dark' ? 'border-gray-800' : 'border-gray-100'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>ID</span>
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-mono ${
                        theme === 'dark'
                          ? 'bg-gray-800 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.id ? user.id.substring(0, 8) + "..." : "N/A"}
                      </span>
                    </div>
                  </div>

                  {user.requiredActions && user.requiredActions.length > 0 && (
                    <div className={`p-2 border rounded-lg ${
                      theme === 'dark'
                        ? 'bg-red-900/30 border-red-800'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <p className={`text-xs font-semibold ${
                        theme === 'dark' ? 'text-red-300' : 'text-red-800'
                      }`}>
                        ⚠️ Actions Required
                      </p>
                      <p className={`text-xs mt-0.5 ${
                        theme === 'dark' ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {user.requiredActions.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {sortedUsers.length > 0 && (
          <div className={`${
            theme === 'dark'
              ? 'bg-gray-900/80 backdrop-blur-xl border-gray-700'
              : 'bg-white/80 backdrop-blur-xl border-white/20'
          } rounded-2xl shadow-lg p-4 border`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Showing <span className="font-semibold">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-semibold">
                  {Math.min(indexOfLastUser, sortedUsers.length)}
                </span> of{" "}
                <span className="font-semibold">{sortedUsers.length}</span> users
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  } ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((number, index) => (
                    <button
                      key={index}
                      onClick={() => number !== '...' && paginate(number)}
                      className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg transition-all text-sm font-medium ${
                        number === currentPage
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : number === '...'
                          ? `${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} cursor-default`
                          : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}
                      disabled={number === '...'}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all ${
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  } ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>Users per page:</span>
                <select
                  value={usersPerPage}
                  onChange={(e) => {
                    setUsersPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                  <option value="15">15</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {sortedUsers.length === 0 && (
          <div className={`${
            theme === 'dark'
              ? 'bg-gray-900/80 backdrop-blur-xl border-gray-700'
              : 'bg-white/80 backdrop-blur-xl border-white/20'
          } rounded-2xl shadow-lg p-12 text-center border`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <User size={32} className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} />
            </div>
            <p className={`text-lg font-semibold mb-1 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              No users found
            </p>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
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
        theme={theme}
      >
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
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
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
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
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
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
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
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
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
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
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
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
            <div className={`p-4 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password Requirements:
              </p>
              <ul className={`text-xs space-y-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {passwordRequirements.map((req, index) => (
                  <li key={req.text} className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        req.met ? "bg-green-500" : theme === 'dark' ? "bg-gray-700" : "bg-gray-300"
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
                className={`
            flex-1 px-6 py-2
            border rounded-xl
            transition-all
            font-medium
            focus:outline-none
            focus:ring-2 focus:ring-gray-500
            ${
              theme === 'dark'
                ? 'border-gray-700 text-gray-300 hover:bg-gray-800 focus:ring-gray-400 bg-gray-900'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 bg-white'
            }
          `}
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
                : theme === 'dark'
                ? "bg-gradient-to-r from-gray-700 to-gray-800 cursor-not-allowed opacity-70"
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
        theme={theme}
      >
        {selectedUser && (
          <form onSubmit={handleEditFormSubmit}>
            <div className="space-y-4">
              {/* Username - Display only, not editable */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Username
                </label>
                <div className={`w-full px-4 py-2 border rounded-xl ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-gray-300'
                    : 'bg-gray-50 border-gray-300 text-gray-700'
                }`}>
                  {editFormData.username}
                </div>
                <p className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Username cannot be changed. Extracted from email:{" "}
                  {editFormData.email?.split("@")[0]}
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'border-gray-300'
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditInputChange}
                    className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditInputChange}
                    className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="enabled"
                    checked={editFormData.enabled}
                    onChange={handleEditInputChange}
                    className="mr-2"
                  />
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Enabled</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="emailVerified"
                    checked={editFormData.emailVerified}
                    onChange={handleEditInputChange}
                    className="mr-2"
                  />
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>Email Verified</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                  }}
                  className={`flex-1 px-6 py-2 border rounded-xl hover:bg-gray-50 transition-all font-medium focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'border-gray-700 text-gray-300 hover:bg-gray-800 focus:ring-gray-400'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
                  }`}
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
        theme={theme}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <p className={`text-sm mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Reset password for{" "}
                <span className={`font-semibold ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  {selectedUser.username || selectedUser.email}
                </span>
              </p>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  New Password *
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'border-gray-300'
                  }`}
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
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
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
                className={`flex-1 px-6 py-2 border rounded-xl hover:bg-gray-50 transition-all font-medium focus:outline-none focus:ring-2 ${
                  theme === 'dark'
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-800 focus:ring-gray-400'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
                }`}
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