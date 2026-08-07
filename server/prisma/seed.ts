import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.district.deleteMany();
  await prisma.province.deleteMany();

  // Create provinces
  const provinces = await prisma.province.createMany({
    data: [
      { id: 1, name: "Northern", regionCode: "NP" },
      { id: 2, name: "Eastern", regionCode: "EP" },
      { id: 3, name: "North Central", regionCode: "NCP" },
      { id: 4, name: "North Western", regionCode: "NWP" },
      { id: 5, name: "Central", regionCode: "CP" },
      { id: 6, name: "Uva", regionCode: "UP" },
      { id: 7, name: "Sabaragamuwa", regionCode: "SGP" },
      { id: 8, name: "Western", regionCode: "WP" },
      { id: 9, name: "Southern", regionCode: "SP" },
    ],
  });

  console.log("✅ Provinces created");

  // Create districts
  await prisma.district.createMany({
    data: [
      // Northern
      { name: "Jaffna", provinceId: 1 },
      { name: "Kilinochchi", provinceId: 1 },
      { name: "Mannar", provinceId: 1 },
      { name: "Mullaitivu", provinceId: 1 },
      { name: "Vavuniya", provinceId: 1 },

      // Eastern
      { name: "Ampara", provinceId: 2 },
      { name: "Batticaloa", provinceId: 2 },
      { name: "Trincomalee", provinceId: 2 },

      // North Central
      { name: "Anuradhapura", provinceId: 3 },
      { name: "Polonnaruwa", provinceId: 3 },

      // North Western
      { name: "Kurunegala", provinceId: 4 },
      { name: "Puttalam", provinceId: 4 },

      // Central
      { name: "Kandy", provinceId: 5 },
      { name: "Matale", provinceId: 5 },
      { name: "Nuwara Eliya", provinceId: 5 },

      // Uva
      { name: "Badulla", provinceId: 6 },
      { name: "Monaragala", provinceId: 6 },

      // Sabaragamuwa
      { name: "Kegalle", provinceId: 7 },
      { name: "Ratnapura", provinceId: 7 },

      // Western
      { name: "Colombo", provinceId: 8 },
      { name: "Gampaha", provinceId: 8 },
      { name: "Kalutara", provinceId: 8 },

      // Southern
      { name: "Galle", provinceId: 9 },
      { name: "Hambantota", provinceId: 9 },
      { name: "Matara", provinceId: 9 },
    ],
  });

  console.log("✅ Districts created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });