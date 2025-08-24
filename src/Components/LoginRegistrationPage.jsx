import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, CreditCard, Check, X, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginRegistrationPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [registrationMethod, setRegistrationMethod] = useState('manual');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        paymentMethod: 'card'
    });
    const [verifications, setVerifications] = useState({
        email: false,
        phone: false
    });
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        if (name === 'password') {
            checkPasswordStrength(value);
            // Clear confirm password error if passwords now match
            if (formData.confirmPassword && value === formData.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }
        }

        if (name === 'confirmPassword') {
            // Check if passwords match
            if (value !== formData.password) {
                setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
            } else {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
            }
        }

        // Email validation
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
            } else {
                setErrors(prev => ({ ...prev, email: '' }));
            }
        }

        // Phone validation
        if (name === 'phone') {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (value && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number' }));
            } else {
                setErrors(prev => ({ ...prev, phone: '' }));
            }
        }

        // Name validation
        if (name === 'firstName' || name === 'lastName') {
            if (value && value.length < 2) {
                setErrors(prev => ({ ...prev, [name]: 'Name must be at least 2 characters long' }));
            } else {
                setErrors(prev => ({ ...prev, [name]: '' }));
            }
        }

        // Zip code validation
        if (name === 'zipCode') {
            const zipRegex = /^[0-9]{5}(-[0-9]{4})?$/;
            if (value && !zipRegex.test(value)) {
                setErrors(prev => ({ ...prev, zipCode: 'Please enter a valid zip code' }));
            } else {
                setErrors(prev => ({ ...prev, zipCode: '' }));
            }
        }
    };

    const checkPasswordStrength = (password) => {
        setPasswordStrength({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        });
    };

    const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

    const handleVerification = (type) => {
        setTimeout(() => {
            setVerifications(prev => ({ ...prev, [type]: true }));
        }, 1000);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin) {
            // Required field validation
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
            if (!formData.country) newErrors.country = 'Country is required';
            if (!formData.state.trim()) newErrors.state = 'State is required';
            if (!formData.city.trim()) newErrors.city = 'City is required';
            if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';

            // Email and phone verification
            if (!verifications.email) newErrors.email = 'Please verify your email address';
            if (!verifications.phone) newErrors.phone = 'Please verify your phone number';
        }

        // Common validations
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        // if (!validateForm()) {
        //     console.log("inside");

        //     return;
        // }

        try {
            const response = await fetch('https://2rabhvljg9.execute-api.eu-north-1.amazonaws.com/prod/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Registration successful:', result);
                navigate('/user', { state: { ...result?.user } });

                // Handle success (redirect, show success message, etc.)
            } else {
                console.error('Registration failed:', result.error);
                // Handle error (show error message)
            }
        } catch (error) {
            console.error('Network error:', error);
            // Handle network error
        }
    };

    const handleSocialSignup = (provider) => {
        setRegistrationMethod(provider);
        console.log(`${provider} sign-up initiated`);
    };

    const resetToManual = () => {
        setRegistrationMethod('manual');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a202c 100%)' }}>
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-center mb-3">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                                <Star className="w-4 h-4 text-blue-600" />
                            </div>
                            <h1 className="text-2xl font-bold">
                                {isLogin ? 'Welcome Back' : 'Join OpenMarket'}
                            </h1>
                        </div>
                        <p className="text-blue-100 text-sm">
                            {isLogin ? 'Connect your wallet and explore' : 'Create your digital identity'}
                        </p>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex bg-gray-700 m-4 rounded-lg p-1 border border-gray-600">
                    <button
                        onClick={() => {
                            setIsLogin(true);
                            setRegistrationMethod('manual');
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all text-sm ${isLogin
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-gray-600'
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => {
                            setIsLogin(false);
                            setRegistrationMethod('manual');
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all text-sm ${!isLogin
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'text-gray-300 hover:text-white hover:bg-gray-600'
                            }`}
                    >
                        Register
                    </button>
                </div>

                <div className="px-6 pb-6 space-y-4">
                    {/* Social Registration Options */}
                    {!isLogin && registrationMethod === 'manual' && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-gray-400 text-sm mb-4">Choose your registration method</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => handleSocialSignup('apple')}
                                    className="w-full p-3 border border-gray-600 rounded-lg flex items-center justify-center space-x-3 hover:border-blue-500 hover:bg-gray-700 transition-all group"
                                >
                                    <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                                        <span className="text-black text-xs">🍎</span>
                                    </div>
                                    <span className="font-medium text-gray-200 group-hover:text-white">Continue with Apple</span>
                                </button>

                                <button
                                    onClick={() => handleSocialSignup('google')}
                                    className="w-full p-3 border border-gray-600 rounded-lg flex items-center justify-center space-x-3 hover:border-blue-500 hover:bg-gray-700 transition-all group"
                                >
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div>
                                    <span className="font-medium text-gray-200 group-hover:text-white">Continue with Google</span>
                                </button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-3 bg-gray-800 text-gray-400">or register manually</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Success State */}
                    {!isLogin && registrationMethod !== 'manual' && (
                        <div className="text-center space-y-4">
                            <div className="p-4 bg-green-900 bg-opacity-30 border border-green-500 rounded-lg">
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    {registrationMethod === 'apple' && (
                                        <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                                            <span className="text-black text-xs">🍎</span>
                                        </div>
                                    )}
                                    {registrationMethod === 'google' && (
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div>
                                    )}
                                    <h3 className="font-semibold text-green-400">
                                        {registrationMethod === 'apple' ? 'Apple' : 'Google'} Authentication
                                    </h3>
                                </div>
                                <p className="text-sm text-green-300">
                                    Redirecting to {registrationMethod === 'apple' ? 'Apple' : 'Google'} for secure authentication...
                                </p>
                            </div>
                            <button
                                onClick={resetToManual}
                                className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                            >
                                ← Back to manual registration
                            </button>
                        </div>
                    )}

                    {/* Main Form */}
                    {(isLogin || (!isLogin && registrationMethod === 'manual')) && (
                        <>
                            {!isLogin && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2.5 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-white placeholder-gray-400 ${errors.firstName ? 'border-red-500' : 'border-gray-600'
                                                }`}
                                            placeholder="John"
                                            required={!isLogin}
                                        />
                                        {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2.5 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-white placeholder-gray-400 ${errors.lastName ? 'border-red-500' : 'border-gray-600'
                                                }`}
                                            placeholder="Doe"
                                            required={!isLogin}
                                        />
                                        {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2.5 pl-10 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-white placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-600'
                                            }`}
                                        placeholder="your@email.com"
                                        required
                                    />
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    {!isLogin && (
                                        <button
                                            type="button"
                                            onClick={() => handleVerification('email')}
                                            disabled={!formData.email || errors.email}
                                            className={`absolute right-2 top-2 px-2 py-1 text-xs rounded transition ${verifications.email
                                                ? 'bg-green-600 text-white'
                                                : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                                                }`}
                                        >
                                            {verifications.email ? '✓ Verified' : 'Verify'}
                                        </button>
                                    )}
                                </div>
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2.5 pr-10 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-white placeholder-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-600'
                                            }`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-300 transition"
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}

                                {!isLogin && formData.password && (
                                    <div className="mt-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                                        <div className="text-xs font-medium text-gray-300 mb-2">Password Requirements:</div>
                                        <div className="grid grid-cols-2 gap-1 text-xs">
                                            {[
                                                { key: 'length', label: '8+ characters' },
                                                { key: 'uppercase', label: 'Uppercase (A-Z)' },
                                                { key: 'lowercase', label: 'Lowercase (a-z)' },
                                                { key: 'number', label: 'Number (0-9)' },
                                                { key: 'special', label: 'Special char' }
                                            ].slice(0, 4).map(({ key, label }) => (
                                                <div key={key} className="flex items-center">
                                                    {passwordStrength[key] ? (
                                                        <Check className="h-3 w-3 text-green-400 mr-1.5" />
                                                    ) : (
                                                        <X className="h-3 w-3 text-red-400 mr-1.5" />
                                                    )}
                                                    <span className={passwordStrength[key] ? 'text-green-400' : 'text-red-400'}>
                                                        {label}
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="flex items-center col-span-2">
                                                {passwordStrength.special ? (
                                                    <Check className="h-3 w-3 text-green-400 mr-1.5" />
                                                ) : (
                                                    <X className="h-3 w-3 text-red-400 mr-1.5" />
                                                )}
                                                <span className={passwordStrength.special ? 'text-green-400' : 'text-red-400'}>
                                                    Special character (!@#$%^&*)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!isLogin && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2.5 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-white placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                                                }`}
                                            placeholder="••••••••"
                                            required
                                        />
                                        {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2.5 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-white placeholder-gray-400"
                                                placeholder="+1 (555) 123-4567"
                                                required
                                            />
                                            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <button
                                                type="button"
                                                onClick={() => handleVerification('phone')}
                                                className={`absolute right-2 top-2 px-2 py-1 text-xs rounded transition ${verifications.phone
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                            >
                                                {verifications.phone ? '✓ Verified' : 'Verify'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Address Section */}
                                    <div className="space-y-3 p-4 bg-gray-700 rounded-lg border border-gray-600">
                                        <h3 className="font-semibold text-gray-200 text-sm">Address Information</h3>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">
                                                Country
                                            </label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                                                required
                                            >
                                                <option value="">Select Country</option>
                                                <option value="US">🇺🇸 United States</option>
                                                <option value="CA">🇨🇦 Canada</option>
                                                <option value="UK">🇬🇧 United Kingdom</option>
                                                <option value="AU">🇦🇺 Australia</option>
                                                <option value="DE">🇩🇪 Germany</option>
                                                <option value="FR">🇫🇷 France</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">
                                                    State/Province
                                                </label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                                                    placeholder="California"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-400 mb-1">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                                                    placeholder="San Francisco"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1">
                                                Zip Code
                                            </label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                                                placeholder="94102"
                                                required
                                            />
                                        </div>
                                    </div>


                                </>
                            )}

                            <button
                                onClick={handleSubmit}
                                disabled={!isLogin && (!isPasswordStrong || formData.password !== formData.confirmPassword)}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                            >
                                {isLogin ? 'Connect Wallet & Sign In' : 'Create Account'}
                            </button>
                        </>
                    )}
                </div>

                {registrationMethod === 'manual' && (
                    <div className="px-6 pb-6 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
                        {isLogin ? "New to OpenMarket? " : "Already have an account? "}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setRegistrationMethod('manual');
                            }}
                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                            {isLogin ? 'Create account' : 'Sign in'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginRegistrationPage;