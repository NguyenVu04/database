'use client';
import loginIsRequired from "@/app/api/auth/Session";
import { UserRole } from "@/lib/helper/userrole";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { BounceLoader } from "react-spinners";

export default function LoginPage({ params }: { params: Promise<{ role: string }> }) {
    const [resolvedparams, setResolvedParams] = useState<{ role: string } | null>(null);

    useEffect(() => {
        params.then((params) => {
            const role = UserRole[params.role as keyof typeof UserRole];

            if (!role) {
                redirect("/signin");
            }

            loginIsRequired(false, role).then((res) => {
                if (res) {
                    redirect(`/${params.role}`);
                }
                setResolvedParams(params);
            });
        });
    }, [params]);

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            role: "user",
        });

        if (result?.error) {
            setError("Invalid email or password");
            return;
        }

        redirect(`/${resolvedparams?.role}`);
    };

    if (!resolvedparams) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <BounceLoader color="red" loading={true} size={32} />
            </div>
        );
    }

    return (
        <div
            className="h-screen w-screen bg-cover bg-center flex items-center justify-center bg-[url('/bg_login.jpg')] bg-no-repeat"
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <FaHome
                        className="text-3xl text-gray-700 cursor-pointer hover:text-gray-900"
                        onClick={() => redirect("/")}
                    />
                </div>
                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    SIGN IN
                </h1>
                {
                    error && <p className="text-red-500 text-center mb-4">{error}</p>
                }
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            required
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            required
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
