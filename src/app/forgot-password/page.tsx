"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (username) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reset Link send to your email please check",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Email required",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          className="border p-2 w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          required
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Send Reset Link
        </button>
        <div className="text-center mt-4 text-blue-400">
          <Link href="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
