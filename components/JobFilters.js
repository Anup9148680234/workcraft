"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key, value) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <p className="mt-1 text-sm text-gray-500">
          Narrow down your results
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Remote
        </label>

        <select
          value={searchParams.get("remote") || ""}
          onChange={(e) => updateFilter("remote", e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="">All</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Onsite">Onsite</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Experience
        </label>

        <select
          value={searchParams.get("experience") || ""}
          onChange={(e) => updateFilter("experience", e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="">Any experience</option>
          <option value="0-2">0-2 years</option>
          <option value="1-3">1-3 years</option>
          <option value="2-4">2-4 years</option>
          <option value="2-5">2-5 years</option>
          <option value="5+">5+ years</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Source
        </label>

        <select
          value={searchParams.get("source") || ""}
          onChange={(e) => updateFilter("source", e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="">All sources</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Naukri">Naukri</option>
        </select>
      </div>
    </aside>
  );
}