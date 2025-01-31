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
        <main className="flex gap-6 p-6 flex-wrap lg:flex-nowrap"> {/* flex-wrap for small devices, flex-nowrap for large screens */}
            {/* Left Section: Product List */}
            <section className="w-full sm:w-3/5 md:w-2/3 lg:w-1/2 xl:w-2/3 p-4 border-r bg-white shadow-lg rounded-md min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] flex flex-col">
                <h1 className="text-3xl font-semibold mb-4 text-gray-800">Manage Products</h1>
                <nav className="flex gap-6 mb-6">
                    <Link to="/manage" className="text-blue-600 hover:underline">All Products</Link>
                    <Link to="/manage/new" className="text-green-600 hover:underline">Add Product</Link>
                </nav>

                {/* Scrollable Table */}
                <div className="overflow-y-auto max-h-[800px]"> {/* Set a max height for scroll */}
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
            <section className="w-full sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-2/3 p-4 bg-white shadow-lg rounded-md flex flex-col mx-auto">
                {isEditing || isAdding ? <Outlet /> : <p className="text-gray-500">Select a product to edit or add a new one.</p>}
            </section>
        </main>
    );
}




