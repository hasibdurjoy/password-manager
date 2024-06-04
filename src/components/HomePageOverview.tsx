"use client";
import AddCredentialForm from "@/components/AddCredentialFrom";
import Modal from "@/components/Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Item {
  _id: string;
  name: string;
  type: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

const HomePageOverview = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<Item>();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);

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
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/api/items", {
        headers: {
          Authorization: `${token}`, // Include the token in the Authorization header
        },
      });
      setItems(res.data.data);
      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id: string) => {
    const token = localStorage.getItem("token");
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
          await axios.delete(`/api/items/${id}`, {
            headers: {
              Authorization: `${token}`,
            },
          });
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

  const handleUpdateItems = () => {
    fetchItems();
    setShowModal(false);
    setEditModal(false);
  };
  return (
    <div className="p-4 md:grid md:grid-cols-12 gap-4">
      <div className="col col-span-1  w-full border-r md:border-red-600 flex md:flex-col justify-between md:justify-start border-b-2 border-b-red-500 md:border-b-0 pb-4 md:pb-0 mb-2 md:mb-0">
        <span className="font-semibold text-lg">Passwords</span>
        <span className="md:pt-4 font-semibold text-lg">Profile</span>

        <span
          className="md:pt-4 font-semibold text-lg cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Log Out
        </span>
        {/* <span className="pt-8 font-bold text-xl">Passwords</span> */}
      </div>
      <div className="col col-span-11">
        <div className="flex items-center justify-between">
          <h1 className="md:text-2xl font-bold mb-4">Manage Your Passwords</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white p-1 rounded"
          >
            Add New
          </button>
        </div>

        <div>
          <div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-200">
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
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600">
                      Created At
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm font-semibold text-gray-600">
                      Last Modified
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-right text-sm font-semibold text-gray-600">
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
                      <td className="py-2 px-4 border-b border-gray-200 text-center">
                        {new Intl.DateTimeFormat("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(item.createdAt))}
                        <br />
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(item.createdAt))}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200 text-center">
                        {new Intl.DateTimeFormat("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(item.updatedAt))}
                        <br />
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(item.updatedAt))}
                      </td>
                      <td className="py-4 px-4 border-b border-gray-200 flex items-end justify-end gap-4">
                        <button
                          onClick={() => {
                            setEditData(item);
                            setEditModal(true);
                          }}
                          className="bg-blue-500 text-white p-1 rounded"
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
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <AddCredentialForm handleUpdateItems={handleUpdateItems} type="new" />
      </Modal>
      <Modal showModal={editModal} setShowModal={setEditModal}>
        <AddCredentialForm
          handleUpdateItems={handleUpdateItems}
          type="edit"
          editData={editData}
        />
      </Modal>
    </div>
  );
};

export default HomePageOverview;
