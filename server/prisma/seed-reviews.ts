import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedReviews() {
  const reviews = [
    {
      reviewerName: "Dr. Himali Perera",
      reviewerRole: "Researcher",
      rating: 5,
      reviewText: "A quiet, powerful place to understand the depth of Sri Lanka's ancient craftsmanship. The rock-cut carvings at Gal Viharaya are breathtaking.",
      isActive: true,
    },
    {
      reviewerName: "Nuwan Silva",
      reviewerRole: "Photographer",
      rating: 5,
      reviewText: "The morning light on the granite carvings made the whole visit unforgettable. I will return every year.",
      isActive: true,
    },
    {
      reviewerName: "Sajani Fernando",
      reviewerRole: "Travel Blogger",
      rating: 5,
      reviewText: "Peaceful, beautifully preserved, and one of the most moving stops in all of Sri Lanka. A must-see for any cultural traveller.",
      isActive: true,
    },
    {
      reviewerName: "Amara Wickramasinghe",
      reviewerRole: "History Teacher",
      rating: 4,
      reviewText: "Walking through Sigiriya was like stepping back 1,500 years. The water gardens alone are worth the climb!",
      isActive: true,
    },
    {
      reviewerName: "James Thornton",
      reviewerRole: "International Tourist",
      rating: 5,
      reviewText: "The Temple of the Tooth is an extraordinary spiritual experience. The rituals and the atmosphere are unlike anything I have ever witnessed.",
      isActive: true,
    },
    {
      reviewerName: "Priya Dharmaratne",
      reviewerRole: "Architect",
      rating: 5,
      reviewText: "The Dutch colonial architecture at Galle Fort is remarkably well-preserved. It tells a story of Sri Lanka's layered history in stone.",
      isActive: true,
    },
  ];

  console.log("Seeding reviews…");
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: reviews.indexOf(review) + 1 },
      update: {},
      create: review,
    });
  }
  console.log(`✅ Seeded ${reviews.length} reviews.`);
}

seedReviews()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
