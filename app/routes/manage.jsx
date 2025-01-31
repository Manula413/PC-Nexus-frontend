import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, Link, Outlet, useParams, useLocation } from "@remix-run/react";
import { getProducts, deleteProduct, createProduct } from "../services/products.service";

export const loader = async () => {
    const products = await getProducts();
    return json({ products });
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const actionType = formData.get("actionType");
    const id = formData.get("id");

    if (actionType === "delete" && id) {
        await deleteProduct(Number(id));
        return redirect("/manage");
    }

    if (actionType === "add") {
        const name = formData.get("name");
        const price = formData.get("price");
        await createProduct({ name, price });
        return redirect("/manage");
    }

    return null;
};

export default function ManageProducts() {
    const { products } = useLoaderData();
    const params = useParams();
    const location = useLocation();
    const isEditing = params.id;
    const isAdding = location.pathname === "/manage/new";

    return (
        <main className="flex gap-6 p-6 flex-wrap lg:flex-nowrap">
            {/* Left Section: Product List */}
            <section className="w-full sm:w-3/5 md:w-2/3 lg:w-1/2 xl:w-2/3 p-4 border-r bg-white shadow-lg rounded-md min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Manage Products</h1>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/manage"
                            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105"
                        >
                            All Products
                        </Link>
                        <Link
                            to="/manage/new"
                            className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition duration-300 transform hover:scale-105"
                        >
                            Add Product
                        </Link>
                    </div>

                </div>


                {/* Scrollable Table */}
                <div className="overflow-y-auto max-h-[800px]">
                    <table className="w-full border-collapse table-auto text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-b py-2 px-4">ID</th>
                                <th className="border-b py-2 px-4">Name</th>
                                <th className="border-b py-2 px-4">Price</th>
                                <th className="border-b py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 border-b">
                                    <td className="py-2 px-4">{product.id}</td>
                                    <td className="py-2 px-4">{product.name}</td>
                                    <td className="py-2 px-4">{product.price}</td>
                                    <td className="py-2 px-4">
                                        <div className="flex gap-4">
                                            <Link to={`/manage/${product.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                                            <Form method="post" className="inline">
                                                <input type="hidden" name="id" value={product.id} />
                                                <input type="hidden" name="actionType" value="delete" />
                                                <button type="submit" className="text-red-600 hover:underline">Delete</button>
                                            </Form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Right Section: Edit/Add Form */}
            <section className="w-full sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-2/3 p-6 bg-white shadow-lg rounded-md mx-auto">
                {isEditing || isAdding ? (
                    <div className="p-4">{/* Keep existing form UI unchanged */}
                        <Outlet />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[300px] text-center gap-4">
                        {/* Icon */}
                        <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z"></path>
                        </svg>
                        <p className="text-gray-500 text-lg">Select a product to edit or add a new one.</p>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <Link
                                to="/manage/new"
                                className="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition duration-300 transform hover:scale-105"
                            >
                                Add Product
                            </Link>
                            <Link
                                to="/manage"
                                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105"
                            >
                                View Products
                            </Link>
                        </div>
                    </div>
                )}
            </section>


        </main>
    );
}




