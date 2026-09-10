
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
      <div className="min-h-screen bg-[#F7F8F3]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="border border-[#E1E7E2] bg-white p-8">
            <div className="h-6 w-48 animate-pulse bg-[#E3EAE5]" />
            <div className="mt-4 h-4 w-80 animate-pulse bg-[#F0F3F1]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8F3]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8F3]">

      {/* Page Header */}
      <section className="border-b border-[#E1E7E2] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="max-w-3xl">

            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#176B3A]">
              Data domain
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#173B2A] sm:text-5xl">
              {title}
            </h1>

            <p className="mt-4 text-lg leading-8 text-[#59665F]">
              {description}
            </p>

            <div className="mt-7 flex items-center gap-3">

              <span className="bg-[#EEF4EF] px-3 py-1.5 text-sm font-semibold text-[#176B3A]">
                {datasets.length}{" "}
                {datasets.length === 1 ? "dataset" : "datasets"}
              </span>

              <span className="text-sm text-[#66736C]">
                Approved datasets
              </span>

            </div>
          </div>
        </div>
      </section>

      {/* Dataset Section */}
      <section className="mx-auto max-w-7xl px-6 py-14">

        {datasets.length === 0 ? (
          <div className="border border-dashed border-[#C9D5CD] bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#EEF4EF] text-2xl">
              📊
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#173B2A]">
              No datasets available
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#66736C]">
              There are currently no approved{" "}
              {title.toLowerCase()} datasets available
              for public viewing.
            </p>

          </div>
        ) : (
          <div className="space-y-10">

            {datasets.map((dataset) => (
              <article
                key={dataset.id}
                className="overflow-hidden border border-[#DCE4DE] bg-white shadow-sm transition hover:shadow-md"
              >

                {/* Dataset Header */}
                <div className="border-b border-[#E1E7E2] px-6 py-7 sm:px-8">

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    <div className="max-w-3xl">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="bg-[#176B3A] px-3 py-1 text-xs font-bold text-white">
                          {dataset.domain}
                        </span>

                        <span className="bg-[#EEF4EF] px-3 py-1 text-xs font-semibold text-[#176B3A]">
                          {dataset.dataType}
                        </span>

                        <span className="bg-[#F1F3F1] px-3 py-1 text-xs font-medium text-[#59665F]">
                          {dataset.chartType}
                        </span>

                      </div>

                      <h2 className="mt-5 text-2xl font-bold text-[#173B2A]">
                        {dataset.title}
                      </h2>

                      {dataset.description && (
                        <p className="mt-2 text-sm leading-7 text-[#59665F]">
                          {dataset.description}
                        </p>
                      )}

                    </div>

                    {/* Records */}
                    <div className="shrink-0 border-l-4 border-[#176B3A] bg-[#F7F8F3] px-5 py-3">

                      <p className="text-xs font-bold uppercase tracking-wide text-[#66736C]">
                        Records
                      </p>

                      <p className="mt-1 text-xl font-bold text-[#173B2A]">
                        {dataset.records.length}
                      </p>

                    </div>

                  </div>
                </div>

                {/* Visualization */}
                <div className="p-5 sm:p-7 lg:p-9">

                  <div className="mb-6">

                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#176B3A]">
                      Visualization
                    </h3>

                    <p className="mt-1 text-sm text-[#66736C]">
                      Interactive representation of the dataset.
                    </p>

                  </div>

                  <div className="overflow-hidden border border-[#DCE4DE] bg-[#F7F8F3]">
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