"use client";

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
      router.push("/chatbox");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center"
      style = {{
        backgroundColor: '#131b2b',
        background: 'linear-gradient(to top, #131b2b, #060816, #102937, #060816, #131b2b)'
      }}>
      <form
        className="w-96 p-4 border border-gray-300 rounded-lg"
        onSubmit={handleLogin}
        style = {{
          backgroundColor: "#060816",
          border: "4px solid #131b2b"
        }}
      >
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
        <button type="submit" className="w-full p-2 bg-blue-500 rounded-lg"
          style={{ backgroundColor: '#092733',
            borderRadius: '8px',
            border: '2px solid #364ac9',
            color: 'white'
          }}>
          Login
        </button>
        <div className="mt-4 text-center text-white">
          <Link href="/register">
            Don&apos;t have an account?{" "}
            <span className="font-bold">Sign up.</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
