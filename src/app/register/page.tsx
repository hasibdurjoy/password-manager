// app/register/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await axios.post("/api/auth/register", {
        username,
        password,
        email,
        name,
        age,
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          className="border p-2 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="number"
          className="border p-2 w-full mb-4"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Age"
        />
        <input
          type="text"
          className="border p-2 w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Register
        </button>
        <div className="text-center mt-4 text-blue-400">
          <Link href="/login">Already Have Account? Sign In</Link>
        </div>
      </div>
    </div>
  );
}
