import { Links, Link, Meta, Scripts } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProducts } from "../services/products.service";
import "../tailwind.css"; 


type Product = {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    category: string;
    brand: string;
};

type LoaderData = {
    products: Product[];
};

export const loader = async () => {
    const products: Product[] = await getProducts(1, 4);
    return json({ products }); 
};


export default function Index() {
    const loaderData = useLoaderData<typeof loader>();
    const { products } = loaderData;

    return (
        <div className="bg-white text-black">
            {/* Hero Section */}
            <section className="bg-gray-800 text-white py-24">
                <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center px-4">
                    <h1 className="text-4xl font-semibold mb-4">Shop the Best PC Parts</h1>
                    <p className="text-lg mb-6">Latest tech, top quality, and unbeatable prices</p>
                    <Link to="/products">
                        <button
                            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                            aria-label="Explore Products"
                        >
                            Explore Products
                        </button>
                    </Link>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-6">Featured Categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4">
                        <div className="bg-gray-200 p-6 rounded-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-3">Pre-Build Computers</h3>
                            <p>Find the perfect computer for your gaming needs</p>
                        </div>
                        <div className="bg-gray-200 p-6 rounded-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-3">Graphics Cards</h3>
                            <p>Boost your gaming experience with a powerful GPU</p>
                        </div>
                        <div className="bg-gray-200 p-6 rounded-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-3">Laptops</h3>
                            <p>Browse top-rated laptops for work or play</p>
                        </div>
                        <div className="bg-gray-200 p-6 rounded-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold mb-3">Accessories</h3>
                            <p>Upgrade your setup with high-quality accessories</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-6">Top Selling Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white shadow-lg rounded-xl p-6">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-56 h-56 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                                />
                                <h3 className="text-lg font-semibold line-clamp-2 h-20 overflow-hidden">{product.name}</h3>
                                <p className="text-base font-bold text-gray-800">{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
