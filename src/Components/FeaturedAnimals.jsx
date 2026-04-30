import { getFeaturedAnimals } from "@/lib/animals";
import AnimalCard from "./AnimalCard";
import SectionHeader from "./SectionHeader";

const FeaturedAnimals = async () => {
  const featuredAnimals = await getFeaturedAnimals(4);

  return (
    <section className="mt-20">
      <SectionHeader
        eyebrow="Featured Listings"
        title="Featured Animals"
        description="Explore four standout animals selected for healthy condition, clear information, and strong buyer demand."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {featuredAnimals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedAnimals;
