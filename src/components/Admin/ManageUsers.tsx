import React from "react";
import {
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  MapPin,
  Calendar,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type TempUser = {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  location: string | null;
  created_at: Date;
  dob: Date;
};

export default function ManageUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setIsEditingUser] = useState<TempUser | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [user, setUser] = useState<TempUser[]>([]);
  const [formData, setFormData] = useState<Partial<TempUser>>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    location: "",
    dob: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/getAll`,
        { method: "GET" }
      );
      const data = await request.json();
      console.log(data);
      setUser(data.users);
    };
    fetchData();
  }, []);

  const openModal = (userToEdit?: TempUser) => {
    if (userToEdit) {
      setIsEditingUser(userToEdit);
      setFormData(userToEdit);
    } else {
      setIsEditingUser(null);
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        location: "",
        dob: new Date(),
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      editUser();
    } else {
      // later add logic la new user
      const newUser: TempUser = {
        ...(formData as TempUser),
        user_id: Math.max(...user.map((u) => u.user_id), 0) + 1,
        created_at: new Date(),
      };
      setUser([...user, newUser]);
      closeModal();
    }
  };

  const handleDeleteUser = async (userId: number) => {
    console.log("Deleting user with ID:", userId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/delete/${userId}`,
        { method: "DELETE" }
      );
      console.log(response);

      if (!response.ok) {
        console.error("Failed to delete user");
        return;
      }

      const data = await response.json();
      console.log("Delete successful:", data);

      setUser((prevUsers) => prevUsers.filter((u) => u.user_id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = async () => {
    setUser(
      user.map((u) =>
        u.user_id === editingUser?.user_id
          ? { ...(formData as TempUser), user_id: editingUser.user_id }
          : u
      )
    );
    closeModal();
  };

  const filteredUsers = user.filter((u) => {
    const matchesSearch =
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const uniqueLocations = new Set(user.map((u) => u.location).filter(Boolean))
    .size;

  return (
    <>
      <div className="px-4 py-8 lg:px-12 max-w-8xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a2332] rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {user.length}
                </p>
              </div>
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Locations</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {uniqueLocations}
                </p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">New This Month</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {
                    user.filter((u) => {
                      const created = new Date(u.created_at);
                      const now = new Date();
                      return (
                        created.getMonth() === now.getMonth() &&
                        created.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-[#1a2332] rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {user.length}
                </p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name, username, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a2332] border border-slate-700/50 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <button
            onClick={() => openModal()}
            className="bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap transition-all shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-[#1a2332] rounded-lg border border-slate-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0f1419] border-b border-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    First Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Last Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    DOB
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.user_id}
                      className="hover:bg-[#0f1419]/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-slate-400">
                        #{user.user_id}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 font-medium">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {user.first_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {user.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {user.location || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {new Date(user.dob).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openModal(user)}
                            className="p-2 hover:bg-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.user_id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-4 text-sm text-slate-300 text-center"
                    >
                      {user.length === 0
                        ? "Loading users..."
                        : "No users found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a2332] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700/50">
            <div className="sticky top-0 bg-[#1a2332] border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="New York, USA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={
                      formData.dob
                        ? new Date(formData.dob).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dob: new Date(e.target.value),
                      })
                    }
                    className="w-full bg-[#0f1419] border border-slate-700/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-orange-500/20"
                >
                  {editingUser ? "Update User" : "Create User"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
