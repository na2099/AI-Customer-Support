'use client';

import React, { useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
            router.push("/dashboard");
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form className="w-96 p-4 border border-gray-300 rounded-lg" onSubmit={handleLogin}>
                <h1 className="text-2xl font-bold text-center text-white">Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
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
                        className="w-full p-2 bg-blue-500 text-white rounded-lg"
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <Link href="/register" className="text-white">
                            Don&apos;t have an account? <span className="font-bold">Sign up.</span>
                        </Link>
                    </div>
            </form>
        </div>
    );
};

export default LoginPage;