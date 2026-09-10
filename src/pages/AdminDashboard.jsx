import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminDashboard() {
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
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Upload and monitor climate, energy and power datasets
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/add-dataset")}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              + Add Dataset
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

        {/* Dataset Table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">

            <h2 className="text-lg font-semibold text-slate-900">
              My Datasets
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View the datasets you have submitted.
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
            <div className="px-6 py-10 text-center">

              <p className="text-sm text-slate-500">
                No datasets found.
              </p>

              <button
                onClick={() => navigate("/admin/add-dataset")}
                className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Add Your First Dataset
              </button>

            </div>
          )}

          {!loading && !error && datasets.length > 0 && (
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
                      Created
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

                      <td className="px-6 py-4 font-medium text-slate-700">
                        {dataset.domain}
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

                      <td className="px-6 py-4 text-slate-600">
                        {new Date(
                          dataset.createdAt
                        ).toLocaleDateString()}
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

export default AdminDashboard;