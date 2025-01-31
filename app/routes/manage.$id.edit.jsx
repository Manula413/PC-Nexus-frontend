import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getProductById, updateProduct } from "../services/products.service";

export const loader = async ({ params }) => {
    const id = params.id;  // Ensure params.id is properly received
    if (!id) {
        throw new Response("Missing ID", { status: 400 });
    }

    const product = await getProductById(Number(id));

    if (!product) {
        throw new Response("Product Not Found", { status: 404 });
    }

    return json({ product });
};

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const image = formData.get("image");

    // Parse rating and reviews to numbers
    const rating = parseFloat(formData.get("rating"));
    const reviews = parseInt(formData.get("reviews"), 10);

    const category = formData.get("category");
    const brand = formData.get("brand");

    // Ensure rating and reviews are valid numbers
    if (isNaN(rating) || isNaN(reviews)) {
        throw new Response("Invalid rating or reviews value", { status: 400 });
    }

    await updateProduct(Number(params.id), { name, price, description, image, rating, reviews, category, brand });

    return redirect("/manage");
};

export default function EditProduct() {
    const { product } = useLoaderData();

    return (
        <section className="w-full sm:w-3/5 md:w-2/3 lg:w-1/2 xl:w-2/3 p-4 bg-white shadow-lg rounded-md min-h-[500px]">
            <h1 className="text-3xl font-semibold mb-4 text-gray-800">Edit Product</h1>
            <Form method="post" className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={product.name}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Price:
                    </label>
                    <input
                        type="text"
                        name="price"
                        defaultValue={product.price}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        defaultValue={product.description}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Image URL:
                    </label>
                    <input
                        type="text"
                        name="image"
                        defaultValue={product.image}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Rating:
                    </label>
                    <input
                        type="number"
                        name="rating"
                        defaultValue={product.rating}
                        step="0.1"
                        min="0"
                        max="5"
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Reviews */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Reviews:
                    </label>
                    <input
                        type="number"
                        name="reviews"
                        defaultValue={product.reviews}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Category:
                    </label>
                    <input
                        type="text"
                        name="category"
                        defaultValue={product.category}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                {/* Brand */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Brand:
                    </label>
                    <input
                        type="text"
                        name="brand"
                        defaultValue={product.brand}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <button
                    type="submit"
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105"
                >
                    Update
                </button>
            </Form>
        </section>
    );
}
