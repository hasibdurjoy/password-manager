// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Item {
  _id: string;
  name: string;
  type: string;
  username: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      fetchItems();
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items");
      setItems(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async () => {
    try {
      await axios.post("/api/items", {
        name,
        type,
        username,
        password,
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Password Saved Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchItems();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id: string) => {
    Swal.fire({
      title: "Are you sure? you want to delete item",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/items/${id}`);
          setItems(items.filter((item) => item._id !== id));
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted!",
            text: "Your file has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="xs:max-w-lg max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Application</h1>
      <div className="mb-4 max-w-md">
        <input
          type="text"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item name"
        />
        <input
          type="text"
          className="border p-2 w-full mb-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter item type"
        />
        <input
          type="text"
          className="border p-2 w-full mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter item type"
        />
        <input
          type="text"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter item type"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Item
        </button>
      </div>
      <div>
        <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                    Username
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                    Password
                  </th>
                  <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.type}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.username}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {item.password}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 flex items-center gap-4">
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
