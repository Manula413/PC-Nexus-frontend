import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (page: number, limit: number) => {
  return await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
}

export const getLogos = async () => {
  return await prisma.logo.findMany();
};
