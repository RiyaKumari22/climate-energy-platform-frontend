import { useEffect, useState } from "react";
import API from "../services/api";

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdmins(response.data.admins || []);
    } catch (error) {
      console.error("Failed to load admins:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load admins"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/admins",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setEmail("");
      setPassword("");

      setMessage("Admin created successfully.");

      fetchAdmins();
    } catch (error) {
      console.error("Failed to create admin:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create admin"
      );
    }
  };

  const handleToggleStatus = async (id) => {
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/admins/${id}/toggle-status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Admin status updated successfully.");

      fetchAdmins();
    } catch (error) {
      console.error(
        "Failed to update admin status:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update admin status"
      );
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setEditName(admin.name);
    setEditEmail(admin.email);
    setError("");
    setMessage("");
  };

  const handleUpdateAdmin = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/admins/${editingAdmin.id}`,
        {
          name: editName,
          email: editEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Admin updated successfully.");

      setEditingAdmin(null);
      setEditName("");
      setEditEmail("");

      fetchAdmins();
    } catch (error) {
      console.error("Failed to update admin:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update admin"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/admins/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Admin deleted successfully.");

      fetchAdmins();
    } catch (error) {
      console.error("Failed to delete admin:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete admin"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Manage Admins
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create, update and manage administrator accounts.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        {/* Messages */}
        {message && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <p className="text-sm font-medium text-emerald-700">
              {message}
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Create Admin */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Create New Admin
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new administrator who can manage datasets.
            </p>
          </div>

          <form
            onSubmit={handleCreateAdmin}
            className="grid gap-5 p-6 md:grid-cols-3"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter admin name"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="admin@example.com"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter password"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create Admin
              </button>
            </div>
          </form>
        </section>

        {/* Edit Admin */}
        {editingAdmin && (
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Edit Admin
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the selected administrator's details.
              </p>
            </div>

            <form
              onSubmit={handleUpdateAdmin}
              className="grid gap-5 p-6 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(event) =>
                    setEditName(event.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  value={editEmail}
                  onChange={(event) =>
                    setEditEmail(event.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="flex gap-3 md:col-span-2">
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingAdmin(null);
                    setEditName("");
                    setEditEmail("");
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Existing Admins */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Existing Admins
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage administrator access and account status.
                </p>
              </div>

              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                {admins.length}{" "}
                {admins.length === 1 ? "admin" : "admins"}
              </span>
            </div>
          </div>

          {loading ? (
            <div className="p-8">
              <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
              <div className="mt-4 h-10 w-full animate-pulse rounded bg-slate-100" />
              <div className="mt-2 h-10 w-full animate-pulse rounded bg-slate-100" />
            </div>
          ) : admins.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                👤
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No admins found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Create your first admin account above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Name
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {admins.map((admin) => (
                    <tr
                      key={admin.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {admin.name}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {admin.email}
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            admin.isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {admin.isActive
                            ? "Active"
                            : "Disabled"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              handleToggleStatus(admin.id)
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                              admin.isActive
                                ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            }`}
                          >
                            {admin.isActive
                              ? "Disable"
                              : "Enable"}
                          </button>

                          <button
                            onClick={() =>
                              handleEdit(admin)
                            }
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(admin.id)
                            }
                            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ManageAdmins;