import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDatasets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/datasets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDatasets(response.data.datasets || []);
    } catch (error) {
      console.error("Failed to fetch datasets:", error);

      setError(
        error.response?.data?.message || "Failed to load datasets"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/datasets/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setError("");
      fetchDatasets();
    } catch (error) {
      console.error("Failed to approve dataset:", error);

      setError(
        error.response?.data?.message || "Failed to approve dataset"
      );
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/datasets/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setError("");
      fetchDatasets();
    } catch (error) {
      console.error("Failed to reject dataset:", error);

      setError(
        error.response?.data?.message || "Failed to reject dataset"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dataset?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/datasets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setError("");
      fetchDatasets();
    } catch (error) {
      console.error("Failed to delete dataset:", error);

      setError(
        error.response?.data?.message || "Failed to delete dataset"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const pendingCount = datasets.filter(
    (dataset) => dataset.status === "PENDING"
  ).length;

  const approvedCount = datasets.filter(
    (dataset) => dataset.status === "APPROVED"
  ).length;

  const rejectedCount = datasets.filter(
    (dataset) => dataset.status === "REJECTED"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Super Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage datasets, approvals and administrators
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/super-admin/admins")}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Manage Admins
            </button>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Datasets
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {datasets.length}
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-amber-700">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-900">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-emerald-700">
              Approved
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-900">
              {approvedCount}
            </p>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-red-700">
              Rejected
            </p>

            <p className="mt-2 text-3xl font-bold text-red-900">
              {rejectedCount}
            </p>
          </div>
        </div>

        {/* Dataset section */}
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Dataset Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage submitted datasets.
            </p>
          </div>

          {loading && (
            <div className="px-6 py-10 text-center text-sm text-slate-500">
              Loading datasets...
            </div>
          )}

          {error && (
            <div className="mx-6 mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && datasets.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-slate-500">
              No datasets found.
            </div>
          )}

          {!loading && datasets.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">
                      Title
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Domain
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Data Type
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Chart
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Uploaded By
                    </th>

                    <th className="px-6 py-4 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {datasets.map((dataset) => (
                    <tr
                      key={dataset.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {dataset.title}
                        </p>

                        {dataset.description && (
                          <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                            {dataset.description}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-700">
                          {dataset.domain}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {dataset.dataType}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {dataset.chartType}
                      </td>

                      <td className="px-6 py-4">
                        {dataset.status === "PENDING" && (
                          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                            Pending
                          </span>
                        )}

                        {dataset.status === "APPROVED" && (
                          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Approved
                          </span>
                        )}

                        {dataset.status === "REJECTED" && (
                          <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                            Rejected
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-700">
                            {dataset.uploadedBy?.name || "Unknown"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {dataset.uploadedBy?.email || ""}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {dataset.status === "PENDING" && (
                            <>
                              <button
                                onClick={() =>
                                  handleApprove(dataset.id)
                                }
                                className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                              >
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  handleReject(dataset.id)
                                }
                                className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          <button
                            onClick={() =>
                              navigate(
                                `/super-admin/datasets/${dataset.id}/edit`
                              )
                            }
                            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(dataset.id)
                            }
                            className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
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
        </div>
      </main>
    </div>
  );
}

export default SuperAdminDashboard;