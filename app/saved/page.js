"use client";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar.js";
import JobCard from "../../components/JobCard.js";
import AdSlot from "../../components/AdSlot.js";

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSavedJobs() {
    try {
      const savedIds = JSON.parse(
        localStorage.getItem("savedJobs") || "[]"
      );

      if (!savedIds.length) {
        setJobs([]);
        setLoading(false);
        return;
      }

      const response = await fetch("/api/jobs/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: savedIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to load saved jobs");
      }

      const data = await response.json();

      setJobs(data);
    } catch (error) {
      console.error(error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSavedJobs();

    function handleSavedJobsChanged() {
      loadSavedJobs();
    }

    window.addEventListener(
      "savedJobsChanged",
      handleSavedJobsChanged
    );

    return () => {
      window.removeEventListener(
        "savedJobsChanged",
        handleSavedJobsChanged
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-950">
            Saved Jobs
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Jobs you've saved for later.
          </p>
        </div>

        {/* Top Ad */}

        <div className="mb-8">
          <AdSlot type="banner" />
        </div>

        {/* Content */}

        {loading ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-sm text-gray-500">
              Loading saved jobs...
            </p>
          </div>

        ) : jobs.length === 0 ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">

            <div className="text-4xl">
              ♡
            </div>

            <h2 className="mt-4 font-semibold text-gray-900">
              No saved jobs yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Save interesting jobs while browsing and
              they'll appear here.
            </p>

            <a
              href="/jobs"
              className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Browse Jobs
            </a>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">

            {/* Saved Jobs */}

            <section>

              <div className="mb-5">
                <p className="text-sm font-medium text-gray-500">
                  {jobs.length} saved{" "}
                  {jobs.length === 1 ? "job" : "jobs"}
                </p>
              </div>

              <div className="space-y-4">

                {jobs.map((job, index) => (

                  <div key={job.id}>

                    <JobCard job={job} />

                    {index === 2 && (
                      <div className="my-5">
                        <AdSlot type="feed" />
                      </div>
                    )}

                  </div>

                ))}

              </div>

            </section>

            {/* Sidebar */}

            <aside className="hidden lg:block">

              <div className="sticky top-6 space-y-5">

                <AdSlot type="sidebar" />

                <div className="rounded-2xl border border-gray-200 bg-white p-5">

                  <p className="text-sm font-semibold text-gray-900">
                    Your saved jobs
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Keep interesting opportunities here so
                    you can come back and apply later.
                  </p>

                </div>

                <AdSlot type="sidebar" />

              </div>

            </aside>

          </div>

        )}

      </div>
    </main>
  );
}