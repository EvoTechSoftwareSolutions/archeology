import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
<<<<<<< HEAD
  console.log("🌱 Starting seed...");

  // ─── Provinces ────────────────────────────────────────────────────────
  const provinces = [
    { name: "Central", regionCode: "LK2" },
    { name: "Eastern", regionCode: "LK5" },
    { name: "North Central", regionCode: "LK7" },
    { name: "Northern", regionCode: "LK4" },
    { name: "North Western", regionCode: "LK6" },
    { name: "Sabaragamuwa", regionCode: "LK9" },
    { name: "Southern", regionCode: "LK3" },
    { name: "Uva", regionCode: "LK8" },
    { name: "Western", regionCode: "LK1" },
  ];

  for (const p of provinces) {
    await prisma.province.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }
  console.log("✅ Provinces seeded");

  // ─── Get province IDs ─────────────────────────────────────────────────
  const allProvinces = await prisma.province.findMany();
  const prov = Object.fromEntries(allProvinces.map((p) => [p.name, p.id]));

  // ─── Districts ────────────────────────────────────────────────────────
  const districtData = [
    { name: "Kandy", provinceId: prov["Central"] },
    { name: "Matale", provinceId: prov["Central"] },
    { name: "Nuwara Eliya", provinceId: prov["Central"] },
    { name: "Ampara", provinceId: prov["Eastern"] },
    { name: "Batticaloa", provinceId: prov["Eastern"] },
    { name: "Trincomalee", provinceId: prov["Eastern"] },
    { name: "Anuradhapura", provinceId: prov["North Central"] },
    { name: "Polonnaruwa", provinceId: prov["North Central"] },
    { name: "Jaffna", provinceId: prov["Northern"] },
    { name: "Kilinochchi", provinceId: prov["Northern"] },
    { name: "Mannar", provinceId: prov["Northern"] },
    { name: "Mullaitivu", provinceId: prov["Northern"] },
    { name: "Vavuniya", provinceId: prov["Northern"] },
    { name: "Kurunegala", provinceId: prov["North Western"] },
    { name: "Puttalam", provinceId: prov["North Western"] },
    { name: "Kegalle", provinceId: prov["Sabaragamuwa"] },
    { name: "Ratnapura", provinceId: prov["Sabaragamuwa"] },
    { name: "Galle", provinceId: prov["Southern"] },
    { name: "Hambantota", provinceId: prov["Southern"] },
    { name: "Matara", provinceId: prov["Southern"] },
    { name: "Badulla", provinceId: prov["Uva"] },
    { name: "Monaragala", provinceId: prov["Uva"] },
    { name: "Colombo", provinceId: prov["Western"] },
    { name: "Gampaha", provinceId: prov["Western"] },
    { name: "Kalutara", provinceId: prov["Western"] },
  ];

  for (const d of districtData) {
    const existing = await prisma.district.findFirst({ where: { name: d.name } });
    if (!existing) {
      await prisma.district.create({ data: d });
    }
  }
  console.log("✅ Districts seeded");

  // ─── Get district IDs ─────────────────────────────────────────────────
  const allDistricts = await prisma.district.findMany();
  const dist = Object.fromEntries(allDistricts.map((d) => [d.name, d.id]));

  // ─── Historical Places ────────────────────────────────────────────────
  const places = [
    {
      name: "Temple of the Sacred Tooth Relic",
      category: "Temple",
      description: "One of the most sacred Buddhist temples in the world, housing the relic of the tooth of the Buddha. A UNESCO World Heritage Site in the heart of Kandy.",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kandy temple of the tooth4.JPG?width=600",
      century: "16th Century",
      statusFlag: "Published",
      latitude: 7.2936,
      longitude: 80.6413,
      anchorXPct: 0.367,
      anchorYPct: 0.397,
      districtId: dist["Kandy"],
    },
    {
      name: "Sigiriya Rock Fortress",
      category: "Fortress",
      description: "An ancient rock fortress and palace ruin surrounded by an extensive network of gardens, canals and moats. A UNESCO World Heritage Site and one of the best-preserved examples of ancient urban planning.",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Sri_Lanka_Sigiriya.jpg?width=600",
      century: "5th Century",
      statusFlag: "Published",
      latitude: 7.9570,
      longitude: 80.7603,
      anchorXPct: 0.398,
      anchorYPct: 0.67,
      districtId: dist["Matale"],
    },
    {
      name: "Sacred City of Anuradhapura",
      category: "Ancient City",
      description: "Sri Lanka's first ancient capital, a UNESCO World Heritage City home to the sacred Sri Maha Bodhi tree and massive ancient stupas including the Ruwanwelisaya.",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ruwanweli Maha Seya - Anuradhapura.jpg?width=600",
      century: "4th Century BC",
      statusFlag: "Published",
      latitude: 8.3114,
      longitude: 80.4037,
      anchorXPct: 0.548,
      anchorYPct: 0.521,
      districtId: dist["Anuradhapura"],
    },
    {
      name: "Galle Fort",
      category: "Fort",
      description: "A colonial-era fortification built by the Portuguese and extensively fortified by the Dutch in the 17th century. A UNESCO World Heritage Site showcasing European colonial architecture in South Asia.",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Galle Fort, Sri Lanka.JPG?width=600",
      century: "16th Century",
      statusFlag: "Published",
      latitude: 6.0275,
      longitude: 80.2167,
      anchorXPct: 0.486,
      anchorYPct: 0.509,
      districtId: dist["Galle"],
    },
    {
      name: "Ancient City of Polonnaruwa",
      category: "Ancient City",
      description: "The well-preserved ruins of the medieval capital of Sri Lanka, a UNESCO World Heritage Site. Home to the magnificent Gal Vihara rock-cut Buddhas and the Parakrama Samudra reservoir.",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gal Viharaya.jpg?width=600",
      century: "10th Century",
      statusFlag: "Published",
      latitude: 7.9403,
      longitude: 81.0188,
      anchorXPct: 0.505,
      anchorYPct: 0.497,
      districtId: dist["Polonnaruwa"],
    },
    {
      name: "Dambulla Cave Temple",
      category: "Temple",
      description: "A UNESCO World Heritage Site, this remarkable cave temple complex contains 153 Buddha statues and ancient wall paintings covering over 2,100 square metres.",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Dambulla cave temple2.jpg?width=600",
      century: "1st Century BC",
      statusFlag: "Published",
      latitude: 7.8567,
      longitude: 80.6487,
      anchorXPct: 0.398,
      anchorYPct: 0.35,
      districtId: dist["Matale"],
    },
    {
      name: "Ruwanwelisaya Stupa",
      category: "Stupa",
      description: "One of the tallest ancient monuments in the world, built by King Dutugamunu in the 2nd century BC. A sacred pilgrimage site representing the pinnacle of ancient Sinhalese architecture.",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ruwanweli Maha Seya - Anuradhapura.jpg?width=600",
      century: "2nd Century BC",
      statusFlag: "Published",
      latitude: 8.3489,
      longitude: 80.3966,
      anchorXPct: 0.44,
      anchorYPct: 0.45,
      districtId: dist["Anuradhapura"],
    },
    {
      name: "Gal Viharaya",
      category: "Temple",
      description: "A celebrated rock-cut Buddhist shrine in Polonnaruwa, known for its serene granite Buddha statues, including a colossal 15-metre recumbent Buddha carved from a single granite face.",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gal Viharaya.jpg?width=600",
      century: "12th Century",
      statusFlag: "Published",
      latitude: 7.9455,
      longitude: 81.0023,
      anchorXPct: 0.505,
      anchorYPct: 0.3,
      districtId: dist["Polonnaruwa"],
    },
    {
      name: "Nallur Kandaswamy Kovil",
      category: "Temple",
      description: "Jaffna's grandest Hindu temple, its golden gopuram anchoring centuries of Tamil tradition and culture. One of the most revered Hindu shrines in Sri Lanka.",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Nallur Kandaswamy temple.jpg?width=600",
      century: "10th Century",
      statusFlag: "Published",
      latitude: 9.6615,
      longitude: 80.0255,
      anchorXPct: 0.606,
      anchorYPct: 0.4,
      districtId: dist["Jaffna"],
    },
    {
      name: "Koneswaram Temple",
      category: "Temple",
      description: "Fort Frederick and the cliffside Koneswaram Temple crown a natural deep-water harbour in Trincomalee. An ancient Hindu shrine rebuilt after destruction by Portuguese colonialists.",
      image: "https://picsum.photos/seed/koneswaram/600/400",
      century: "6th Century",
      statusFlag: "Published",
      latitude: 8.5874,
      longitude: 81.2328,
      anchorXPct: 0.466,
      anchorYPct: 0.428,
      districtId: dist["Trincomalee"],
    },
    {
      name: "Sri Maha Bodhi",
      category: "Sacred Site",
      description: "The oldest documented tree in the world, the sacred fig tree is said to be a sapling from the Bodhi tree under which the Buddha attained enlightenment, planted in 288 BC.",
      image: "https://picsum.photos/seed/sri-maha-bodhi/600/400",
      century: "3rd Century BC",
      statusFlag: "Published",
      latitude: 8.3457,
      longitude: 80.3952,
      anchorXPct: 0.6,
      anchorYPct: 0.55,
      districtId: dist["Anuradhapura"],
    },
    {
      name: "Mihintale",
      category: "Sacred Site",
      description: "The site where Buddhism was introduced to Sri Lanka in 247 BC by Mahinda, son of Emperor Ashoka. A hilltop pilgrimage site with ancient ruins and inscriptions.",
      image: "https://picsum.photos/seed/mihintale/600/400",
      century: "3rd Century BC",
      statusFlag: "Published",
      latitude: 8.3500,
      longitude: 80.5097,
      anchorXPct: 0.66,
      anchorYPct: 0.35,
      districtId: dist["Anuradhapura"],
    },
  ];

  for (const place of places) {
    const existing = await prisma.historicalPlace.findFirst({ where: { name: place.name } });
    if (!existing) {
      await prisma.historicalPlace.create({ data: place });
      console.log(`  ✓ Added: ${place.name}`);
    } else {
      console.log(`  - Skipped (already exists): ${place.name}`);
    }
  }

  console.log("\n🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
=======
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
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
