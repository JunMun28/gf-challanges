"use client";

import Navigation, { PageStructure } from "../components/Navigation";
import { Suspense } from "react";

export default function Home() {
  // Hardcoded component list
  const pages: PageStructure[] = [
    {
      name: "Foundational",
      path: "/",
      children: [
        { name: "Blog Card", path: "/foundational/blog-card" },
        { name: "Testimonial Card", path: "/foundational/testimonial-card" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Great Frontend Challenges</h1>
          <p className="text-gray-300">Browse and select a component to view</p>
        </header>

        <div className="max-w-lg mx-auto">
          <div className="bg-white/10 border border-white/20 rounded-lg overflow-hidden shadow-lg">
            <Suspense
              fallback={
                <div className="p-6 text-center">Loading navigation...</div>
              }
            >
              <Navigation pages={pages} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
