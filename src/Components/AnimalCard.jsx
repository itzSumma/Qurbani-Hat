import Image from "next/image";
import React from "react";

const AnimalCard = ({ animal }) => {
  if (!animal) return null;

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition bg-white">

      {/* IMAGE */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">
  <Image
    src={animal.image}
    alt={animal.name}
    fill
    className="object-contain hover:scale-105 transition-transform duration-300"
    sizes="(max-width: 768px) 100vw, 25vw"
  />
</div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        {/* NAME */}
        <h2 className="text-lg font-bold">{animal.name}</h2>

        {/* TYPE + BREED */}
        <p className="text-sm text-gray-600">
          {animal.type} • {animal.breed}
        </p>

        {/* HEALTH STATUS */}
        <span className="inline-block text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
          🩺 {animal.healthStatus || "Unknown"}
        </span>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {animal.description}
        </p>

        {/* PRICE */}
        <p className="text-green-600 font-semibold text-lg">
          ৳ {animal.price}
        </p>

        {/* WEIGHT + AGE */}
        <p className="text-sm text-gray-500">
          ⚖️ {animal.weight} kg | 🎂 {animal.age} years
        </p>

        {/* LOCATION */}
        <p className="text-sm text-gray-500">
          📍 {animal.location}
        </p>

        {/* CATEGORY */}
        <span className="inline-block mt-1 text-xs bg-gray-200 px-2 py-1 rounded">
          {animal.category}
        </span>

        {/* BUTTON */}
        <button className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          View Details
        </button>

      </div>
    </div>
  );
};

export default AnimalCard;