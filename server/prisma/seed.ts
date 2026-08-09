import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing province/district data
  await prisma.district.deleteMany();
  await prisma.province.deleteMany();

  // Reset auto-increment counters
  await prisma.$executeRawUnsafe(
    "ALTER TABLE District AUTO_INCREMENT = 1"
  );

  await prisma.$executeRawUnsafe(
    "ALTER TABLE Province AUTO_INCREMENT = 1"
  );

  // Create provinces
  await prisma.province.createMany({
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
      { id: 1, name: "Jaffna", provinceId: 1 },
      { id: 2, name: "Kilinochchi", provinceId: 1 },
      { id: 3, name: "Mannar", provinceId: 1 },
      { id: 4, name: "Mullaitivu", provinceId: 1 },
      { id: 5, name: "Vavuniya", provinceId: 1 },

      // Eastern
      { id: 6, name: "Ampara", provinceId: 2 },
      { id: 7, name: "Batticaloa", provinceId: 2 },
      { id: 8, name: "Trincomalee", provinceId: 2 },

      // North Central
      { id: 9, name: "Anuradhapura", provinceId: 3 },
      { id: 10, name: "Polonnaruwa", provinceId: 3 },

      // North Western
      { id: 11, name: "Kurunegala", provinceId: 4 },
      { id: 12, name: "Puttalam", provinceId: 4 },

      // Central
      { id: 13, name: "Kandy", provinceId: 5 },
      { id: 14, name: "Matale", provinceId: 5 },
      { id: 15, name: "Nuwara Eliya", provinceId: 5 },

      // Uva
      { id: 16, name: "Badulla", provinceId: 6 },
      { id: 17, name: "Monaragala", provinceId: 6 },

      // Sabaragamuwa
      { id: 18, name: "Kegalle", provinceId: 7 },
      { id: 19, name: "Ratnapura", provinceId: 7 },

      // Western
      { id: 20, name: "Colombo", provinceId: 8 },
      { id: 21, name: "Gampaha", provinceId: 8 },
      { id: 22, name: "Kalutara", provinceId: 8 },

      // Southern
      { id: 23, name: "Galle", provinceId: 9 },
      { id: 24, name: "Hambantota", provinceId: 9 },
      { id: 25, name: "Matara", provinceId: 9 },
    ],
  });

  console.log("✅ Districts created");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });