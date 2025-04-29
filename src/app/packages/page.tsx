"use client";

import { useState } from "react";
import Image from "next/image";
import { tourPackages } from "~/data/packages";
import Navbar from "~/components/Navbar";
import { Star, MapPin, Clock, Check, Filter } from "lucide-react";

export default function PackagesPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredPackages = filter
    ? tourPackages.filter((pkg) => pkg.wonderName === filter)
    : tourPackages;

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Navbar />
      <div className="container mx-auto flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Wonder</span> Tour Packages
        </h1>

        <div className="w-full max-w-7xl">
          {/* Filter controls */}
          <div className="mb-8 flex flex-wrap items-center gap-2 rounded-lg bg-white/10 p-4">
            <div className="flex items-center gap-2">
              <Filter size={20} />
              <span className="font-medium">Filter by Wonder:</span>
            </div>
            <button
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                filter === null
                  ? "bg-[hsl(280,100%,70%)] text-white"
                  : "bg-white/20 hover:bg-white/30"
              }`}
              onClick={() => setFilter(null)}
            >
              All Packages
            </button>
            {Array.from(new Set(tourPackages.map((pkg) => pkg.wonderName))).map(
              (wonder) => (
                <button
                  key={wonder}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    filter === wonder
                      ? "bg-[hsl(280,100%,70%)] text-white"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                  onClick={() => setFilter(wonder)}
                >
                  {wonder}
                </button>
              ),
            )}
          </div>

          {/* Package cards grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col overflow-hidden rounded-lg bg-white/10 transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-48 w-full">
                  <div className="absolute right-2 top-2 z-10 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-white">
                    {pkg.duration}
                  </div>
                  {pkg.featured && (
                    <div className="absolute left-0 top-4 z-10 bg-[hsl(280,100%,70%)] px-3 py-1 text-sm font-bold text-white shadow-md">
                      Featured
                    </div>
                  )}
                  <Image
                    src={pkg.imageUrl}
                    alt={`${pkg.wonderName} tour`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={pkg.featured}
                  />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="mb-2 text-xl font-bold">{pkg.title}</h3>

                  <div className="mb-2 flex items-center gap-1">
                    <MapPin size={16} className="text-[hsl(280,100%,70%)]" />
                    <span className="text-sm">{pkg.wonderName}</span>
                  </div>

                  <div className="mb-2 flex items-center gap-1">
                    <Clock size={16} className="text-[hsl(280,100%,70%)]" />
                    <span className="text-sm">{pkg.duration}</span>
                  </div>

                  <div className="mb-4 flex items-center gap-1">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm">
                      {pkg.ratings} ({pkg.reviewCount} reviews)
                    </span>
                  </div>

                  <p className="mb-4 flex-1 text-sm text-gray-300">
                    {pkg.description.slice(0, 120)}...
                  </p>

                  <div className="mb-3">
                    <div className="mb-2 text-xs font-semibold uppercase text-gray-400">
                      Key Inclusions:
                    </div>
                    <ul className="space-y-1">
                      {pkg.inclusions.slice(0, 3).map((inclusion, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check
                            size={14}
                            className="mt-1 text-[hsl(280,100%,70%)]"
                          />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                      {pkg.inclusions.length > 3 && (
                        <li className="text-xs text-gray-400">
                          + {pkg.inclusions.length - 3} more inclusions
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-auto flex items-baseline justify-between border-t border-white/20 pt-4">
                    <div>
                      <span className="text-2xl font-bold">
                      ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-300"> per person</span>
                    </div>
                    <button className="rounded bg-[hsl(280,100%,70%)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[hsl(280,100%,60%)]">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {filteredPackages.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-lg bg-white/5 text-center text-gray-400">
              No packages found for this wonder. Please try another filter.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
