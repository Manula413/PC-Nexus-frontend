import { useState, useEffect } from "react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, Link, Outlet, useParams, useLocation } from "@remix-run/react";
import { DataGrid, Column } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';

const API_BASE_URL = "https://vtossayw6e.execute-api.ap-southeast-2.amazonaws.com/prod/products"; // Update this with your NestJS API URL

/**
 * Fetches the list of products from the NestJS API.
 */
export const loader = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    return json({ products });
  } catch (error) {
    console.error("Error loading products:", error);
    return json({ products: [] });
  }
};

/**
 * Handles form actions for managing products (adding or deleting).
 */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const id = formData.get("id");

  if (actionType === "delete" && id) {
    await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    return redirect("/manage");
  }

  if (actionType === "add") {
    const name = formData.get("name");
    const price = formData.get("price");

    await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });

    return redirect("/manage");
  }

  return null;
};

/**
 * Component for managing products.
 */
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
    <main className={`flex flex-wrap gap-6 p-4 md:p-6 lg:flex-nowrap ${clientClass}`}>
      <section className="w-full lg:w-3/5 xl:w-3/4 p-4 border-r bg-white shadow-lg rounded-md">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Manage Products</h1>
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            <Link to="/manage" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100">
              All Products
            </Link>
            <Link to="/manage/new" className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-100">
              Add Product
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[800px]">
          {isClient && (
            <DataGrid dataSource={products} keyExpr="id" showBorders={true} columnAutoWidth={false}>
              <Column dataField="id" caption="ID" width={80} alignment="center" />
              <Column dataField="name" caption="Name" minWidth={150} flexGrow={1} />
              <Column dataField="price" caption="Price" width={120} alignment="center" />
              <Column caption="Actions" width={200} cellRender={({ data }) => (
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link to={`/manage/${data.id}/edit`} className="text-blue-600 hover:text-blue-800 bg-blue-100 px-4 py-2 rounded-lg">
                    Edit
                  </Link>
                  <Form method="post">
                    <input type="hidden" name="id" value={data.id} />
                    <input type="hidden" name="actionType" value="delete" />
                    <button type="submit" className="text-red-600 hover:text-red-800 bg-red-100 px-4 py-2 rounded-lg">
                      Delete
                    </button>
                  </Form>
                </div>
              )} />
            </DataGrid>
          )}
        </div>
      </section>

      <section className="w-full sm:w-2/5 md:w-1/3 lg:w-2/5 xl:w-1/3 p-6 bg-white shadow-lg rounded-md flex-grow">
        {isEditing || isAdding ? (
          <div className="p-4">
            <Outlet key={params.id} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center gap-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z"></path>
            </svg>
            <p className="text-gray-500 text-lg">Select a product to edit or add a new one.</p>
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
              <Link to="/manage/new" className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-100">
                Add Product
              </Link>
              <Link to="/manage" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100">
                View Products
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
