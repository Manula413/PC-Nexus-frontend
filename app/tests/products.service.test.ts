import { defineConfig } from 'vitest/config'
import { describe, it, expect, vi, beforeEach } from 'vitest';
import prisma from '../utils/prisma.server';
import { 
  getProducts, 
  getLogos, 
  createProduct, 
  getProductById, 
  updateProduct, 
  deleteProduct, 
  ProductInput 
} from '../services/products.service';

// Properly mock Prisma methods for Vitest
vi.mock('../utils/prisma.server', () => {
  return {
    default: {
      product: {
        findMany: vi.fn().mockResolvedValue([]) as vi.Mock,
        create: vi.fn().mockResolvedValue(null) as vi.Mock,
        findUnique: vi.fn().mockResolvedValue(null) as vi.Mock,
        update: vi.fn().mockResolvedValue(null) as vi.Mock,
        delete: vi.fn().mockResolvedValue(null) as vi.Mock,
      },
      logo: {
        findMany: vi.fn().mockResolvedValue([]) as vi.Mock,
      },
    },
  };
});

describe('Product Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch products with pagination', async () => {
    (prisma.product.findMany as vi.Mock).mockResolvedValue([]);
    const products = await getProducts(1, 10);
    expect(prisma.product.findMany).toHaveBeenCalledWith({ skip: 0, take: 10 });
    expect(products).toEqual([]);
  });

  it('should fetch all products when no pagination is provided', async () => {
    (prisma.product.findMany as vi.Mock).mockResolvedValue([]);
    const products = await getProducts();
    expect(prisma.product.findMany).toHaveBeenCalledWith({});
    expect(products).toEqual([]);
  });

  it('should fetch logos', async () => {
    (prisma.logo.findMany as vi.Mock).mockResolvedValue([]);
    const logos = await getLogos();
    expect(prisma.logo.findMany).toHaveBeenCalled();
    expect(logos).toEqual([]);
  });

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
    (prisma.product.create as vi.Mock).mockResolvedValue({ id: 1, ...newProduct });
    const product = await createProduct(newProduct);
    expect(prisma.product.create).toHaveBeenCalledWith({ data: newProduct });
    expect(product).toEqual({ id: 1, ...newProduct });
  });

  it('should fetch a product by ID', async () => {
    (prisma.product.findUnique as vi.Mock).mockResolvedValue(null);
    const product = await getProductById(1);
    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(product).toBeNull();
  });

  it('should update a product', async () => {
    (prisma.product.update as vi.Mock).mockResolvedValue({ id: 1, name: 'Updated Product' });
    const updatedProduct = await updateProduct(1, { name: 'Updated Product' });
    expect(prisma.product.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: 'Updated Product' } });
    expect(updatedProduct).toEqual({ id: 1, name: 'Updated Product' });
  });

  it('should delete a product', async () => {
    (prisma.product.delete as vi.Mock).mockResolvedValue({ id: 1, name: 'Deleted Product' });
    const deletedProduct = await deleteProduct(1);
    expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(deletedProduct).toEqual({ id: 1, name: 'Deleted Product' });
  });
});
