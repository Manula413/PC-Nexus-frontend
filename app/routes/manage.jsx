import { useState, useEffect } from "react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, Link, Outlet, useParams, useLocation } from "@remix-run/react";
import { getProducts, deleteProduct, createProduct } from "../services/products.service";
import { DataGrid, Column } from 'devextreme-react/data-grid';

import 'devextreme/dist/css/dx.light.css';
if (typeof document !== "undefined") {
  import("devextreme/dist/css/dx.light.css");
}

/**
 * Loader function to fetch the list of products from the database.
 * @returns {Promise<Response>} A JSON response containing the list of products.
 */
export const loader = async () => {
  const products = await getProducts();
  return json({ products });
};

/**
 * Handles form actions for managing products (adding or deleting).
 * @param {object} params - The action parameters.
 * @param {Request} params.request - The HTTP request object containing form data.
 * @returns {Promise<Response | null>} A redirect response on success or null if no action is performed.
 */
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

/**
 * Component for managing products, including listing, adding, and deleting products.
 * @returns {JSX.Element} The ManageProducts component.
 */
export default function ManageProducts() {
  const { products } = useLoaderData();
  const params = useParams();
  const location = useLocation();
  const isEditing = params.id;
  const isAdding = location.pathname === "/manage/new";

  const [isClient, setIsClient] = useState(false);
  const [clientClass, setClientClass] = useState("");

  /**
   * Effect to determine the client's device class for styling.
   */
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

  const mainClass = `flex flex-wrap gap-6 p-4 md:p-6 lg:flex-nowrap ${clientClass}`;

  return (
    <main className={mainClass}>
      {/* Left Section: Product List */}
      <section className="w-full lg:w-3/5 xl:w-3/4 p-4 border-r bg-white shadow-lg rounded-md min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] flex flex-col">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Manage Products</h1>
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            <Link
              to="/manage"
              className="w-full sm:w-auto text-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
            >
              All Products
            </Link>
            <Link
              to="/manage/new"
              className="w-full sm:w-auto text-center border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 transform hover:scale-105"
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
              columnAutoWidth={false}
              className="w-full min-w-[600px]"
            >
              <Column dataField="id" caption="ID" width={80} alignment="center" />
              <Column
                dataField="name"
                caption="Name"
                minWidth={150}
                flexGrow={1}
                cellRender={({ data }) => (
                  <div className="truncate max-w-[300px]">{data.name}</div>
                )}
              />
              <Column dataField="price" caption="Price" width={120} alignment="center" />
              <Column
                caption="Actions"
                width={200}
                cellRender={({ data }) => (
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Link
                      to={`/manage/${data.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg shadow-md transition duration-300"
                    >
                      Edit
                    </Link>
                    <Form method="post">
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
              />
            </DataGrid>
          )}
        </div>
      </section>

      {/* Right Section: Edit and Add new product Forms*/}
      <section className="w-full sm:w-2/5 md:w-1/3 lg:w-2/5 xl:w-1/3 p-6 bg-white shadow-lg rounded-md flex-grow max-w-full">
        {isEditing || isAdding ? (
          <div className="p-4">
            <Outlet key={params.id} />
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
                className="w-full sm:w-auto text-center border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 transform hover:scale-105"
              >
                Add Product
              </Link>
              <Link
                to="/manage"
                className="w-full sm:w-auto text-center border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
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
