import { useState, useEffect } from 'react';

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [lastKey, setLastKey] = useState(null);

  const fetchUsers = async (filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(
        `YOUR_API_GATEWAY_URL/users?${queryParams.toString()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const result = await response.json();

      if (response.ok) {
        setUsers(result.users);
        setHasMoreData(result.hasMoreData);
        setLastKey(result.lastEvaluatedKey);
      } else {
        setError(result.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, hasMoreData, lastKey, fetchUsers };
};

// Usage in component
const UsersListComponent = () => {
  const { users, loading, error, fetchUsers } = useGetUsers();

  useEffect(() => {
    fetchUsers(); // Fetch all users on component mount
  }, []);

  const handleFilterUsers = () => {
    fetchUsers({
      country: 'US',
      emailVerified: true,
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleFilterUsers}>Filter US Users</button>
      <div>
        {users.map(user => (
          <div key={user.userId}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Country: {user.address?.country}</p>
            <p>Registered: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};