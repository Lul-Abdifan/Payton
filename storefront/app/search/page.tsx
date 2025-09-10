"use client";

import { useState } from 'react';

/**
 * Search page MVP. Allows users to enter a search query and displays
 * placeholder results. In a future iteration this component should call
 * Saleor and Wagtail search endpoints on the server (via an API route) and
 * merge the results client‑side.
 */
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    // TODO: fetch search results from an API route
    setResults([]);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products or articles"
          className="flex-grow p-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Search
        </button>
      </form>
      {submitted && results.length === 0 && (
        <p className="text-gray-600">No results yet. This feature is coming soon.</p>
      )}
    </div>
  );
}