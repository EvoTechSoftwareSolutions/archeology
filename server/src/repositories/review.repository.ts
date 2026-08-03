import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllReviews = async () => {
  return prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getActiveReviews = async () => {
  return prisma.review.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getReviewById = async (id: number) => {
  return prisma.review.findUnique({ where: { id } });
};

export const createReview = async (data: {
  reviewerName: string;
  reviewerRole?: string;
  image?: string;
  rating?: number;
  reviewText: string;
  isActive?: boolean;
}) => {
  return prisma.review.create({ data });
};

export const updateReview = async (
  id: number,
  data: {
    reviewerName?: string;
    reviewerRole?: string;
    image?: string;
    rating?: number;
    reviewText?: string;
    isActive?: boolean;
  }
) => {
  return prisma.review.update({ where: { id }, data });
};

export const deleteReview = async (id: number) => {
  return prisma.review.delete({ where: { id } });
<<<<<<< HEAD
};
=======
};
>>>>>>> 9931c83eb22fc150fecacb27a2b7bd6cd8599a5c
