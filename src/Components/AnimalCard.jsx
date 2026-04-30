import React from "react";

const AnimalCard = ({ animal }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition bg-white">

      {/* IMAGE */}
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-48 object-cover object-center transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />

      {/* CONTENT */}
      <div className="p-4 space-y-2">

        {/* NAME */}
        <h2 className="text-lg font-bold">{animal.name}</h2>

        {/* TYPE + BREED */}
        <p className="text-sm text-gray-600">
          {animal.type} • {animal.breed}
        </p>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500">
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