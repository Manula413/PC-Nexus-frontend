import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { vi } from 'vitest';
import ManageProducts from '../../routes/manage';
import { getProducts, deleteProduct, createProduct } from '../../services/products.service';
import '@testing-library/jest-dom';

// Mock the services
vi.mock('../../services/products.service', () => ({
  getProducts: vi.fn().mockResolvedValue([]),
  deleteProduct: vi.fn().mockResolvedValue(null),
  createProduct: vi.fn().mockResolvedValue(null),
}));

// Mock useLoaderData hook to simulate loader data
vi.mock('@remix-run/react', () => ({
  ...vi.importActual('@remix-run/react'),
  useLoaderData: () => ({
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
  }),
}));

describe('ManageProducts Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Ensure form is submitted and product deletion is called
    await waitFor(() => expect(deleteProduct).toHaveBeenCalledWith(1));
  });

  it('calls createProduct when add button is clicked', async () => {
    render(
      <MemoryRouter>
        <ManageProducts />
      </MemoryRouter>
    );

    const addButton = screen.getByText('Add Product');
    fireEvent.click(addButton);

    // Wait for the "Add Product" form to appear (indicating the page has changed)
    await waitFor(() => expect(screen.getByText('Select a product to edit or add a new one.')).toBeInTheDocument());

    // Make sure createProduct was called
    await waitFor(() => expect(createProduct).toHaveBeenCalled());
  });
});
