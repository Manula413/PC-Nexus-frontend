import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import ManageProducts from '../../routes/manage';
import { getProducts, deleteProduct, createProduct } from '../../services/products.service';
import '@testing-library/jest-dom';
import React from "react";

// Mock the services
vi.mock('../../services/products.service', () => ({
  getProducts: vi.fn(),
  deleteProduct: vi.fn(),
  createProduct: vi.fn(),
}));

// Mock useLoaderData and useLocation hooks
vi.mock('@remix-run/react', () => ({
  ...vi.importActual('@remix-run/react'),
  useLoaderData: vi.fn(),
  useLocation: vi.fn(),
  useParams: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();

  // Mocking the services directly
  vi.mocked(getProducts).mockResolvedValue([]);
  vi.mocked(deleteProduct).mockResolvedValue({
    id: 1,
    name: 'Deleted Product',
    price: '0',
    description: 'This product was deleted',
    image: '',
    rating: 0,
    reviews: 0,
    category: 'None',
    brand: 'None',
  });

  vi.mocked(createProduct).mockResolvedValue({
    id: 2,
    name: 'New Product',
    price: '20',
    description: 'A newly created product',
    image: 'newproduct.jpg',
    rating: 5,
    reviews: 1,
    category: 'Test Category',
    brand: 'Test Brand',
  });

  // Mock Remix hooks
  vi.mocked(require('@remix-run/react').useLoaderData).mockReturnValue({
    products: [
      {
        id: 1,
        name: 'Product 1',
        price: '10',
        description: 'Test description',
        image: 'product1.jpg',
        rating: 4.5,
        reviews: 10,
        category: 'Test Category',
        brand: 'Test Brand',
      },
    ],
  });

  vi.mocked(require('@remix-run/react').useLocation).mockReturnValue({
    pathname: "/manage/new",
  });

  vi.mocked(require('@remix-run/react').useParams).mockReturnValue({
    id: "1",
  });
});

it('renders products correctly', async () => {
  render(
    <MemoryRouter>
      <ManageProducts />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });
});

it('calls deleteProduct when delete button is clicked', async () => {
  render(
    <MemoryRouter>
      <ManageProducts />
    </MemoryRouter>
  );

  // Find the delete button dynamically
  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);

  // Ensure deleteProduct is called with correct ID
  await waitFor(() => expect(deleteProduct).toHaveBeenCalledWith(1));
});

it('calls createProduct when add button is clicked', async () => {
  render(
    <MemoryRouter>
      <ManageProducts />
    </MemoryRouter>
  );

  const addButton = screen.getByRole('button', { name: /add product/i });
  fireEvent.click(addButton);

  // Ensure createProduct was called
  await waitFor(() => expect(createProduct).toHaveBeenCalled());
});
