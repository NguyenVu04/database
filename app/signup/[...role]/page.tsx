'use client';

import calculateAge from "@/lib/helper/calculateage";
import signUp from "@/lib/helper/signup";
import { UserRole } from "@/lib/helper/userrole";
import { redirect } from "next/navigation";
import React, { ChangeEvent, FormEvent, use, useState } from "react";
import { FaHome } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';

export default function SignupPage({ params }: { params: Promise<{ role: string }> }) {
    const resolvedParams = use(params);
    const role = resolvedParams.role;

    if (UserRole[role as keyof typeof UserRole] === undefined) {
        redirect("/");
    }

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        dob: "",
        gender: "",
        phoneNumbers: [""], // Start with one empty phone number field
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (index: number, value: string) => {
        const updatedPhoneNumbers = [...formData.phoneNumbers];
        updatedPhoneNumbers[index] = value;
        setFormData({ ...formData, phoneNumbers: updatedPhoneNumbers });
    };

    const addPhoneNumber = () => {
        setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ""] });
    };

    const removePhoneNumber = (index: number) => {
        const updatedPhoneNumbers = formData.phoneNumbers.filter((_, i) => i !== index);
        setFormData({ ...formData, phoneNumbers: updatedPhoneNumbers });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!z.string().email().safeParse(formData.email).success) {
            toast.error("Invalid email format.", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        if (calculateAge(formData.dob) < 18) {
            toast.error("You must be at least 18 years old to sign up.", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        if (formData.phoneNumbers.some(phone => phone.length !== 10 && phone.length !== 0)) {
            toast.error("Phone numbers must be 10 digits long.", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        setFormData({ ...formData, phoneNumbers: formData.phoneNumbers.filter((item, index) => (formData.phoneNumbers.indexOf(item) !== index) || item.length !== 0) });

        try {
            await signUp(
                UserRole[role as keyof typeof UserRole],
                formData.email,
                formData.username,
                formData.password,
                formData.dob,   
                formData.gender,
                formData.phoneNumbers);

            return;
        } catch (error) {
            if (error instanceof Error && error.message === "EXIST") {
                toast.error("Email already exists. Please use a different email.", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.error(error);
            }
        }
        redirect("/signin");
    };

    return (
        <div
            className="flex items-center justify-center h-screen overflow-hidden bg-cover bg-center bg-[url('/signup_bg.jpg')] bg-no-repeat"
        >
            <ToastContainer />
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96 overflow-y-scroll h-5/6 no-scrollbar">
                {/* Logo Section */}
                <div
                    className="flex items-center justify-center mb-6 cursor-pointer"
                    onClick={() => redirect("/")}
                >
                    <FaHome className="text-3xl text-blue-500 hover:text-blue-700" />
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Other fields */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                            Date of Birth:
                        </label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender:
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border rounded-lg"
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* Phone numbers */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Numbers:</label>
                        {formData.phoneNumbers.map((phone, index) => (
                            <div key={index} className="flex items-center mt-2">
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                                    className="flex-1 p-2 border rounded-lg"
                                />
                                <button
                                    type="button"
                                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                                    onClick={() => removePhoneNumber(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            onClick={addPhoneNumber}
                        >
                            Add Phone
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};