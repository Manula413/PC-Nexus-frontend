import { useState, useEffect } from "react"; // Import useState and useEffect
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, Link, Outlet, useParams, useLocation } from "@remix-run/react";
import { getProducts, deleteProduct, createProduct } from "../services/products.service";
import { DataGrid, Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css'; // Ensure DevExtreme styles are imported


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

    const [isClient, setIsClient] = useState(false);
    const [clientClass, setClientClass] = useState("");

    useEffect(() => {
        const deviceClasses = [
            "dx-device-phone",
            "dx-device-mobile",
            "dx-device-ios",
            "dx-device-ios-16",
        ];
        setClientClass(deviceClasses.join(" "));
        setIsClient(true);
    }, []);

    return (
        <main className="flex flex-wrap gap-6 p-4 md:p-6 lg:flex-nowrap">
            {/* Left Section: Product List */}
            <section className="w-full lg:w-1/2 xl:w-2/3 p-4 border-r bg-white shadow-lg rounded-md min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] flex flex-col">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Manage Products</h1>
                    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
                        <Link
                            to="/manage"
                            className="w-full sm:w-auto text-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105"
                        >
                            All Products
                        </Link>
                        <Link
                            to="/manage/new"
                            className="w-full sm:w-auto text-center border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-100 transition duration-300 transform hover:scale-105"
                        >
                            Add Product
                        </Link>
                    </div>
                </div>

                {/* Scrollable DataGrid */}
                <div className="overflow-x-auto max-h-[800px]">
                    {isClient && (
                        <DataGrid
                            dataSource={products}
                            keyExpr="id"
                            showBorders={true}
                            className={`w-full min-w-[600px] ${clientClass}`}
                        >
                            <Column
                                dataField="id"
                                caption="ID"
                                width={100}
                                cellRender={({ data }) => (
                                    <div className="text-center">{data.id}</div>
                                )}
                            />
                            <Column
                                dataField="name"
                                caption="Name"
                                width="auto"
                                cellRender={({ data }) => (
                                    <div className="truncate max-w-[200px]">{data.name}</div>
                                )}
                            />
                            <Column
                                dataField="price"
                                caption="Price"
                                width={150}
                                cellRender={({ data }) => (
                                    <div className="text-center">${data.price}</div>
                                )}
                            />
                            <Column
                                cellRender={({ data }) => (
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        <Link
                                            to={`/manage/${data.id}/edit`}
                                            className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg shadow-md transition duration-300"
                                        >
                                            Edit
                                        </Link>
                                        <Form method="post" className="inline">
                                            <input type="hidden" name="id" value={data.id} />
                                            <input type="hidden" name="actionType" value="delete" />
                                            <button
                                                type="submit"
                                                className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg shadow-md transition duration-300"
                                            >
                                                Delete
                                            </button>
                                        </Form>
                                    </div>
                                )}
                                caption="Actions"
                            />
                        </DataGrid>
                    )}
                </div>
            </section>

            {/* Right Section: Edit/Add Form */}
            <section className="w-full lg:w-1/2 xl:w-2/3 p-6 bg-white shadow-lg rounded-md mx-auto">
                {isEditing || isAdding ? (
                    <div className="p-4">
                        <Outlet />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[300px] text-center gap-4">
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

                        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
                            <Link
                                to="/manage/new"
                                className="w-full sm:w-auto text-center border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-100 transition duration-300 transform hover:scale-105"
                            >
                                Add Product
                            </Link>
                            <Link
                                to="/manage"
                                className="w-full sm:w-auto text-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105"
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
