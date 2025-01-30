import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { getLogos, getProducts } from "../services/products.service";
import ProductCard from "../components/ProductCard";
import LogoCarousel from '../components/logocarousel';

import { useState, useEffect } from "react";

export const loader = async () => {
    const products = await getProducts(1, 4); 
    const logos = await getLogos();
    return json({ products, logos });
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const page = Number(formData.get("page"));

    const products = await getProducts(1, page * 4); 
    return json({ products });
};

export default function ProductDisplay() {
    const { products: initialProducts, logos } = useLoaderData();
    const fetcher = useFetcher(); 

    const [products, setProducts] = useState(initialProducts);
    const [page, setPage] = useState(2); 

    
    useEffect(() => {
        if (fetcher.data?.products) {
            setProducts(fetcher.data.products);
        }
    }, [fetcher.data]);

    const loadMore = () => {
        const formData = new FormData();
        formData.append("page", page); 

        fetcher.submit(formData, { method: "post" }); 
        setPage((prev) => prev + 1); 
    };
    return (
        <main className="p-8 bg-white">
            {/* Featured Brands Section */}
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Today's Featured Brands</h2>
            <LogoCarousel /> <br/>

            {/* Featured Items Section */}
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Today's Featured Items</h2>
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
                    className={`bg-gray-900 text-white px-8 py-3 rounded-lg shadow-md transition-all duration-300 ${fetcher.state === "submitting" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700 hover:shadow-lg transform hover:scale-105"}`}
                    disabled={fetcher.state === "submitting"}
                >
                    {fetcher.state === "submitting" ? "Loading..." : "View More"}
                </button>
            </div>
        </main>
    );

}
