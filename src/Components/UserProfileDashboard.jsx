import React, { useEffect, useState } from 'react';
import { User, LogOut, CreditCard, Edit, Save, X, Eye, EyeOff, Star, Bell, Settings, CheckCircle, User2Icon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserProfileDashboard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const { state: registerData } = useLocation();
    const navigate = useNavigate();

    console.log("registerData", registerData);

    useEffect(() => {
        if (!registerData) {
            console.log("registerData", registerData);

            navigate('/', { replace: true });
        }
    }, [registerData, navigate]);

    // if (!state) {
    //     return null; // or a loader
    // }

    // const { city, country, email, firstName, lastName, phone, state, zipCode } = registerData;

    const [userProfile, setUserProfile] = useState({});

    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: 'visa',
            last4: '4242',
            expiryMonth: '12',
            expiryYear: '2027',
            holderName: 'John Doe',
            isDefault: true,
            billingAddress: {
                street: '123 Market Street',
                city: 'San Francisco',
                state: 'CA',
                zipCode: '94102'
            }
        }

    ]);

    const handleLogout = () => {
        console.log('User logged out');
        alert('You have been logged out successfully!');
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowCardDetails(true);
    };

    const getCardIcon = (type) => {
        const icons = {
            'visa': '💳',
            'mastercard': '💳',
            'amex': '💳',
            'discover': '💳'
        };
        return icons[type] || '💳';
    };

    const getCardColor = (type) => {
        const colors = {
            'visa': 'from-blue-600 to-blue-800',
            'mastercard': 'from-red-600 to-red-800',
            'amex': 'from-green-600 to-green-800',
            'discover': 'from-orange-600 to-orange-800'
        };
        return colors[type] || 'from-gray-600 to-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <h1 className="text-2xl font-bold">My Profile</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                            <Bell className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                            <Settings className="h-5 w-5" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Welcome Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                                    {/* /add avatar */}
                                    <User2Icon />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">Welcome, {registerData?.firstName}!</h1>
                                    <p className="text-blue-100">Registration completed successfully</p>
                                    <div className="flex items-center mt-2">
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-300" />
                                        <span className="text-sm">Account verified and active</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-blue-100 text-sm">Member since</p>
                                <p className="text-white font-medium">{new Date(registerData?.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold flex items-center">
                                <User className="h-5 w-5 mr-2 text-blue-400" />
                                Profile Information
                            </h2>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={registerData?.firstName}
                                            onChange={(e) => setUserProfile({ ...registerData, firstName: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">{registerData?.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={registerData?.lastName}
                                            onChange={(e) => setUserProfile({ ...registerData, lastName: e.target.value })}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    ) : (
                                        <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">{registerData?.lastName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                    <div className="flex items-center">
                                        <p className="text-white bg-gray-700 px-3 py-2 rounded-lg flex-1">{registerData?.email}</p>
                                        {registerData?.emailVerified && (
                                            <CheckCircle className="h-5 w-5 text-green-400 ml-2" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                    <div className="flex items-center">
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={registerData?.phone}
                                                onChange={(e) => setUserProfile({ ...registerData, phone: e.target.value })}
                                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                            />
                                        ) : (
                                            <p className="text-white bg-gray-700 px-3 py-2 rounded-lg flex-1">{registerData?.phone}</p>
                                        )}
                                        {registerData?.phoneVerified && (
                                            <CheckCircle className="h-5 w-5 text-green-400 ml-2" />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                                    {isEditing ? (
                                        <textarea
                                            value={`${registerData?.address?.city}, ${registerData?.address?.state} ${registerData?.address?.zipCode}`}
                                            onChange={(e) => {
                                                const lines = e.target.value.split('\n');
                                                const cityState = lines[1]?.split(',') || ['', ''];
                                                setUserProfile({
                                                    ...registerData,
                                                    address: {
                                                        ...registerData.address,
                                                        city: cityState[0]?.trim() || '',
                                                        state: cityState[1]?.trim() || ''
                                                    }
                                                });
                                            }}
                                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none h-20 resize-none"
                                        />
                                    ) : (
                                        <div className="text-white bg-gray-700 px-3 py-2 rounded-lg">
                                            <p>{registerData?.address?.city}, {registerData?.address?.state} {registerData?.address?.zipCode}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={handleSaveProfile}
                                    className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold flex items-center">
                                <CreditCard className="h-5 w-5 mr-2 text-blue-400" />
                                Card Model
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {paymentMethods.map((card) => (
                                <div key={card.id} className="relative">
                                    {/* Credit Card Design */}
                                    <div
                                        onClick={() => handleCardClick(card)}
                                        className={`bg-gradient-to-br ${getCardColor(card.type)} rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="text-2xl">{getCardIcon(card.type)}</div>
                                            <div className="text-right">
                                                <p className="text-xs opacity-75">EXPIRES</p>
                                                <p className="text-sm font-medium">{card.expiryMonth}/{card.expiryYear}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-xs opacity-75 mb-1">CARD NUMBER</p>
                                            <p className="text-lg font-mono tracking-wider">
                                                •••• •••• •••• {card.last4}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-xs opacity-75 mb-1">CARDHOLDER NAME</p>
                                                <p className="text-sm font-medium">{card.holderName.toUpperCase()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-medium uppercase">{card.type}</p>
                                                {card.isDefault && (
                                                    <div className="flex items-center mt-1">
                                                        <Star className="h-3 w-3 text-yellow-300 mr-1" />
                                                        <span className="text-xs">Default</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Actions */}
                                    <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
                                        <div className="bg-black bg-opacity-50 backdrop-blur rounded-lg p-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Edit card logic
                                                }}
                                                className="p-1 hover:bg-white hover:bg-opacity-20 rounded text-white"
                                            >
                                                <Edit className="h-3 w-3" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Delete card logic
                                                }}
                                                className="p-1 hover:bg-white hover:bg-opacity-20 rounded text-white ml-1"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card Details Modal */}
                    {/* {showCardDetails && selectedCard && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-2xl w-full max-h-screen overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold">Card Details</h3>
                                    <button
                                        onClick={() => setShowCardDetails(false)}
                                        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <div className={`bg-gradient-to-br ${getCardColor(selectedCard.type)} rounded-xl p-8 text-white shadow-2xl max-w-sm mx-auto`}>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="text-3xl">{getCardIcon(selectedCard.type)}</div>
                                            <div className="text-right">
                                                <p className="text-xs opacity-75">EXPIRES</p>
                                                <p className="text-lg font-medium">{selectedCard.expiryMonth}/{selectedCard.expiryYear}</p>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <p className="text-xs opacity-75 mb-2">CARD NUMBER</p>
                                            <div className="flex items-center">
                                                <p className="text-2xl font-mono tracking-wider">
                                                    {showCardDetails ? `4242 4242 4242 ${selectedCard.last4}` : `•••• •••• •••• ${selectedCard.last4}`}
                                                </p>
                                                <button
                                                    onClick={() => setShowCardDetails(!showCardDetails)}
                                                    className="ml-3 p-1 hover:bg-white hover:bg-opacity-20 rounded"
                                                >
                                                    {showCardDetails ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-xs opacity-75 mb-2">CARDHOLDER NAME</p>
                                                <p className="text-lg font-medium">{selectedCard.holderName.toUpperCase()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-medium uppercase">{selectedCard.type}</p>
                                                {selectedCard.isDefault && (
                                                    <div className="flex items-center mt-2">
                                                        <Star className="h-4 w-4 text-yellow-300 mr-2" />
                                                        <span className="text-sm">Default Card</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                                            <p className="text-white bg-gray-700 px-3 py-2 rounded-lg font-mono">•••• •••• •••• {selectedCard.last4}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Expiry</label>
                                                <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">{selectedCard.expiryMonth}/{selectedCard.expiryYear}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                                                <p className="text-white bg-gray-700 px-3 py-2 rounded-lg">•••</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Billing Address</label>
                                            <div className="text-white bg-gray-700 px-3 py-2 rounded-lg">
                                                <p>{selectedCard.billingAddress.street}</p>
                                                <p>{selectedCard.billingAddress.city}, {selectedCard.billingAddress.state} {selectedCard.billingAddress.zipCode}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 mt-4">
                                            <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                                Edit Card
                                            </button>
                                            <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                                                Delete Card
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default UserProfileDashboard;