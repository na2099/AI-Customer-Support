'use client'

import React, { useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form className="flex flex-col w-96 p-4 border border-gray-300 rounded-lg" onSubmit={handleRegister}>
                <h1 className="text-2xl font-bold text-center">Register</h1> 
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 rounded-lg"
                >
                    Register
                </button>
                <div className="mt-4 text-center">
                    <Link href="/login">
                        Already have an account? <span className="font-bold">Sign in.</span>
                    </Link>
                </div>
            </form>
        </div>
    );

};

export default RegisterPage;