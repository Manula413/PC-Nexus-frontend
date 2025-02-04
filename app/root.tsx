import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import "./tailwind.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
if (typeof document !== "undefined") {
  import("devextreme/dist/css/dx.light.css");
}

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href="data:image/x-icon;base64,AA" />
      </head>
      <body className="bg-gray-100 text-gray-900 font-sans flex flex-col min-h-screen">

        <Header />

        <main className="p-4 md:p-8 flex-grow">
          <Outlet />
        </main>

        <Footer />
        
        <Scripts />
      </body>
    </html>
  );
}
