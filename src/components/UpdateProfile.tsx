"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateProfile = ({ userDetails, updateUserDetails }: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "/api/user",
        {
          username,
          email,
          age,
          name,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      updateUserDetails();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error updating profile",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    console.log(userDetails);

    if (userDetails) {
      setUsername(userDetails?.username);
      setEmail(userDetails?.email);
      setName(userDetails?.name);
      setAge(userDetails?.age);
    }
  }, [userDetails]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-4 border rounded bg-white w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="border p-2 w-full"
            placeholder="Enter email"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
