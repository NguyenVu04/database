'use client';
import { FaGlobe, FaUserCircle } from 'react-icons/fa';
import { MdDelete, MdAddIcCall } from "react-icons/md";
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserRole } from '@/lib/helper/userrole';
import { redirect } from 'next/navigation';
import loginIsRequired, { Session } from '../../api/auth/Session';
import getUserInfo from '@/lib/helper/getuserinfo';
import { BounceLoader } from 'react-spinners';
import updateUserInfo from '@/lib/helper/updateuserInfo';
import { signOut } from 'next-auth/react';

interface UserFormData {
  email: string;
  name: string;
  dob: string;
  gender: string;
  password?: string;
  phoneNumbers: string[];
}

const initialUserData: UserFormData = {
  email: '',
  name: '',
  dob: '',
  gender: '',
  phoneNumbers: [],
};

export default function Home({ params }: { params: Promise<{ role: string }> }) {
  const [userData, setUserData] = useState<UserFormData>(initialUserData);
  const [editing, setEditing] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("");
  const [session, setSession] = useState<Session | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDeletePhoneNumber = (index: number) => {
    const updatedPhoneNumbers = userData.phoneNumbers.filter((_, i) => i !== index);
    setUserData({ ...userData, phoneNumbers: updatedPhoneNumbers });
  };

  const handleAddPhoneNumber = () => {
    if (newPhoneNumber.trim() !== "") {
      if (userData.phoneNumbers.includes(newPhoneNumber)) {
        toast.error('Phone number already exists.', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      } else if (newPhoneNumber.length !== 10) {
        toast.error('Phone number must be 10 digits.', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }

      setUserData(prevData => ({ ...prevData, phoneNumbers: [...prevData.phoneNumbers, newPhoneNumber] }));
      setNewPhoneNumber(""); // Clear the input field
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserInfo(session?.id as string, {
      email: userData.email,
      name: userData.name,
      password: userData.password,
      date_of_birth: new Date(userData.dob),
      gender: userData.gender as "male" | "female",
      phone_numbers: userData.phoneNumbers
    }).then(() => {
      toast.success('Profile updated successfully.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setEditing(false);
    }).catch(() => {
      toast.error('Failed to update profile.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  };

  useEffect(() => {
    params.then((params) => {
      const role = UserRole[params.role as keyof typeof UserRole];
      if (role === undefined) {
        redirect("/");
      }

      loginIsRequired(true, role)
        .then((session) => {
          if (!session) {
            redirect("/signin");
          }
          getUserInfo(session.id)
            .then((user) => {
              if (!user) {
                redirect("/signin");
              }
              setUserData({
                email: user.email,
                name: user.name,
                dob: user.date_of_birth.toISOString().split('T')[0],
                gender: user.gender,
                phoneNumbers: user.phone_numbers
              });

              setSession(session);
            })
        })
    })
  }, [params]);

  if (session === null) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <BounceLoader color="red" loading={true} size={32} />
      </div>
    )
  }

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat bg-[url('/bg_login.jpg')] overflow-y-hidden flex justify-center items-center">
      <ToastContainer />
      <header className="fixed top-0 left-0 z-50 w-full px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <nav className="py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FaGlobe size={32} onClick={() => redirect("/")} className='cursor-pointer' />
          </div>
          <div className="flex items-center space-x-4">
            <FaUserCircle size={32} onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='cursor-pointer' />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-12 right-12 bg-white text-black shadow-lg rounded-lg z-10 w-32">
              <ul>
                <li className="hover:bg-gray-200 hover:text-blue-500 rounded-t-lg p-2 cursor-pointer" onClick={() => redirect('/visitor')}>
                  Main Page
                </li>
                <li className="hover:bg-gray-200 hover:text-red-500 rounded-b-lg p-2 cursor-pointer" onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <div className="mx-auto px-4 py-24 w-2/3 h-screen">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 h-full overflow-y-scroll no-scrollbar">
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
                  <label htmlFor="password" className="block font-semibold mb-1">Password:</label>
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

            <div className="font-semibold">Phone Numbers:</div>
            <ul>
              {
                userData.phoneNumbers.map((number, index) => (
                  <li key={index} className="mb-4 flex justify-between">
                    <input
                      title='phoneNumber'
                      type="text"
                      id={`phoneNumbers-${index}`}
                      name="phoneNumbers"
                      value={number}
                      onChange={handleInputChange}
                      disabled={!editing}
                      className={`px-3 py-2 w-5/6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!editing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    <button
                      type="button"
                      title='deletePhoneNumber'
                      onClick={() => handleDeletePhoneNumber(index)}
                      className="px-3 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-300"
                    >
                      <MdDelete />
                    </button>
                  </li>
                ))
              }
              {
                editing && (
                  <li className="mb-4 flex justify-between">
                    <input
                      title='phoneNumber'
                      type="text"
                      id="phoneNumbers"
                      name="phoneNumbers"
                      onChange={(e) => setNewPhoneNumber(e.target.value)}
                      className={`px-3 py-2 w-5/6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!editing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    />
                    <button
                      type="button"
                      title='deletePhoneNumber'
                      value={newPhoneNumber}
                      onClick={handleAddPhoneNumber}
                      className="ml-2 px-3 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
                    >
                      <MdAddIcCall />
                    </button>
                  </li>
                )
              }
            </ul>



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