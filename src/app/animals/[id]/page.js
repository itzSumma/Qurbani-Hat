import { notFound } from "next/navigation";
import { getAnimalById, getAnimals } from "@/lib/animals";
import AnimalDetailsClient from "@/Components/AnimalDetailsClient";

export async function generateStaticParams() {
  const animals = await getAnimals();

  return animals.map((animal) => ({
    id: String(animal.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) {
    return {
      title: "Animal Not Found | QurbaniHat",
    };
  }

  return {
    title: `${animal.name} | QurbaniHat`,
    description: animal.description,
  };
}

export default async function AnimalDetailsPage({ params }) {
  const { id } = await params;
  const animal = await getAnimalById(id);

  if (!animal) {
    notFound();
  }

  return <AnimalDetailsClient animal={animal} />;
}
