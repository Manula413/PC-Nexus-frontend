import { Links, Link, Meta, Outlet, Scripts, LiveReload } from "@remix-run/react";
import "./tailwind.css";


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
        {/* Header */}
        <header className="bg-gradient-to-r from-green-500 to-green-700 text-white p-4 md:p-6 shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo / Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide text-center md:text-left">
              <span className="text-yellow-300">Tailwind</span> CSS App
            </h1>

            {/* Navigation */}
            <nav className="flex flex-col md:flex-row items-center gap-4 text-lg">
              <Link
                to="/"
                className="text-white hover:text-yellow-300 hover:underline transition duration-200"
              >
                Home
              </Link>
          
              <Link
                to="/products"
                className="text-white hover:text-yellow-300 hover:underline transition duration-200"
              >
                Products
              </Link>
              <Link
                to="/test"
                className="text-white hover:text-yellow-300 hover:underline transition duration-200"
              >
                Test
              </Link>

            </nav>
          </div>
        </header>

        {/* Render the active route's content */}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white text-center py-4 mt-auto text-sm md:text-base">
        <p>2025 Tailwind CSS App. All rights reserved.</p>
        </footer>

        <Scripts />
        
      </body>
    </html>
  );
}
