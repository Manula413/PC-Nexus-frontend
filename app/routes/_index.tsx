import { Links, Link, Meta, Scripts } from "@remix-run/react";
import "../tailwind.css";


export default function Index() {
  return (
    <div className="bg-white text-black">


        {/* Hero Section */}
        <section className="bg-gray-800 text-white py-24">
            <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center px-4">
                <h1 className="text-4xl font-semibold mb-4">Shop the Best PC Parts</h1>
                <p className="text-lg mb-6">Latest tech, top quality, and unbeatable prices</p>
                <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300">
                    Explore Products
                </button>
            </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-white">
            <div className="max-w-screen-xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-6">Featured Categories</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-4">
                    <div className="bg-gray-200 p-6 rounded-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold mb-3">Processors</h3>
                        <p>Find the perfect processor for your build</p>
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
                    {/* Add your Product Cards here */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <img src="#" alt="Product" className="w-full h-40 object-cover mb-4" />
                        <h3 className="text-lg font-semibold">Product Name</h3>
                        <p className="text-base font-bold text-gray-800">$199.99</p>
                    </div>
                    {/* Repeat for other products */}

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <img src="#" alt="Product" className="w-full h-40 object-cover mb-4" />
                        <h3 className="text-lg font-semibold">Product Name</h3>
                        <p className="text-base font-bold text-gray-800">$199.99</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <img src="#" alt="Product" className="w-full h-40 object-cover mb-4" />
                        <h3 className="text-lg font-semibold">Product Name</h3>
                        <p className="text-base font-bold text-gray-800">$199.99</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <img src="#" alt="Product" className="w-full h-40 object-cover mb-4" />
                        <h3 className="text-lg font-semibold">Product Name</h3>
                        <p className="text-base font-bold text-gray-800">$199.99</p>
                    </div>
                </div>
            </div>
        </section>

        
    </div>
);

}
