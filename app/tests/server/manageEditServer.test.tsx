import { defineConfig } from 'vitest/config';
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import { loader, action } from '../../routes/manage.$id.edit';
import { getProductById, updateProduct } from '../../services/products.service';

// Custom Error Class
class HttpError extends Error {
  status: number;
  statusText: string;

  constructor(status: number, statusText: string) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
  }
}

/**
 * Mock the services used in the loader and action functions.
 */
vi.mock('../../services/products.service', () => {
  return {
    getProductById: vi.fn(),
    updateProduct: vi.fn(),
  };
});

/**
 * Test suite for the manage.$id.edit route.
 * @group Manage Product Edit
 */
describe('Manage Product Edit Route', () => {
  /**
   * Reset mocks before each test to ensure clean state.
   */
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test for the loader function.
   * Verifies if the product details are fetched correctly by the loader.
   */
  it('should load product data for editing', async () => {
    const mockProduct = {
      id: 1,
      name: 'Test Product',
      price: '10.00',
      description: 'Test product description',
      image: 'test.jpg',
      rating: 4.5,
      reviews: 10,
      category: 'Test Category',
      brand: 'Test Brand',
    };

    vi.mocked(getProductById).mockResolvedValue(mockProduct);

    const response = await loader({ params: { id: '1' } });

    // Assuming loader returns a Response object, extract its body
    const responseBody = await response.json();

    expect(getProductById).toHaveBeenCalledWith(1);
    expect(responseBody).toEqual({
      product: mockProduct,
    });
  });


  /**
   * Test for the loader function when product is not found.
   * Verifies that a 404 error is thrown if no product is found.
   */
  it('should throw a 404 error if product is not found', async () => {
    vi.mocked(getProductById).mockResolvedValue(null);  // Mocking the return value to be null (not found)

    try {
      await loader({ params: { id: '1' } });
    } catch (e: unknown) {
      // Check if it's a Response and its status is 404
      if (e instanceof Response) {
        expect(e.status).toBe(404); 
        expect(e.statusText).toBe('');
      } else {
        // Handle unexpected error
        throw e;
      }
    }
  });

  /**
   * Test for the loader function when ID is missing.
   * Verifies that a 400 error is thrown if ID is missing.
   */
  it('should throw a 400 error if ID is missing', async () => {
    try {
      await loader({ params: { id: '' } });  // Passing an empty string or invalid ID
    } catch (e: unknown) {
      const error = e as HttpError;  // Cast 'e' to 'HttpError'
      expect(error.status).toBe(400);
      expect(error.statusText).toBe('');
    }
  });


  /**
   * Test for the action function (product update).
   * Verifies if the product is updated correctly with the correct data.
   */
  it('should update product details', async () => {
    // Create mock FormData similar to what would be in a real request.
    const formData = new FormData();

    formData.set('name', 'Updated Product');
    formData.set('price', '20.00');
    formData.set('description', 'Updated description');
    formData.set('image', 'updated.jpg');
    formData.set('rating', '4.8');
    formData.set('reviews', '15');
    formData.set('category', 'Updated Category');
    formData.set('brand', 'Updated Brand');

    const mockUpdatedProduct = {
      id: 1,
      name: 'Updated Product',
      price: '20.00',
      description: 'Updated description',
      image: 'updated.jpg',
      rating: 4.8,
      reviews: 15,
      category: 'Updated Category',
      brand: 'Updated Brand',
    };

    vi.mocked(updateProduct).mockResolvedValue(mockUpdatedProduct);

    // Mock Request object with only necessary properties
    const mockRequest: Partial<Request> = {
      formData: () => Promise.resolve(formData), // Mock formData function
      headers: new Headers(),
      method: 'POST',
      body: null,
    };

    const response = await action({
      request: mockRequest as Request, // Type-cast it to a full Request
      params: { id: '1' },
    });

    expect(updateProduct).toHaveBeenCalledWith(1, expect.objectContaining({
      name: 'Updated Product',
      price: '20.00',
      description: 'Updated description',
      image: 'updated.jpg',
      rating: 4.8,
      reviews: 15,
      category: 'Updated Category',
      brand: 'Updated Brand',
    }));
    expect(response.status).toBe(302); // Check if status is a redirect
    expect(response.headers.get('Location')).toBe('/manage'); // Check redirect location
  });


  /**
   * Test for the action function when invalid data is provided (e.g., invalid rating).
   * Verifies that a 400 error is thrown when invalid data is provided.
   */
  it('should throw a 400 error if rating or reviews are invalid', async () => {
    const invalidFormData = new FormData();
    invalidFormData.set('name', 'Invalid Product');
    invalidFormData.set('price', '20.00');
    invalidFormData.set('description', 'Invalid description');
    invalidFormData.set('rating', 'invalid-rating');  // Invalid value
    invalidFormData.set('reviews', 'invalid-reviews');  // Invalid value
    invalidFormData.set('category', 'Invalid Category');
    invalidFormData.set('brand', 'Invalid Brand');

    const mockRequest = {
      formData: () => Promise.resolve(invalidFormData),
    };

    try {
      await action({
        request: mockRequest as Request,
        params: { id: '1' },
      });
    } catch (error: any) {  // Cast error to 'any'
      expect(error.status).toBe(400);
      expect(error.statusText).toBe('');
    }
  });
});
