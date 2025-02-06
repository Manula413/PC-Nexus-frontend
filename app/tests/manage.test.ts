import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Correctly importing BrowserRouter
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import ManageProducts, { loader, action } from '../routes/manage'; // Correctly importing ManageProducts
import { getProducts, deleteProduct, createProduct } from '../services/products.service';
import { json, redirect } from '@remix-run/node';

// Properly mock services
vi.mock('../services/products.service', () => ({
    getProducts: vi.fn().mockResolvedValue([]), // Mock with empty array by default
    deleteProduct: vi.fn().mockResolvedValue(null),
    createProduct: vi.fn().mockResolvedValue(null),
}));

describe('ManageProducts Component', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Reset all mocks before each test to ensure a clean state
    });

    // Test for loader function
    describe('Loader', () => {
        it('fetches products correctly', async () => {
            const mockProducts = [
                {
                    id: 1,
                    name: 'Product 1',
                    price: '10',
                    description: 'A test product',
                    image: 'product1.jpg',
                    rating: 4.5,
                    reviews: 10,
                    category: 'Test Category',
                    brand: 'Test Brand',
                },
                {
                    id: 2,
                    name: 'Product 2',
                    price: '20',
                    description: 'Another test product',
                    image: 'product2.jpg',
                    rating: 4.0,
                    reviews: 5,
                    category: 'Test Category',
                    brand: 'Test Brand',
                },
            ];
            vi.mocked(getProducts).mockResolvedValue(mockProducts);  // Mock the loader function

            const response = await loader();
            const data = await response.json();

            expect(data.products).toEqual(mockProducts);
        });
    });

    // Test for action function (Add)
    describe('Action (Add)', () => {
        it('should handle add product action correctly', async () => {
            const mockFormData = new FormData();
            mockFormData.append('actionType', 'add');
            mockFormData.append('name', 'New Product');
            mockFormData.append('price', '30');

            // Mock the createProduct function to return a mock product
            const mockProduct = {
                id: 1,
                name: 'New Product',
                price: '30',
                description: 'A new product description',
                image: 'new-product.jpg',
                rating: 4.0,
                reviews: 10,
                category: 'Test Category',
                brand: 'Test Brand',
            };
            vi.mocked(createProduct).mockResolvedValue(mockProduct);  // Return a mock product

            const mockRequest = { formData: () => mockFormData } as unknown as Request;
            const response = await action({ request: mockRequest });

            expect(createProduct).toHaveBeenCalledWith({
                name: 'New Product',
                price: '30',
            });
            expect(response).toEqual(redirect('/manage'));
        });
    });

    // Test for action function (Delete)
    describe('Action (Delete)', () => {
        it('should handle delete product action correctly', async () => {
            const mockFormData = new FormData();
            mockFormData.append('actionType', 'delete');
            mockFormData.append('id', '1');

            const mockProduct = {
                id: 1,
                name: 'New Product',
                price: '30',
                description: 'A new product description',
                image: 'new-product.jpg',
                rating: 4.0,
                reviews: 10,
                category: 'Test Category',
                brand: 'Test Brand',
            };
            vi.mocked(deleteProduct).mockResolvedValue(mockProduct);  // Mocking the deleteProduct function

            const mockRequest = { formData: () => mockFormData } as unknown as Request;
            const response = await action({ request: mockRequest });

            expect(deleteProduct).toHaveBeenCalledWith(1);
            expect(response).toEqual(redirect('/manage'));
        });
    });

    // Test for ManageProducts Component
    describe('ManageProducts Component', () => {
        it('should render the correct number of rows for products', async () => {
            const mockProducts = [
                {
                    id: 1,
                    name: 'Product 1',
                    price: '10',
                    description: 'Description for Product 1',
                    image: 'product1.jpg',
                    rating: 4.5,
                    reviews: 10,
                    category: 'Category 1',
                    brand: 'Brand 1',
                },
                {
                    id: 2,
                    name: 'Product 2',
                    price: '20',
                    description: 'Description for Product 2',
                    image: 'product2.jpg',
                    rating: 4.0,
                    reviews: 8,
                    category: 'Category 2',
                    brand: 'Brand 2',
                },
            ];

            vi.mocked(getProducts).mockResolvedValue(mockProducts);  // Mock the service

            render(
                <BrowserRouter>
                    <ManageProducts />
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(screen.getAllByRole('row')).toHaveLength(mockProducts.length + 1); // +1 for header row
            });
        });
    });

    it('should call deleteProduct when delete button is clicked', async () => {
        const mockProducts = [
            {
                id: 1,
                name: 'Product 1',
                price: '10',
                description: 'Description for Product 1',
                image: 'product1.jpg',
                rating: 4.5,
                reviews: 10,
                category: 'Category 1',
                brand: 'Brand 1',
            },
            {
                id: 2,
                name: 'Product 2',
                price: '20',
                description: 'Description for Product 2',
                image: 'product2.jpg',
                rating: 4.0,
                reviews: 8,
                category: 'Category 2',
                brand: 'Brand 2',
            },
        ];

        vi.mocked(getProducts).mockResolvedValue(mockProducts);  // Mock the service

        render(
            <BrowserRouter>
                <ManageProducts />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Delete'));
        await waitFor(() => expect(deleteProduct).toHaveBeenCalledWith(1));
    });

    it('should call createProduct when add product button is clicked', async () => {
        render(
            <BrowserRouter>
                <ManageProducts />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Add Product'));
        await waitFor(() => expect(createProduct).toHaveBeenCalled());
    });
});
