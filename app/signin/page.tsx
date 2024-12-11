'use server';

import Head from "next/head";
import Link from "next/link";
import { FaHome, FaUser, FaPenFancy, FaMapMarkerAlt, FaToolbox, FaUserShield, FaUserPlus, FaGlobe } from "react-icons/fa"; // Import icons

export default async function LoginPage() {
  
  return (
    <>
      <Head>
        <title>Login Options</title>
      </Head>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/bg_login.jpg')] bg-no-repeat"
      >
        {/* Home Button */}
        <Link href="/">
          <div className="absolute top-4 left-4">
            <button
              type="button"
              className="flex items-center text-white bg-blue-500 p-2 rounded-full shadow-lg hover:bg-blue-600"
            >
              <FaHome className="text-xl" />
              <span className="ml-2 font-medium">Main Page</span>
            </button>
          </div>
        </Link>
        {/* Sign Up Button */}
        <Link href="/signup">
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="flex items-center text-white bg-green-500 px-4 py-2 rounded-lg shadow-lg hover:bg-green-600"
            >
              <FaUserPlus className="text-xl" />
              <span className="ml-2 font-medium">Sign Up</span>
            </button>
          </div>
        </Link>
        {/* Login Options */}
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <div className="mx-auto w-fit mb-3">
            <FaGlobe size={64} color="blue" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Select Your Login Role
          </h1>
          <Link href="/signin/visitor">
            <button
              type="button"
              className="flex items-center justify-center w-full py-2 px-4 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              <FaUser className="text-xl mr-2" />
              Login as Visitor
            </button>
          </Link>
          <Link href="/signin/journalist">
            <button
              type="button"
              className="flex items-center justify-center w-full py-2 px-4 mb-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              <FaPenFancy className="text-xl mr-2" />
              Login as Journalist
            </button>
          </Link>
          <Link href="/signin/tourguide">
            <button
              type="button"
              className="flex items-center justify-center w-full py-2 px-4 mb-4 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
            >
              <FaMapMarkerAlt className="text-xl mr-2" />
              Login as Tour Guide
            </button>
          </Link>
          <Link href="/signin/serviceprovider">
            <button
              type="button"
              className="flex items-center justify-center w-full py-2 px-4 mb-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              <FaToolbox className="text-xl mr-2" />
              Login as Service Provider
            </button>
          </Link>
          <Link href="/signin/admin">
            <button
              type="button"
              className="flex items-center justify-center w-full py-2 px-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              <FaUserShield className="text-xl mr-2" />
              Login as Admin
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}