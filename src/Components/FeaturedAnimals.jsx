import React from "react";
import AnimalCard from "./AnimalCard";


const FeaturedAnimals = async () => {
  const res = await fetch("https://qurbani-hat-r6bq.vercel.app/animals.json");
  const animals = await res.json();

  const featuredAnimals = animals.slice(0, 4);

  return (
    <div className="p-10">
      {/* HEADING */}
      <h2 className="text-2xl font-bold mb-5 text-center">
        Featured Animals
      </h2>

     <div>
        {featuredAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
     </div>
    </div>
  );
};

export default FeaturedAnimals;