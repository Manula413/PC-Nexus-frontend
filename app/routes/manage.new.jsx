import { useEffect, useState } from "react";
import { Form } from "@remix-run/react";
import TextBox from "devextreme-react/text-box";
import TextArea from "devextreme-react/text-area";
import Button from "devextreme-react/button";
import Validator from "devextreme-react/validator";
import { RequiredRule, RangeRule } from "devextreme-react/validator";
import { json, redirect } from "@remix-run/node";


import "devextreme/dist/css/dx.light.css";
import { Font } from "devextreme-react/cjs/bar-gauge";

/**
 * Handles the creation of a new product via form submission.
 * @param {object} params - The action parameters.
 * @param {Request} params.request - The HTTP request object containing form data.
 * @returns {Promise<Response>} A redirect response on success or a JSON error response.
 */
export const action = async ({ request }) => {
    try {
        const formData = await request.formData();
        const productData = {
            name: formData.get("name")?.trim(),
            price: formData.get("price")?.trim(),
            description: formData.get("description")?.trim() || "",
            image: formData.get("image")?.trim() || "",
            category: formData.get("category")?.trim() || "",
            brand: formData.get("brand")?.trim() || "",
            rating: formData.get("rating") ? parseFloat(formData.get("rating")) : 0,
            reviews: formData.get("reviews") ? parseInt(formData.get("reviews"), 10) : 0,
        };

        if (!productData.name || !productData.price) {
            return json({ error: "Name and Price are required." }, { status: 400 });
        }

        const response = await fetch("https://vtossayw6e.execute-api.ap-southeast-2.amazonaws.com/prod/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return json({ error: errorData.message || "Failed to create product." }, { status: response.status });
        }

        return redirect("/manage");
    } catch (error) {
        console.error("Error in manage.new action:", error);
        return json({ error: "An unexpected error occurred." }, { status: 500 });
    }
};

/**
 * Component for adding a new product.
 * @returns {JSX.Element | null} The NewProduct component or null if DevExtreme Button is not yet loaded.
 */
export default function NewProduct() {
    const [DxButton, setDxButton] = useState(null);

    /**
     * Dynamically imports DevExtreme Button to prevent SSR issues.
     */
    useEffect(() => {
        import("devextreme-react/button").then((mod) => setDxButton(() => mod.default));
    }, []);

    if (!DxButton) return null; // Prevents SSR issues

    return (
        <section className="w-full p-6 bg-white shadow-lg rounded-md min-h-[500px]">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Add New Product</h1>
            <Form method="post" className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <TextBox
                        name="name"
                        placeholder="Product Name"
                        className="mt-1 w-full"
                        stylingMode="outlined"
                    >
                        <Validator validationGroup="newProductForm">
                            <RequiredRule message="Name is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price:</label>
                    <TextBox
                        name="price"
                        placeholder="Product Price"
                        className="mt-1 w-full"
                        stylingMode="outlined"
                    >
                        <Validator validationGroup="newProductForm">
                            <RequiredRule message="Price is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <TextArea
                        name="description"
                        placeholder="Product Description"
                        className="mt-1 w-full"
                        stylingMode="outlined"
                    >
                        <Validator validationGroup="newProductForm">
                            <RequiredRule message="Description is required" />
                        </Validator>
                    </TextArea>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL:</label>
                    <TextBox
                        name="image"
                        placeholder="Image URL"
                        className="mt-1 w-full"
                        stylingMode="outlined"
                    >
                        <Validator validationGroup="newProductForm">
                            <RequiredRule message="Image URL is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating:</label>
                    <TextBox
                        name="rating"
                        placeholder="Rating"
                        type="number"
                        className="mt-1 w-full"
                        stylingMode="outlined"
                    >
                        <Validator validationGroup="newProductForm">
                            <RequiredRule message="Rating is required" />
                            <RangeRule message="Rating must be between 0 and 5" min={0} max={5} />
                        </Validator>
                    </TextBox>
                </div>

                {/* Reviews */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Reviews:</label>
                    <TextBox
                        name="reviews"
                        placeholder="Number of Reviews"
                        type="number"
                        className="mt-1 w-full"
                        stylingMode="outlined"
                    >
                        <Validator validationGroup="newProductForm">
                            <RequiredRule message="Number of reviews is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category:</label>
                    <TextBox
                        name="category"
                        placeholder="Product Category"
                        className="mt-1 w-full"
                        stylingMode="outlined"
                    >
                        <Validator validationGroup="newProductForm">
                            <RequiredRule message="Category is required" />
                        </Validator>
                    </TextBox>
                </div>

                {/* Brand */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand:</label>
                    <TextBox
                        name="brand"
                        placeholder="Brand Name"
                        className="mt-1 w-full"
                        stylingMode="outlined"
                    >
                        <Validator validationGroup="newProductForm">
                            <RequiredRule message="Brand is required" />
                        </Validator>
                    </TextBox>
                </div>

                <Button
                    type="default"
                    text="Add Product"
                    stylingMode="outlined"
                    className="mt-4 w-full border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-100 transition duration-300 transform hover:scale-105"
                    useSubmitBehavior={true}
                />
            </Form>
        </section>
    );
}

