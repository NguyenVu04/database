'use client';

import { UserRole } from "@/lib/helper/userrole";
import Head from "next/head";
import { redirect } from "next/navigation";
import { FaHome, FaUser, FaMapMarkerAlt, FaToolbox, FaGlobe } from "react-icons/fa"; // Import icons
import { CiLogin } from "react-icons/ci";

export default function SignupPage() {
  const handleSignUp = (role: string) => {
    redirect(`/signup/${role}`);
  };

  return (
    <>
      <Head>
        <title>Sign Up Options</title>
      </Head>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/bg_login.jpg')] bg-no-repeat"
      >
        {/* Home Button */}
        <div className="absolute top-4 left-4">
          <button
            type="button"
            className="flex items-center text-white bg-blue-500 p-2 rounded-full shadow-lg hover:bg-blue-600"
            onClick={() => redirect("/")}
          >
            <FaHome className="text-xl" />
            <span className="ml-2 font-medium">Main Page</span>
          </button>
        </div>

        {/* Sign Up Button */}
        <div className="absolute top-4 right-4">
          <button
            type="button"
            className="flex items-center text-white bg-green-500 px-4 py-2 rounded-lg shadow-lg hover:bg-green-600"
            onClick={() => redirect("/signin")}
          >
            <CiLogin className="text-xl" />
            <span className="ml-2 font-medium">Login</span>
          </button>
        </div>

        {/* Login Options */}
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 w-full max-w-md text-center">
          <div className="mx-auto w-fit mb-3">
            <FaGlobe size={64} color="blue"/>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Select Your Sign Up Role
          </h1>
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 px-4 mb-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={() => handleSignUp(UserRole.visitor)}
          >
            <FaUser className="text-xl mr-2" />
            Sign Up as Visitor
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 px-4 mb-4 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
            onClick={() => handleSignUp(UserRole.tourGuide)}
          >
            <FaMapMarkerAlt className="text-xl mr-2" />
            Sign Up as Tour Guide
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-full py-2 px-4 mb-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            onClick={() => handleSignUp(UserRole.serviceProvider)}
          >
            <FaToolbox className="text-xl mr-2" />
            Login as Service Provider
          </button>
        </div>
      </div>
    </>
  );
}