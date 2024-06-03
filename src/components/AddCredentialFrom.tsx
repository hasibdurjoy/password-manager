// components/AddCredentialForm.tsx
import { useState } from "react";
import axios from "axios";

const AddCredentialForm = ({ addItem }: any) => {
  const [softwareName, setSoftwareName] = useState("");
  const [softwareType, setSoftwareType] = useState("Website");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(""); // Add logic to get the actual user ID

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      /*  const response = await axios.post("/api/credentials", {
        softwareName,
        softwareType,
        username,
        password,
        userId,
      }); */

      addItem({
        softwareName,
        softwareType,
        username,
        password,
        userId,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      });

      // console.log("Credential added:", response.data);
      // Reset form fields
      setSoftwareName("");
      setSoftwareType("Website");
      setUsername("");
      setPassword("");
      setUserId("");
    } catch (error) {
      console.error("Error adding credential:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Add Credential</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Software Name</label>
        <input
          type="text"
          value={softwareName}
          onChange={(e) => setSoftwareName(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter software name"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Software Type</label>
        <select
          value={softwareType}
          onChange={(e) => setSoftwareType(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="Website">Website</option>
          <option value="DesktopApp">Desktop Application</option>
          <option value="Game">Game</option>
        </select>
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
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter password"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter user ID"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Add Credential
      </button>
    </form>
  );
};

export default AddCredentialForm;
