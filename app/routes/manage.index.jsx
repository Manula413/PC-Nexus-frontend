import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, Link } from "@remix-run/react";
import { getProducts, deleteProduct } from "../services/products.service";

export const loader = async () => {
    const products = await getProducts();
    return json({ products });
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) {
        throw new Response("Invalid ID", { status: 400 });
    }

    await deleteProduct(Number(id));
    return redirect("/manage");  // Ensure the redirect matches the route
};

export default function ProductTable() {
    const { products } = useLoaderData();

    return (
        <div>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border">
                            <td className="border p-2">{product.id}</td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">{product.price}</td>
                            <td className="border p-2">
                                <Link to={`/manage/${product.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>

                                <Form method="post" className="inline-block ml-4">
                                    <input type="hidden" name="id" value={product.id} />
                                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                                </Form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
