'use client';

import calculateAge from "@/lib/helper/calculateage";
import signUp from "@/lib/helper/signup";
import { UserRole } from "@/lib/helper/userrole";
import { redirect } from "next/navigation";
import React, { ChangeEvent, FormEvent, use, useState } from "react";
import { FaHome } from "react-icons/fa";

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

    const [error, setError] = useState<string | null>(null);

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

        if (calculateAge(formData.dob) < 18) {
            setError("You must be at least 18 years old to sign up.");
            return;
        }
        try {
            await signUp(
                UserRole[role as keyof typeof UserRole],
                formData.email,
                formData.username,
                formData.password,
                formData.dob,
                formData.gender,
                formData.phoneNumbers);

            redirect("/signin");
        } catch (error) {
            if (error instanceof Error && error.message === "EXIST") {
                setError("Email already exists. Please use a different email.");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-[url('/signup_bg.jpg')] bg-no-repeat"
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96">
                {/* Logo Section */}
                <div
                    className="flex items-center justify-center mb-6 cursor-pointer"
                    onClick={() => redirect("/")}
                >
                    <FaHome className="text-3xl text-blue-500 hover:text-blue-700" />
                </div>

                {/* Form Section */}
                <h2 className="text-2xl font-bold text-center mb-6">SIGN UP</h2>
                {
                    error && (
                        <p className="text-red-500 mb-4">{error}</p>
                    )
                }
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