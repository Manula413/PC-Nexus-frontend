import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createProduct } from "../services/products.service";

export const action = async ({ request }) => {
    try {
        const formData = await request.formData();
        const name = formData.get("name")?.trim();
        const price = formData.get("price")?.trim();
        const description = formData.get("description")?.trim() || "";
        const image = formData.get("image")?.trim() || "";
        const category = formData.get("category")?.trim() || "";
        const brand = formData.get("brand")?.trim() || "";

        const ratingValue = formData.get("rating");
        const reviewsValue = formData.get("reviews");

        // Ensure rating and reviews are valid
        const rating = ratingValue ? parseFloat(ratingValue) : 0;
        const reviews = reviewsValue ? parseInt(reviewsValue, 10) : 0;

        if (!name || !price) {
            return json({ error: "Name and Price are required." }, { status: 400 });
        }

        await createProduct({ name, price, description, image, rating, reviews, category, brand });
        return redirect("/manage");
    } catch (error) {
        console.error("Error in manage.new action:", error);
        return json({ error: "An unexpected error occurred." }, { status: 500 });
    }
};


export default function NewProduct() {
    return (
        <section className="w-full p-4 bg-white shadow-lg rounded-md min-h-[500px]">
            <h1 className="text-3xl font-semibold mb-4 text-gray-800">Add New Product</h1>
            <Form method="post" className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Product Name"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price:</label>
                    <input
                        type="text"
                        name="price"
                        required
                        placeholder="Product Price"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        required
                        placeholder="Product Description"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Image URL"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        required
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="Rating"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Reviews */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reviews:</label>
                    <input
                        type="number"
                        name="reviews"
                        required
                        placeholder="Number of Reviews"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <input
                        type="text"
                        name="category"
                        required
                        placeholder="Product Category"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Brand */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        required
                        placeholder="Brand Name"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <button
                    type="submit"
                    className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition duration-300 transform hover:scale-105"
                >
                    Add Product
                </button>
            </Form>
        </section>
    );
}
