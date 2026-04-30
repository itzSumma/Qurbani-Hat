"use client";

import { useState } from "react";
import AnimalCard from "./AnimalCard";

const sortAnimals = (animals, sortOrder) => {
  const sorted = animals.slice();

  if (sortOrder === "price-desc") {
    return sorted.sort((a, b) => b.price - a.price);
  }

  return sorted.sort((a, b) => a.price - b.price);
};

const AllAnimalsClient = ({ animals }) => {
  const [sortOrder, setSortOrder] = useState("price-asc");
  const sortedAnimals = sortAnimals(animals, sortOrder);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/60 px-5 py-4 text-sm text-slate-300 md:flex-row md:items-center md:justify-between">
        <span>Total listings: {sortedAnimals.length}</span>

        <label className="flex items-center gap-3">
          <span>Sort by price</span>
          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white outline-none"
          >
            <option value="price-asc">Low to High</option>
            <option value="price-desc">High to Low</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sortedAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </>
  );
};

export default AllAnimalsClient;
