import prisma from "../utils/prisma.server";

export const getProducts = async (page?: number, limit?: number): Promise<Product[]> => {
  return prisma.product.findMany({
    ...(page && limit ? { skip: (page - 1) * limit, take: limit } : {}),
  });
};

export const getLogos = async (): Promise<any[]> => {
  return prisma.logo.findMany();
};

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
}

// Define a type for creating/updating products (exclude 'id' for creation)
export type ProductInput = Omit<Product, "id">;

export const createProduct = async (data: ProductInput): Promise<Product> => {
  return prisma.product.create({ data });
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return prisma.product.findUnique({ where: { id } });
};

export const updateProduct = async (id: number, data: Partial<ProductInput>): Promise<Product> => {
  return prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id: number): Promise<Product> => {
  return prisma.product.delete({ where: { id } });
};
