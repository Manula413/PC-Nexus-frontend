import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getProductById, updateProduct } from "../services/products.service";
import { useState, useEffect } from "react";
import TextBox from "devextreme-react/text-box";
import TextArea from "devextreme-react/text-area";
import Validator, { RequiredRule, RangeRule } from "devextreme-react/validator";

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
    const [DxButton, setDxButton] = useState(null);

    useEffect(() => {
        import("devextreme-react/button").then((mod) => setDxButton(() => mod.default));
    }, []);

    if (!DxButton) return null; // Prevents SSR issues

    return (
        <section className="w-full p-4 bg-white shadow-lg rounded-md min-h-[500px]">
            <h1 className="text-3xl font-semibold mb-4 text-gray-800">Edit Product</h1>
            <Form method="post" className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <TextBox name="name" defaultValue={product.name} className="mt-1 w-full" stylingMode="outlined">
                        <Validator validationGroup="editProductForm">
                            <RequiredRule message="Name is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price:</label>
                    <TextBox name="price" defaultValue={product.price} className="mt-1 w-full" stylingMode="outlined">
                        <Validator validationGroup="editProductForm">
                            <RequiredRule message="Price is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <TextArea name="description" defaultValue={product.description} className="mt-1 w-full" stylingMode="outlined">
                        <Validator validationGroup="editProductForm">
                            <RequiredRule message="Description is required" />
                        </Validator>
                    </TextArea>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL:</label>
                    <TextBox name="image" defaultValue={product.image} className="mt-1 w-full" stylingMode="outlined">
                        <Validator validationGroup="editProductForm">
                            <RequiredRule message="Image URL is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating:</label>
                    <TextBox name="rating" defaultValue={product.rating} type="number" className="mt-1 w-full" stylingMode="outlined">
                        <Validator validationGroup="editProductForm">
                            <RequiredRule message="Rating is required" />
                            <RangeRule message="Rating must be between 0 and 5" min={0} max={5} />
                        </Validator>
                    </TextBox>
                </div>

                {/* Reviews */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reviews:</label>
                    <TextBox name="reviews" defaultValue={product.reviews} type="number" className="mt-1 w-full" stylingMode="outlined">
                        <Validator validationGroup="editProductForm">
                            <RequiredRule message="Number of reviews is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <TextBox name="category" defaultValue={product.category} className="mt-1 w-full" stylingMode="outlined">
                        <Validator validationGroup="editProductForm">
                            <RequiredRule message="Category is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Brand */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand:</label>
                    <TextBox name="brand" defaultValue={product.brand} className="mt-1 w-full" stylingMode="outlined">
                        <Validator validationGroup="editProductForm">
                            <RequiredRule message="Brand is required" />
                        </Validator>
                    </TextBox>
                </div>

                <DxButton
                    text="Update"
                    type="default"
                     stylingMode="outlined"
                    className="mt-4 w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105"
                    useSubmitBehavior={true}
                />
            </Form>
        </section>
    );
}
