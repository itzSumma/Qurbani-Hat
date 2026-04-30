"use client";

import { useState } from "react";
import filterConfig from "../../public/animal-filters.json";
import AnimalCard from "./AnimalCard";

const sortAnimals = (animals, sortOrder) => {
  const sorted = animals.slice();

  if (sortOrder === "price-desc") {
    return sorted.sort((a, b) => b.price - a.price);
  }

  return sorted.sort((a, b) => a.price - b.price);
};

const filterAnimals = (animals, filters) =>
  animals.filter((animal) => {
    const matchType =
      filters.type === "All" || animal.type === filters.type;
    const matchCategory =
      filters.category === "All" || animal.category === filters.category;
    const matchLocation =
      filters.location === "All" || animal.location === filters.location;

    return matchType && matchCategory && matchLocation;
  });

const AllAnimalsClient = ({ animals }) => {
  const [sortOrder, setSortOrder] = useState("price-asc");
  const [filters, setFilters] = useState({
    type: "All",
    category: "All",
    location: "All",
  });

  const filteredAnimals = filterAnimals(animals, filters);
  const sortedAnimals = sortAnimals(filteredAnimals, sortOrder);

  const handleFilterChange = (key) => (event) => {
    setFilters((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  return (
    <>
      <div className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 px-5 py-5 text-sm text-slate-300">
        <div className="grid gap-4 lg:grid-cols-4">
          <label className="flex flex-col gap-2">
            <span>Type</span>
            <select
              value={filters.type}
              onChange={handleFilterChange("type")}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
            >
              {filterConfig.filters.types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span>Category</span>
            <select
              value={filters.category}
              onChange={handleFilterChange("category")}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
            >
              {filterConfig.filters.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span>Location</span>
            <select
              value={filters.location}
              onChange={handleFilterChange("location")}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
            >
              {filterConfig.filters.locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span>Sort by price</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="price-asc">Low to High</option>
              <option value="price-desc">High to Low</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span>Total listings: {sortedAnimals.length}</span>

          <button
            type="button"
            onClick={() =>
              setFilters({
                type: "All",
                category: "All",
                location: "All",
              })
            }
            className="rounded-full border border-white/10 px-4 py-2 text-white transition hover:border-emerald-400 hover:text-emerald-300"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sortedAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>

      {sortedAnimals.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/50 px-5 py-10 text-center text-slate-300">
          No animals matched your selected filters.
        </div>
      ) : null}
    </>
  );
};

export default AllAnimalsClient;
