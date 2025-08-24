import React, { useState, useEffect } from 'react';
import { Star, Search, Filter, ChevronDown, ChevronUp, CheckCircle, Eye, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';

const UsersTablePage = () => {
    const [users, setUsers] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({
        key: 'registrationDate',
        direction: 'desc'
    });
    const [starredUsers, setStarredUsers] = useState(new Set());

    useEffect(() => {
        const API = "https://2rabhvljg9.execute-api.eu-north-1.amazonaws.com/prod/users";
        fetch(API)
            .then(response => response.json())
            .then(data => {
                // console.log("res", JSON.stringify(data));
                console.log("Fetched data:", (data));
                const transformedUsers = data?.users.map(user => ({
                    id: user.userId,
                    name: `${user.firstName?.trim()} ${user.lastName?.trim()}`.trim(),
                    email: user.email,
                    // avatar: getAvatarEmoji(user.firstName),
                    registrationDate: user.createdAt,
                    status: user.status || 'active',
                    emailVerified: user.emailVerified || false,
                    phoneVerified: user.phoneVerified || false,
                    country: user.address?.country || 'US',
                    // loginCount: generateRandomCount(10, 300),
                    // lastSeen: calculateLastSeen(user.updatedAt || user.createdAt),
                    // activityTrend: generateRandomTrend(),
                    registrationMethod: user.registrationMethod || 'manual',
                    // changePercent: generateRandomChange(),
                    isPositive: Math.random() > 0.3,
                    phone: user.phone,
                    address: user.address,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }));
                console.log("transformedUsers", transformedUsers);

                setUsersData(transformedUsers);

                setUsersData(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    // Mock user data - replace with actual API call
    useEffect(() => {
        setTimeout(() => {
            const mockUsers = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    avatar: '🧑‍💼',
                    registrationDate: '2024-08-20',
                    status: 'active',
                    emailVerified: true,
                    phoneVerified: true,
                    country: 'US',
                    loginCount: 245,
                    lastSeen: '2 hours ago',
                    activityTrend: [12, 19, 15, 27, 18, 23, 31],
                    registrationMethod: 'manual',
                    changePercent: '+15.2%',
                    isPositive: true
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    email: 'jane.smith@example.com',
                    avatar: '👩‍💻',
                    registrationDate: '2024-08-19',
                    status: 'active',
                    emailVerified: true,
                    phoneVerified: false,
                    country: 'CA',
                    loginCount: 156,
                    lastSeen: '1 day ago',
                    activityTrend: [8, 12, 9, 15, 22, 18, 25],
                    registrationMethod: 'google',
                    changePercent: '+8.7%',
                    isPositive: true
                },
                {
                    id: '3',
                    name: 'Mike Johnson',
                    email: 'mike.johnson@example.com',
                    avatar: '👨‍🔬',
                    registrationDate: '2024-08-18',
                    status: 'pending',
                    emailVerified: false,
                    phoneVerified: true,
                    country: 'UK',
                    loginCount: 89,
                    lastSeen: '3 days ago',
                    activityTrend: [15, 18, 12, 8, 14, 10, 6],
                    registrationMethod: 'apple',
                    changePercent: '-12.3%',
                    isPositive: false
                },
                {
                    id: '4',
                    name: 'Sarah Wilson',
                    email: 'sarah.wilson@example.com',
                    avatar: '👩‍🎨',
                    registrationDate: '2024-08-17',
                    status: 'active',
                    emailVerified: true,
                    phoneVerified: true,
                    country: 'AU',
                    loginCount: 312,
                    lastSeen: '5 minutes ago',
                    activityTrend: [20, 25, 18, 30, 28, 35, 32],
                    registrationMethod: 'manual',
                    changePercent: '+22.1%',
                    isPositive: true
                },
                {
                    id: '5',
                    name: 'Alex Brown',
                    email: 'alex.brown@example.com',
                    avatar: '🧑‍🎓',
                    registrationDate: '2024-08-16',
                    status: 'inactive',
                    emailVerified: true,
                    phoneVerified: false,
                    country: 'DE',
                    loginCount: 67,
                    lastSeen: '2 weeks ago',
                    activityTrend: [25, 20, 15, 12, 8, 5, 2],
                    registrationMethod: 'google',
                    changePercent: '-35.4%',
                    isPositive: false
                },
                {
                    id: '6',
                    name: 'Emma Davis',
                    email: 'emma.davis@example.com',
                    avatar: '👩‍🚀',
                    registrationDate: '2024-08-15',
                    status: 'active',
                    emailVerified: true,
                    phoneVerified: true,
                    country: 'FR',
                    loginCount: 198,
                    lastSeen: '30 minutes ago',
                    activityTrend: [10, 14, 18, 22, 19, 24, 28],
                    registrationMethod: 'manual',
                    changePercent: '+11.8%',
                    isPositive: true
                },
                {
                    id: '7',
                    name: 'David Miller',
                    email: 'david.miller@example.com',
                    avatar: '👨‍💼',
                    registrationDate: '2024-08-14',
                    status: 'active',
                    emailVerified: false,
                    phoneVerified: true,
                    country: 'JP',
                    loginCount: 134,
                    lastSeen: '4 hours ago',
                    activityTrend: [18, 16, 20, 17, 21, 19, 23],
                    registrationMethod: 'apple',
                    changePercent: '+5.3%',
                    isPositive: true
                },
                {
                    id: '8',
                    name: 'Lisa Garcia',
                    email: 'lisa.garcia@example.com',
                    avatar: '👩‍⚕️',
                    registrationDate: '2024-08-13',
                    status: 'pending',
                    emailVerified: true,
                    phoneVerified: false,
                    country: 'ES',
                    loginCount: 45,
                    lastSeen: '1 week ago',
                    activityTrend: [12, 15, 11, 8, 6, 4, 7],
                    registrationMethod: 'google',
                    changePercent: '-18.9%',
                    isPositive: false
                }
            ];
            setUsers(mockUsers);
            setLoading(false);
        }, 1000);
    }, []);

    const getCountryFlag = (country) => {
        const flags = {
            'US': '🇺🇸',
            'CA': '🇨🇦',
            'UK': '🇬🇧',
            'AU': '🇦🇺',
            'DE': '🇩🇪',
            'FR': '🇫🇷',
            'JP': '🇯🇵',
            'ES': '🇪🇸'
        };
        return flags[country] || '🌍';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-400';
            case 'pending': return 'text-yellow-400';
            case 'inactive': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getRegistrationMethodIcon = (method) => {
        switch (method) {
            case 'google': return '🔍';
            case 'apple': return '🍎';
            case 'manual': return '📝';
            default: return '👤';
        }
    };

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc'
        });
    };

    const toggleStar = (userId) => {
        setStarredUsers(prev => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) {
                newSet.delete(userId);
            } else {
                newSet.add(userId);
            }
            return newSet;
        });
    };

    const MiniChart = ({ data, isPositive }) => {
        const max = Math.max(...data);
        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * 60;
            const y = 20 - (value / max) * 15;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg width="60" height="20" className="inline-block">
                <polyline
                    fill="none"
                    stroke={isPositive ? '#10B981' : '#EF4444'}
                    strokeWidth="1.5"
                    points={points}
                />
            </svg>
        );
    };

    const filteredAndSortedUsers = users
        .filter(user => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        })
        .sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === 'registrationDate') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortConfig.direction === 'asc') {
                return aValue > bValue ? 1 : -1;
            }
            return aValue < bValue ? 1 : -1;
        });

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Users Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                        <button className="flex items-center px-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm hover:bg-gray-600">
                            <Filter className="h-4 w-4 mr-1" />
                            Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-800 border-b border-gray-700">
                        <tr className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            <th className="px-6 py-4 w-8"></th>
                            <th className="px-6 py-4">
                                <button onClick={() => handleSort('name')} className="flex items-center hover:text-white">
                                    USER
                                    {sortConfig.key === 'name' && (
                                        sortConfig.direction === 'desc' ? <ChevronDown className="ml-1 h-3 w-3" /> : <ChevronUp className="ml-1 h-3 w-3" />
                                    )}
                                </button>
                            </th>
                            <th className="px-6 py-4">EMAIL</th>
                            <th className="px-6 py-4">
                                <button onClick={() => handleSort('registrationDate')} className="flex items-center hover:text-white">
                                    REGISTERED
                                    {sortConfig.key === 'registrationDate' && (
                                        sortConfig.direction === 'desc' ? <ChevronDown className="ml-1 h-3 w-3" /> : <ChevronUp className="ml-1 h-3 w-3" />
                                    )}
                                </button>
                            </th>
                            <th className="px-6 py-4">7D CHANGE</th>
                            <th className="px-6 py-4">STATUS</th>
                            <th className="px-6 py-4">VERIFICATION</th>
                            <th className="px-6 py-4">
                                <button onClick={() => handleSort('loginCount')} className="flex items-center hover:text-white">
                                    LOGINS
                                    {sortConfig.key === 'loginCount' && (
                                        sortConfig.direction === 'desc' ? <ChevronDown className="ml-1 h-3 w-3" /> : <ChevronUp className="ml-1 h-3 w-3" />
                                    )}
                                </button>
                            </th>
                            <th className="px-6 py-4">LOCATION</th>
                            <th className="px-6 py-4">LAST SEEN</th>
                            <th className="px-6 py-4">ACTIVITY</th>
                            <th className="px-6 py-4 w-8"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {loading ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <tr key={index} className="hover:bg-gray-800">
                                    <td colSpan="12" className="px-6 py-4">
                                        <div className="animate-pulse flex items-center space-x-4">
                                            <div className="rounded-full bg-gray-600 h-8 w-8"></div>
                                            <div className="flex-1 space-y-2 py-1">
                                                <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                                                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            filteredAndSortedUsers.map((user, index) => (
                                <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => toggleStar(user.id)}
                                            className={`transition-colors ${starredUsers.has(user.id)
                                                ? 'text-yellow-400'
                                                : 'text-gray-600 hover:text-gray-400'
                                                }`}
                                        >
                                            <Star className={`h-4 w-4 ${starredUsers.has(user.id) ? 'fill-current' : ''}`} />
                                        </button>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center mr-3 text-sm relative">
                                                {user.avatar}
                                                {(user.emailVerified || user.phoneVerified) && (
                                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                                        <CheckCircle className="h-2 w-2 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white flex items-center">
                                                    {user.name}
                                                    <span className="ml-2 text-xs">
                                                        {getRegistrationMethodIcon(user.registrationMethod)}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-400">ID: {user.id}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="text-sm text-white">{user.email}</div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="text-sm text-white">
                                            {new Date(user.registrationDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {user.registrationMethod.toUpperCase()}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className={`text-sm font-medium flex items-center ${user.isPositive ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {user.isPositive ? (
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                            ) : (
                                                <TrendingDown className="h-3 w-3 mr-1" />
                                            )}
                                            {user.changePercent}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-medium ${getStatusColor(user.status)}`}>
                                            {user.status.toUpperCase()}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex space-x-1">
                                            <span className={`text-xs ${user.emailVerified ? 'text-green-400' : 'text-red-400'}`}>
                                                ✉{user.emailVerified ? '✓' : '✗'}
                                            </span>
                                            <span className={`text-xs ${user.phoneVerified ? 'text-green-400' : 'text-red-400'}`}>
                                                📱{user.phoneVerified ? '✓' : '✗'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="text-sm text-white font-medium">{user.loginCount}</div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-sm text-white">
                                            <span className="mr-2">{getCountryFlag(user.country)}</span>
                                            {user.country}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="text-sm text-white">{user.lastSeen}</div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <MiniChart data={user.activityTrend} isPositive={user.isPositive} />
                                    </td>

                                    <td className="px-6 py-4">
                                        <button className="text-gray-400 hover:text-white transition-colors">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Stats */}
            <div className="px-6 py-4 border-t border-gray-700 bg-gray-800">
                <div className="flex justify-between items-center text-sm text-gray-400">
                    <div>
                        Showing {filteredAndSortedUsers.length} users
                    </div>
                    <div className="flex space-x-6">
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            Active: {users.filter(u => u.status === 'active').length}
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                            Pending: {users.filter(u => u.status === 'pending').length}
                        </span>
                        <span className="flex items-center">
                            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                            Inactive: {users.filter(u => u.status === 'inactive').length}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersTablePage;