import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditDataset() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataset, setDataset] = useState(null);

  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [dataType, setDataType] = useState("");
  const [chartType, setChartType] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Load dataset
  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/datasets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const foundDataset = response.data.datasets.find(
          (item) => item.id === Number(id)
        );

        if (!foundDataset) {
          setError("Dataset not found");
          return;
        }

        setDataset(foundDataset);
        setTitle(foundDataset.title);
        setDomain(foundDataset.domain);
        setDataType(foundDataset.dataType);
        setChartType(foundDataset.chartType);
        setDescription(foundDataset.description || "");
      } catch (error) {
        console.error("Failed to load dataset:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dataset"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDataset();
  }, [id]);

  // Handle data type change
  const handleDataTypeChange = (event) => {
    const newDataType = event.target.value;

    setDataType(newDataType);

    if (newDataType === "LATLONG") {
      setChartType("MAP");
    } else if (newDataType === "STATE") {
      setChartType("HEATMAP");
    } else if (newDataType === "TIMESERIES") {
      setChartType("LINE");
    }
  };

  // Save changes
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/datasets/${id}`,
        {
          title,
          domain,
          dataType,
          chartType,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Dataset updated successfully.");

      setTimeout(() => {
        navigate("/super-admin");
      }, 1000);
    } catch (error) {
      console.error("Failed to update dataset:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update dataset"
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

          <div className="mt-3 h-9 w-64 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-5">
              <div className="h-12 animate-pulse rounded bg-slate-100" />
              <div className="h-12 animate-pulse rounded bg-slate-100" />
              <div className="h-12 animate-pulse rounded bg-slate-100" />
              <div className="h-12 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dataset not found
  if (error && !dataset) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl">
              !
            </div>

            <h1 className="mt-4 text-2xl font-bold text-slate-900">
              Dataset Not Found
            </h1>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={() => navigate("/super-admin")}
              className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Back to Super Admin
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <button
            type="button"
            onClick={() => navigate("/super-admin")}
            className="mb-5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            ← Back to Super Admin
          </button>

          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Dataset Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Edit Dataset
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update the metadata and visualization settings for this dataset.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {/* Dataset information */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-slate-500">
              Dataset ID
            </span>

            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              #{dataset.id}
            </span>

            <span className="text-slate-300">•</span>

            <span className="text-sm text-slate-500">
              Current status:
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                dataset.status === "APPROVED"
                  ? "bg-emerald-50 text-emerald-700"
                  : dataset.status === "REJECTED"
                  ? "bg-red-50 text-red-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {dataset.status}
            </span>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <p className="text-sm font-medium text-emerald-700">
              {message}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Dataset Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Modify the information used to identify and visualize this dataset.
            </p>
          </div>

          <div className="space-y-6 p-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Dataset Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            {/* Domain + Data Type */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Domain
                </label>

                <select
                  value={domain}
                  onChange={(event) =>
                    setDomain(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                >
                  <option value="CLIMATE">Climate</option>
                  <option value="ENERGY">Energy</option>
                  <option value="POWER">Power</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Data Type
                </label>

                <select
                  value={dataType}
                  onChange={handleDataTypeChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                >
                  <option value="LATLONG">
                    Latitude / Longitude
                  </option>

                  <option value="STATE">
                    State-wise
                  </option>

                  <option value="TIMESERIES">
                    Time Series
                  </option>
                </select>
              </div>
            </div>

            {/* Chart Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Chart Type
              </label>

              <select
                value={chartType}
                onChange={(event) =>
                  setChartType(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              >
                {dataType === "LATLONG" && (
                  <option value="MAP">India Map</option>
                )}

                {dataType === "STATE" && (
                  <option value="HEATMAP">
                    India State Heatmap
                  </option>
                )}

                {dataType === "TIMESERIES" && (
                  <>
                    <option value="LINE">
                      Line Chart
                    </option>

                    <option value="BAR">
                      Bar Chart
                    </option>

                    <option value="AREA">
                      Area Chart
                    </option>
                  </>
                )}
              </select>

              <p className="mt-2 text-xs text-slate-500">
                The available chart types depend on the selected data type.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows="5"
                placeholder="Add a short description of this dataset..."
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/super-admin")}
              disabled={saving}
              className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Note */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-4">
          <p className="text-xs leading-5 text-slate-500">
            <span className="font-semibold text-slate-700">
              Note:
            </span>{" "}
            This form currently updates dataset metadata and visualization
            settings. The uploaded CSV records remain unchanged.
          </p>
        </div>
      </main>
    </div>
  );
}

export default EditDataset;