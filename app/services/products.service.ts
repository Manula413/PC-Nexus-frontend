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

/**
 * Retrieves a list of products from the database, supporting pagination.
 * @param page The page number (starting from 1).
 * @param limit The number of products per page.
 * @returns A promise that resolves to an array of products.
 */
export const getProducts = async (page?: number, limit?: number): Promise<Product[]> => {
  return await prisma.product.findMany({
    ...(page && limit ? { skip: (page - 1) * limit, take: limit } : {}),
  });
};

export const getLogos = async (): Promise<Logo[]> => {
  return prisma.logo.findMany();
};

export type ProductInput = Omit<Product, "id">;

/**
 * Creates a new product in the database.
 * @param data The product data to be created.
 * @returns A promise that resolves to the created product.
 * @throws Error If the product creation fails.
 */
export const createProduct = async (data: ProductInput): Promise<Product> => {
  try {
    return await prisma.product.create({ data });
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product'); 
  }
};

/**
 * Retrieves a product by its ID from the database.
 * @param id The ID of the product to retrieve.
 * @returns A promise that resolves to the product if found, or null if not.
 * @throws Error If the product retrieval fails.
 */
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    return await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw new Error('Failed to fetch product'); 
  }
};

/**
 * Updates an existing product in the database.
 * @param id The ID of the product to update.
 * @param data The partial data to update the product with.
 * @returns A promise that resolves to the updated product.
 * @throws Error If the product update fails.
 */
export const updateProduct = async (id: number, data: Partial<ProductInput>): Promise<Product> => {
  try {
    return await prisma.product.update({ where: { id }, data });
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product'); 
  }
};

/**
 * Deletes a product from the database.
 * @param id The ID of the product to delete.
 * @returns A promise that resolves to the deleted product.
 * @throws Error If the product deletion fails.
 */
export const deleteProduct = async (id: number): Promise<Product> => {
  try {
    return await prisma.product.delete({ where: { id } });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product'); 
  }
};