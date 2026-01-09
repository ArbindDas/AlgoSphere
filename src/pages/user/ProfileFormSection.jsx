

// ProfileFormSection.jsx
import React, { useState } from 'react';
import { 
  User, Mail, Phone, Cake, 
  Home, Building, Plus, Trash2, CheckCircle,
  Upload
} from 'lucide-react';
import { createUserProfile } from "../../api/user"
import { useTheme } from "../../context/ThemeContext"; // Import the theme hook


const ProfileFormSection = ({ userDetails, onProfileCreated, setProfileError, theme }) => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    profileImageUrl: '',
    preferences: '',
    addresses: [
      {
        type: 'HOME',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        isPrimary: true
      }
    ]
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Theme-specific colors
  const bgColor = theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95';
  const borderColor = theme === 'dark' ? 'border-gray-700/50' : 'border-white/30';
  const textColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const cardBg = theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50';
  const cardBorder = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const inputBorder = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const focusRing = theme === 'dark' ? 'focus:ring-blue-400' : 'focus:ring-blue-500';
  const placeholderColor = theme === 'dark' ? 'placeholder:text-gray-500' : 'placeholder:text-gray-400';
  const infoBg = theme === 'dark' ? 'bg-blue-900/20' : 'bg-gradient-to-r from-blue-50 to-purple-50';
  const infoBorder = theme === 'dark' ? 'border-blue-800/30' : 'border-blue-100';
  const infoText = theme === 'dark' ? 'text-blue-300' : 'text-blue-800';
  const infoLightText = theme === 'dark' ? 'text-blue-400/80' : 'text-blue-600';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (index, field, value) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index][field] = value;
    
    if (field === 'isPrimary' && value === true) {
      newAddresses.forEach((addr, i) => {
        if (i !== index) {
          addr.isPrimary = false;
        }
      });
    }
    
    setFormData(prev => ({
      ...prev,
      addresses: newAddresses
    }));
  };

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          type: 'HOME',
          addressLine1: '',
          addressLine2: '',
          city: '',
          state: '',
          country: '',
          zipCode: '',
          isPrimary: false
        }
      ]
    }));
  };

  const removeAddress = (index) => {
    if (formData.addresses.length <= 1) return;
    
    const newAddresses = [...formData.addresses];
    const wasPrimary = newAddresses[index].isPrimary;
    newAddresses.splice(index, 1);
    
    if (wasPrimary && newAddresses.length > 0) {
      newAddresses[0].isPrimary = true;
    }
    
    setFormData(prev => ({
      ...prev,
      addresses: newAddresses
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate phone number
    if (formData.phoneNumber && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Validate date of birth
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        newErrors.dateOfBirth = 'Date of birth cannot be in the future';
      }
    }

    // Validate addresses
    formData.addresses.forEach((address, index) => {
      if (!address.addressLine1.trim()) {
        newErrors[`address_${index}_line1`] = 'Address line 1 is required';
      }
      if (!address.city.trim()) {
        newErrors[`address_${index}_city`] = 'City is required';
      }
      if (!address.state.trim()) {
        newErrors[`address_${index}_state`] = 'State is required';
      }
      if (!address.country.trim()) {
        newErrors[`address_${index}_country`] = 'Country is required';
      }
      if (!address.zipCode.trim()) {
        newErrors[`address_${index}_zipCode`] = 'Zip code is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setProfileError('Please fix the errors in the form');
      return;
    }

    setLoading(true);
    setProfileError(null);

    try {
      // Use the axios instance function instead of fetch
      const data = await createUserProfile(formData);
      console.log('Profile created successfully:', data);
      onProfileCreated();
    } catch (err) {
      console.error('Error creating profile:', err);
      setProfileError(err.message || 'Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${bgColor} backdrop-blur-sm rounded-3xl p-6 border ${borderColor} shadow-xl transition-colors duration-300`}>
      <div className="mb-8">
        <h2 className={`text-2xl font-bold ${textColor} mb-2`}>Create Complete Profile</h2>
        <p className={textSecondary}>Fill in your details and addresses to complete your profile</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* User Info from Keycloak */}
        <div className={`${infoBg} rounded-2xl p-6 border ${infoBorder} transition-colors duration-300`}>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={20} className="text-green-500" />
            <h3 className={`font-bold ${theme === 'dark' ? 'text-blue-300' : 'text-gray-900'}`}>
              Information from Keycloak
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-400/80' : 'text-gray-500'} mb-1`}>Full Name</p>
              <p className={`font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-gray-900'}`}>
                {`${userDetails?.firstName || ''} ${userDetails?.lastName || ''}`.trim() || 'Not set'}
              </p>
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-400/80' : 'text-gray-500'} mb-1`}>Email</p>
              <p className={`font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-gray-900'}`}>
                {userDetails?.email || 'Not set'}
              </p>
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-400/80' : 'text-gray-500'} mb-1`}>Username</p>
              <p className={`font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-gray-900'}`}>
                {userDetails?.username || 'Not set'}
              </p>
            </div>
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-400/80' : 'text-gray-500'} mb-1`}>Account Status</p>
              <div className="flex items-center gap-2">
                <p className={`font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-gray-900'}`}>
                  {userDetails?.enabled ? 'Active' : 'Inactive'}
                </p>
                <CheckCircle size={16} className="text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div>
          <h3 className={`text-xl font-bold ${textColor} mb-6`}>Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                <div className="flex items-center gap-2">
                  <Phone size={16} className={textSecondary} />
                  Phone Number
                </div>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="+1234567890"
                className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${placeholderColor} ${textColor}`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                <div className="flex items-center gap-2">
                 
                  Gender
                </div>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${textColor}`}
              >
                <option value="" className={theme === 'dark' ? 'bg-gray-800' : ''}>Select Gender</option>
                <option value="MALE" className={theme === 'dark' ? 'bg-gray-800' : ''}>Male</option>
                <option value="FEMALE" className={theme === 'dark' ? 'bg-gray-800' : ''}>Female</option>
                <option value="OTHER" className={theme === 'dark' ? 'bg-gray-800' : ''}>Other</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium ${textColor} mb-2`}>
                <div className="flex items-center gap-2">
                  <Cake size={16} className={textSecondary} />
                  Date of Birth
                </div>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${textColor}`}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="mt-6">
            <label className={`block text-sm font-medium ${textColor} mb-2`}>
              Preferences (Optional)
            </label>
            <textarea
              name="preferences"
              value={formData.preferences}
              onChange={handleInputChange}
              placeholder="Tell us about your preferences..."
              rows={3}
              className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${placeholderColor} ${textColor}`}
            />
          </div>
        </div>

        {/* Addresses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${textColor}`}>Addresses</h3>
            <button
              type="button"
              onClick={addAddress}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus size={18} />
              Add Address
            </button>
          </div>

          <div className="space-y-6">
            {formData.addresses.map((address, index) => (
              <div key={index} className={`${cardBg} rounded-2xl p-6 border ${cardBorder} transition-colors duration-300`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg border ${inputBorder} flex items-center justify-center`}>
                      {address.type === 'HOME' ? (
                        <Home size={18} className={textSecondary} />
                      ) : (
                        <Building size={18} className={textSecondary} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-4">
                        <select
                          value={address.type}
                          onChange={(e) => handleAddressChange(index, 'type', e.target.value)}
                          className={`font-semibold ${textColor} bg-transparent border-none focus:outline-none`}
                        >
                          <option value="HOME" className={theme === 'dark' ? 'bg-gray-800' : ''}>Home</option>
                          <option value="WORK" className={theme === 'dark' ? 'bg-gray-800' : ''}>Work</option>
                          <option value="OTHER" className={theme === 'dark' ? 'bg-gray-800' : ''}>Other</option>
                        </select>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={address.isPrimary}
                            onChange={(e) => handleAddressChange(index, 'isPrimary', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className={`text-sm ${textSecondary}`}>Primary Address</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {formData.addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      value={address.addressLine1}
                      onChange={(e) => handleAddressChange(index, 'addressLine1', e.target.value)}
                      placeholder="Street address, P.O. box"
                      className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${placeholderColor} ${textColor}`}
                    />
                    {errors[`address_${index}_line1`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`address_${index}_line1`]}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      value={address.addressLine2}
                      onChange={(e) => handleAddressChange(index, 'addressLine2', e.target.value)}
                      placeholder="Apartment, suite, unit, building, floor"
                      className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${placeholderColor} ${textColor}`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>
                      City *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                      placeholder="City"
                      className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${placeholderColor} ${textColor}`}
                    />
                    {errors[`address_${index}_city`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`address_${index}_city`]}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>
                      State/Province *
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                      placeholder="State or province"
                      className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${placeholderColor} ${textColor}`}
                    />
                    {errors[`address_${index}_state`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`address_${index}_state`]}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>
                      Country *
                    </label>
                    <input
                      type="text"
                      value={address.country}
                      onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                      placeholder="Country"
                      className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${placeholderColor} ${textColor}`}
                    />
                    {errors[`address_${index}_country`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`address_${index}_country`]}</p>
                    )}
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      value={address.zipCode}
                      onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                      placeholder="ZIP or postal code"
                      className={`w-full px-4 py-3 ${inputBg} border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent transition-all ${placeholderColor} ${textColor}`}
                    />
                    {errors[`address_${index}_zipCode`] && (
                      <p className="mt-1 text-sm text-red-500">{errors[`address_${index}_zipCode`]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-700/30 dark:border-gray-200/30">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Profile...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Create Complete Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileFormSection;