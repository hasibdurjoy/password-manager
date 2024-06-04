import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        "/api/password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Password Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error updating password",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-4 border rounded bg-white w-[400px]"
    >
      <h2 className="text-2xl font-bold mb-4">Update Password</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Current Password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter current password"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter new password"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Update Password
      </button>
    </form>
  );
};

export default UpdatePassword;
