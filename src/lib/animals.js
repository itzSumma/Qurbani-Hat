import { readFile } from "node:fs/promises";
import path from "node:path";

const animalsFilePath = path.join(process.cwd(), "public", "animals.json");

async function readAnimals() {
  try {
    const file = await readFile(animalsFilePath, "utf8");
    return JSON.parse(file);
  } catch (error) {
    console.error("Error reading animals file:", error);
    return [];
  }
}

export async function getAnimals() {
  return readAnimals();
}

export async function getFeaturedAnimals(limit = 4) {
  const animals = await readAnimals();
  return animals.filter((animal) => animal.isFeatured).slice(0, limit);
}

export async function getAnimalById(id) {
  const animals = await readAnimals();
  return animals.find((animal) => String(animal.id) === String(id)) ?? null;
}

export async function getTopBreeds(limit = 4) {
  const animals = await readAnimals();

  return animals
    .slice()
    .sort((a, b) => b.price - a.price)
    .slice(0, limit)
    .map((animal) => ({
      id: animal.id,
      breed: animal.breed,
      type: animal.type,
      location: animal.location,
      price: animal.price,
      weight: animal.weight,
    }));
}
