import AllAnimalsClient from "@/Components/AllAnimalsClient";
import SectionHeader from "@/Components/SectionHeader";
import { getAnimals } from "@/lib/animals";

export const metadata = {
  title: "All Animals | QurbaniHat",
  description: "Browse all available Qurbani animals and compare prices.",
};

export default async function AnimalPage() {
  const animals = await getAnimals();
// update json file with new data
  return (
    <section className="py-4">
      <SectionHeader
        eyebrow="Marketplace"
        title="All Animals"
        description="Compare all available animals and switch the list order by price."
        align="left"
      />

      <AllAnimalsClient animals={animals} />
    </section>
  );
}
