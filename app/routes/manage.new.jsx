import { useEffect, useState } from "react";
import { Form } from '@remix-run/react';
import TextBox from 'devextreme-react/text-box';
import TextArea from 'devextreme-react/text-area';
import Button from 'devextreme-react/button';
import Validator from 'devextreme-react/validator';
import { RequiredRule, RangeRule } from 'devextreme-react/validator';
import { json, redirect } from "@remix-run/node";
import { createProduct } from "../services/products.service"; 

import 'devextreme/dist/css/dx.light.css';
import { Font } from "devextreme-react/cjs/bar-gauge";

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
    const [DxButton, setDxButton] = useState(null);

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

