import prisma from "../utils/prisma.server";

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

interface Logo {
  id: number;
  url: string;
}


export const getProducts = async (page?: number, limit?: number) => {
  return await prisma.product.findMany({
    ...(page && limit ? { skip: (page - 1) * limit, take: limit } : {}),
  });
};


export const getLogos = async (): Promise<Logo[]> => {
  return prisma.logo.findMany();
};

export type ProductInput = Omit<Product, "id">;

export const createProduct = async (data: ProductInput): Promise<Product> => {
  try {
    return await prisma.product.create({ data });
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    return await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Failed to fetch product');
  }
};

export const updateProduct = async (id: number, data: Partial<ProductInput>): Promise<Product> => {
  try {
    return await prisma.product.update({ where: { id }, data });
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (id: number): Promise<Product> => {
  try {
    return await prisma.product.delete({ where: { id } });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
};
