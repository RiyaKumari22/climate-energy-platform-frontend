import { useEffect, useState } from "react";
import { getPublicDatasets } from "../services/api";
import DatasetVisualization from "../components/DatasetVisualization";

function DomainPage({ domain, title, description }) {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const data = await getPublicDatasets(domain);
        setDatasets(data.datasets || []);
      } catch (error) {
        console.error(
          `Failed to fetch ${domain} datasets:`,
          error
        );

        setError(`Failed to load ${title} datasets`);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, [domain, title]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 h-4 w-80 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Data domain
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {title}
            </h1>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              {description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                {datasets.length}{" "}
                {datasets.length === 1 ? "dataset" : "datasets"}
              </span>

              <span className="text-sm text-slate-500">
                Approved datasets
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Section */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {datasets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
              📊
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-900">
              No datasets available
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are currently no approved{" "}
              {title.toLowerCase()} datasets available
              for public viewing.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {datasets.map((dataset) => (
              <article
                key={dataset.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Dataset Header */}
                <div className="border-b border-slate-200 px-6 py-6 sm:px-8">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                          {dataset.domain}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {dataset.dataType}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {dataset.chartType}
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl font-bold text-slate-900">
                        {dataset.title}
                      </h2>

                      {dataset.description && (
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {dataset.description}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 rounded-lg bg-slate-50 px-4 py-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Records
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-900">
                        {dataset.records.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visualization */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                      Visualization
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Interactive representation of the dataset.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <DatasetVisualization dataset={dataset} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default DomainPage;