import { provinces as staticProvinces } from "../../client/src/data/provinces.js";
import { prisma } from "./prisma/prisma.js";

async function main() {
  const dbProvinces = await prisma.province.findMany({
    orderBy: { id: "asc" }
  });

  console.log("DB Provinces count:", dbProvinces.length);
  console.log("Static Provinces count:", staticProvinces.length);
  console.log("\nProvince Comparison (Static ID | Static Name | DB ID | DB Name):");

  for (const s of staticProvinces) {
    const dbMatch = dbProvinces.find(p => p.name.toLowerCase() === s.name.toLowerCase());
    console.log(`Static ID "${s.id}" -> ${s.name} | DB Match ID ${dbMatch?.id} -> ${dbMatch?.name}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
