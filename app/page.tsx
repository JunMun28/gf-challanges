"use client";

import { useEffect, useState } from "react";
import Navigation, { PageStructure } from "../components/Navigation";
import { Suspense } from "react";

export default function Home() {
  const [pages, setPages] = useState<PageStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only run on the client
    const fetchPages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/pages");
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch pages");
        }

        setPages(data.pages);
      } catch (err) {
        console.error("Error fetching pages:", err);
        setError("Failed to load pages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Great Frontend Challenges</h1>
          <p className="text-gray-300">Browse and select a component to view</p>
        </header>

        <div className="max-w-lg mx-auto">
          <div className="bg-white/10 border border-white/20 rounded-lg overflow-hidden shadow-lg">
            {loading ? (
              <div className="p-6 animate-pulse space-y-4">
                <div className="h-8 bg-white/10 rounded w-3/4"></div>
                <div className="h-4 bg-white/10 rounded w-1/2 mt-6"></div>
                <div className="h-4 bg-white/10 rounded w-3/4 mt-2"></div>
                <div className="h-4 bg-white/10 rounded w-2/3 mt-2"></div>
                <div className="h-4 bg-white/10 rounded w-1/2 mt-2"></div>
              </div>
            ) : error ? (
              <div className="p-6 text-red-400 bg-red-900/20 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {error}
                </div>
              </div>
            ) : (
              <Suspense
                fallback={
                  <div className="p-6 text-center">Loading navigation...</div>
                }
              >
                <Navigation pages={pages} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
