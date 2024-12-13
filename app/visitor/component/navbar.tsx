'use client';
import Link from "next/link";
import { useState } from "react";
import { FaGlobe, FaUserCircle } from "react-icons/fa";
import CreatePostForm from "./CreatePostForm";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

const Navbar = ({visitorId} : {visitorId?: string | null}) => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    return (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center fixed w-full z-10">
            <Link href="/">
                <FaGlobe size={30} /> {/* Globe Icon */}
            </Link>
            <div className="flex items-center space-x-4">
                <button type="button" className="bg-green-500 px-4 py-2 rounded text-white" onClick={() => setIsPopupOpen(true)}>
                    Create New Post
                </button>
                <FaUserCircle size={30} onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer"/> {/* Profile Icon */}
            </div>
            {isPopupOpen && (
                <CreatePostForm onClose={() => setIsPopupOpen(false)} visitorId={visitorId} />
            )}
            {isDropdownOpen && (
                <div className="absolute top-12 right-12 bg-white text-black shadow-lg rounded-lg z-10 w-32">
                    <ul>
                        <li className="hover:bg-gray-200 hover:text-blue-500 rounded-t-lg p-2 cursor-pointer" onClick={() => redirect('/profile/visitor')}>
                            Profile
                        </li>
                        <li className="hover:bg-gray-200 hover:text-red-500 rounded-b-lg p-2 cursor-pointer" onClick={() => signOut({redirect: true, callbackUrl: '/'})}>
                            Sign Out
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Navbar;