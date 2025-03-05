import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { getWooCommerceProducts } from "../services/woocommerce.service";
import ProductCard from "../components/ProductCard";
import LogoCarousel from '../components/logocarousel';
import { useState, useEffect } from "react";

/**
 * Loader function to fetch initial products from WooCommerce API.
 * @returns {Promise<Response>} A JSON response containing initial products.
 */
export const loader = async () => {
    try {
      const products = await getWooCommerceProducts(1, 4);
      return json({ products });
    } catch (error) {
      console.error("WooCommerce API Error:", error); // Log the error
      return json({ products: [], error: "Failed to fetch products" }, { status: 500 });
    }
  };
  

/**
 * Action function to fetch more products based on the requested page.
 * @param {object} params - The action parameters.
 * @param {Request} params.request - The HTTP request object containing form data.
 * @returns {Promise<Response>} A JSON response containing additional products.
 */
export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const page = Number(formData.get("page"));

    const products = await getWooCommerceProducts(page, 4);
    return json({ products });
  } catch (error) {
    return json({ products: [], error: "Failed to fetch more products" }, { status: 500 });
  }
};

/**
 * ProductDisplay component - Displays a list of products with a "Load More" functionality.
 * @returns {JSX.Element} The rendered product display component.
 */
export default function WooCommerceProducts() {
  const { products: initialProducts } = useLoaderData();
  const fetcher = useFetcher();

  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (fetcher.data?.products) {
      setProducts((prevProducts) => [...prevProducts, ...fetcher.data.products]);
    }
  }, [fetcher.data]);

  /**
   * Handles loading more products when the button is clicked.
   */
  const loadMore = () => {
    const formData = new FormData();
    formData.append("page", page.toString());

    fetcher.submit(formData, { method: "post" });
    setPage((prev) => prev + 1);
  };

  return (
    <main className="p-8 bg-white max-w-8xl">
      {/* Featured Brands Section */}
    
      {/* Featured Items Section */}
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-16">Today's Featured Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={loadMore}
          className={`bg-gray-900 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-300 focus:outline-none ${fetcher.state === "submitting" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 hover:shadow-lg transform hover:scale-105"}`}
          disabled={fetcher.state === "submitting"}
        >
          {fetcher.state === "submitting" ? "Loading..." : "View More"}
        </button>
      </div>
    </main>
  );
}
