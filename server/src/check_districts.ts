import { prisma } from "./prisma/prisma.js";

async function main() {
  console.log("=== DB DISTRICTS ===");
  const districts = await prisma.district.findMany({
    orderBy: { id: "asc" }
  });
  console.log(districts);

  console.log("\n=== KALUTARA BODIYA IN DB ===");
  const kalutara = await prisma.historicalPlace.findFirst({
    where: { name: { contains: "Kalutara" } },
    include: { district: true, province: true }
  });
  console.log(kalutara);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
