'use client';
import { FaGlobe, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

interface UserFormData {
  email: string;
  name: string;
  dob: string;
  gender: string;
  password?: string;
}

const initialUserData: UserFormData = {
  email: 'user@example.com',
  name: 'John Doe',
  dob: '1990-01-01',
  gender: 'male',
};

export default function Home() {
  const [userData, setUserData] = useState<UserFormData>(initialUserData);
  const [editing, setEditing] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Updating user:', userData);
    // Here you would typically send an API request to update the user data
    setEditing(false);
  };

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat bg-[url('/bg_login.jpg')] overflow-y-hidden flex justify-center items-center">
      <header className="fixed top-0 left-0 z-50 w-full px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <nav className="py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FaGlobe size={32} />
          </div>
          <div className="flex items-center space-x-4">
            <FaUserCircle size={32} />
          </div>
        </nav>
      </header>

      <div className="mx-auto px-4 py-16 sm:py-24 md:py-32 lg:py-40 xl:py-48 w-1/2">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-4">User Profile</h1>

          {/* User Information */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="userId" value="1" />

            <div>
              <label htmlFor="email" className="block font-semibold mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={!editing}
                placeholder="Enter email"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!editing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
            </div>

            {
              editing && (
                <div>
                  <label htmlFor="email" className="block font-semibold mb-1">Email:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )
            }

            <div>
              <label htmlFor="name" className="block font-semibold mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                disabled={!editing}
                placeholder="Enter name"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!editing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
            </div>

            <div>
              <label htmlFor="dob" className="block font-semibold mb-1">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={userData.dob}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!editing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
            </div>

            <div>
              <label htmlFor="gender" className="block font-semibold mb-1">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={userData.gender}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!editing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setEditing(!editing)}
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>

              {editing && (
                <>
                  <button
                    type="submit"
                    className="mt-4 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}