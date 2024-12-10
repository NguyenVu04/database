'use client';
import Link from "next/link";
import { useState } from "react";
import { FaGlobe, FaUserCircle } from "react-icons/fa";
import CreatePostForm from "./CreatePostForm";

const Navbar = () => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    return (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center fixed w-full z-10">
            <Link href="/">
                <FaGlobe size={30} /> {/* Globe Icon */}
            </Link>
            <div className="flex items-center space-x-4">
                <button type="button" className="bg-green-500 px-4 py-2 rounded text-white" onClick={() => setIsPopupOpen(true)}>
                    Create New Post
                </button>
                <FaUserCircle size={30} /> {/* Profile Icon */}
            </div>
            {isPopupOpen && (
                <CreatePostForm onClose={() => setIsPopupOpen(false)} />
            )}
        </div>
    );
}

export default Navbar;