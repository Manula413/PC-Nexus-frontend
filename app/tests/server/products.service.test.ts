import { defineConfig } from 'vitest/config';
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest'
import prisma from '../../utils/prisma.server';
import {
  getProducts,
  getLogos,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  ProductInput
} from '../../services/products.service';

// Properly mock Prisma methods for Vitest
vi.mock('../../utils/prisma.server', () => {
  return {
    default: {
      product: {
        findMany: vi.fn().mockResolvedValue([]),
        create: vi.fn().mockResolvedValue(null),
        findUnique: vi.fn().mockResolvedValue(null),
        update: vi.fn().mockResolvedValue(null),
        delete: vi.fn().mockResolvedValue(null),
      },
      logo: {
        findMany: vi.fn().mockResolvedValue([]),
      },
    },
  };
});


/**
 * Test suite for the product service functions.
 * @group Product Service
 */
describe('Product Service', () => {
  /**
   * Reset mocks before each test to ensure clean state.
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test for fetching products with pagination.
   * Verifies if the correct Prisma method is called with the correct pagination params.
   */
  it('should fetch products with pagination', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue([]);
    const products = await getProducts(1, 10);
    expect(prisma.product.findMany).toHaveBeenCalledWith({ skip: 0, take: 10 });
    expect(products).toEqual([]);
  });

  /**
   * Test for fetching all products when no pagination is provided.
   * Verifies if the correct Prisma method is called with no pagination params.
   */
  it('should fetch all products when no pagination is provided', async () => {
    vi.mocked(prisma.product.findMany).mockResolvedValue([]);
    const products = await getProducts();
    expect(prisma.product.findMany).toHaveBeenCalledWith({});
    expect(products).toEqual([]);
  });

  /**
   * Test for fetching logos.
   * Verifies if the correct Prisma method is called and returns logos.
   */
  it('should fetch logos', async () => {
    vi.mocked(prisma.logo.findMany).mockResolvedValue([]);
    const logos = await getLogos();
    expect(prisma.logo.findMany).toHaveBeenCalled();
    expect(logos).toEqual([]);
  });

  /**
   * Test for creating a product.
   * Verifies if the Prisma method `create` is called with the correct data and the correct result is returned.
   */
  it('should create a product', async () => {
    const newProduct: ProductInput = {
      name: 'Test Product',
      price: '10.00',
      description: 'A test product',
      image: 'test.jpg',
      rating: 4.5,
      reviews: 10,
      category: 'Test Category',
      brand: 'Test Brand',
    };
    vi.mocked(prisma.product.create).mockResolvedValue({ id: 1, ...newProduct });
    const product = await createProduct(newProduct);
    expect(prisma.product.create).toHaveBeenCalledWith({ data: newProduct });
    expect(product).toEqual({ id: 1, ...newProduct });
  });
  /**
   * Test for fetching a product by its ID.
   * Verifies if the correct Prisma method `findUnique` is called and returns `null` when no product is found.
   */
  it('should fetch a product by ID', async () => {
    vi.mocked(prisma.product.findUnique).mockResolvedValue(null);
    const product = await getProductById(1);
    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(product).toBeNull();
  });

  /**
   * Test for updating a product.
   * Verifies if the correct Prisma method `update` is called with the correct data and the updated product is returned.
   */
  it('should update a product', async () => {
    const mockProduct = {
      id: 1,
      name: 'Updated Product',
      price: '10.00',
      description: 'A test product',
      image: 'test.jpg',
      rating: 4.5,
      reviews: 10,
      category: 'Test Category',
      brand: 'Test Brand',
    };
    vi.mocked(prisma.product.update).mockResolvedValue(mockProduct);
    const updatedProduct = await updateProduct(1, { name: 'Updated Product' });
    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'Updated Product' },
    });

    expect(updatedProduct).toEqual(mockProduct);
  });


  /**
   * Test for deleting a product.
   * Verifies if the correct Prisma method `delete` is called with the correct product ID and the deleted product is returned.
   */
  it('should delete a product', async () => {
    const mockProduct = {
      id: 1,
      name: 'Deleted Product',
      price: '10.00',
      description: 'A test product',
      image: 'test.jpg',
      rating: 4.5,
      reviews: 10,
      category: 'Test Category',
      brand: 'Test Brand',
    };
    vi.mocked(prisma.product.delete).mockResolvedValue(mockProduct);
    const deletedProduct = await deleteProduct(1);
    expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(deletedProduct).toEqual(mockProduct);
  });

});
