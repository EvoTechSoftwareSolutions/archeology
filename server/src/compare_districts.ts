import { districts as staticDistricts } from "../../client/src/data/districts.js";
import { prisma } from "./prisma/prisma.js";

async function main() {
  const dbDistricts = await prisma.district.findMany({
    orderBy: { id: "asc" }
  });

  console.log("DB Districts count:", dbDistricts.length);
  console.log("Static Districts count:", staticDistricts.length);
  console.log("\nComparison (Static ID | Static Name | DB ID | DB Name):");

  for (const s of staticDistricts) {
    const dbMatch = dbDistricts.find(d => d.name.toLowerCase() === s.name.toLowerCase());
    console.log(`Static ID "${s.id}" -> ${s.name} | DB Match ID ${dbMatch?.id} -> ${dbMatch?.name}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
