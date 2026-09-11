"use client";

import { useEffect, useState } from "react";

export default function SaveJobButton({ jobId }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(
      localStorage.getItem("savedJobs") || "[]"
    );

    setSaved(savedJobs.includes(String(jobId)));
  }, [jobId]);

  function toggleSave() {
    const savedJobs = JSON.parse(
      localStorage.getItem("savedJobs") || "[]"
    );

    const id = String(jobId);

    let updatedJobs;

    if (savedJobs.includes(id)) {
      updatedJobs = savedJobs.filter(
        (savedId) => savedId !== id
      );
      setSaved(false);
    } else {
      updatedJobs = [...savedJobs, id];
      setSaved(true);
    }

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );

    window.dispatchEvent(new Event("savedJobsChanged"));
  }

  return (
    <button
      type="button"
      onClick={toggleSave}
      className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
        saved
          ? "border-blue-200 bg-blue-50 text-blue-600"
          : "border-gray-200 text-gray-700 hover:bg-gray-50"
      }`}
    >
      {saved ? "Saved" : "Save Job"}
    </button>
  );
}