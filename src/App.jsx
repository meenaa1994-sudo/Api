import React, { useState, useEffect } from 'react';
import UserCard from './Components/UserCard';
import UserTable from './Components/UserTable';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  // State Management
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch API Data on Component Mount
  useEffect(() => {
    const abortController = new AbortController();

    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - Failed to fetch users`);
        }

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();

    // Cleanup function to abort fetch if component unmounts
    return () => abortController.abort();
  }, []);

  // Event Handler: Filter users by Name, Username, or Email
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Event Handler: Export displayed user data to a CSV file (File Handling)
  const handleExportCSV = () => {
    if (filteredUsers.length === 0) return;

    const headers = ['ID,Name,Username,Email,Phone,Website'];
    const rows = filteredUsers.map(
      (user) =>
        `${user.id},"${user.name}","${user.username}","${user.email}","${user.phone}","${user.website}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'users_directory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Directory</h1>
            <p className="text-slate-500 mt-1">
              Fetched dynamically from JSONPlaceholder API
            </p>
          </div>

          {/* Controls: Search, View Toggle & Export */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search name, username, email..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white w-full sm:w-64"
            />

            <div className="inline-flex rounded-lg border border-slate-300 bg-white p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                  viewMode === 'cards'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                  viewMode === 'table'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Table
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              disabled={isLoading || filteredUsers.length === 0}
              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              Export CSV
            </button>
          </div>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600 font-medium">Loading user directory...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md my-6">
            <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Empty Search Result State */}
        {!isLoading && !error && filteredUsers.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-lg">
              No users found matching "{searchQuery}".
            </p>
          </div>
        )}

        {/* Data Display (Cards or Table) */}
        {!isLoading && !error && filteredUsers.length > 0 && (
          <>
            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <UserTable users={filteredUsers} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;