import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddDataset() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("CLIMATE");
  const [dataType, setDataType] = useState("TIMESERIES");
  const [chartType, setChartType] = useState("LINE");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    if (!file) {
      setError("Please select a CSV file.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("domain", domain);
      formData.append("dataType", dataType);
      formData.append("chartType", chartType);
      formData.append("description", description);
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const response = await API.post(
        "/datasets/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(
        response.data.message ||
          "Dataset uploaded successfully."
      );

      setTimeout(() => {
        navigate("/admin");
      }, 1200);
    } catch (error) {
      console.error("Dataset upload failed:", error);

      setError(
        error.response?.data?.message ||
          "Failed to upload dataset."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Add Dataset
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Upload a new climate, energy or power dataset
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Dataset Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Provide the dataset details and upload the CSV file.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
          >
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Dataset Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Example: India's Temperature Trends"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            {/* Domain */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Domain
              </label>

              <select
                value={domain}
                onChange={(event) =>
                  setDomain(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                <option value="CLIMATE">Climate</option>
                <option value="ENERGY">Energy</option>
                <option value="POWER">Power</option>
              </select>
            </div>

            {/* Data Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Data Type
              </label>

              <select
                value={dataType}
                onChange={handleDataTypeChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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

              <p className="mt-2 text-xs text-slate-500">
                Select the structure of the data in your CSV file.
              </p>
            </div>

            {/* Chart Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Visualization Type
              </label>

              <select
                value={chartType}
                onChange={(event) =>
                  setChartType(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              >
                {dataType === "LATLONG" && (
                  <option value="MAP">
                    India Point Map
                  </option>
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
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Briefly describe this dataset..."
                rows="4"
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            {/* CSV Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                CSV Dataset
              </label>

              <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-slate-400">
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(event) =>
                    setFile(event.target.files[0])
                  }
                  className="mx-auto block w-full max-w-sm text-sm text-slate-600"
                />

                <p className="mt-3 text-xs text-slate-500">
                  Only CSV files are supported.
                </p>

                {file && (
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>

            {/* Information */}
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm font-medium text-blue-900">
                Approval workflow
              </p>

              <p className="mt-1 text-sm text-blue-700">
                Uploaded datasets are initially marked as
                <strong> Pending</strong>. A Super Admin must
                approve the dataset before it becomes publicly
                visible.
              </p>
            </div>

            {/* Messages */}
            {message && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Uploading..." : "Upload Dataset"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddDataset;