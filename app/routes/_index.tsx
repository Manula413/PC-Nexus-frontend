import { Links, Link, Meta, Scripts } from "@remix-run/react";
import "../tailwind.css";


export default function Index() {
  return (
    <main className="p-8">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-xl md:text-2xl">About Tailwind CSS</h2>
        <p className="text-lg mb-2 sm:text-sm md:text-lg">
          Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file. <br />
          It's <span className="font-bold"> Fast </span>, <span className="font-bold"> flexible </span> and <span className="font-bold"> reliable </span> and <em>with zero-runtime.</em>
        </p>
        <p className="text-lg mb-2 sm:text-sm md:text-lg">
          For more info, check out <a href="https://tailwindcss.com" className="text-blue-500 hover:underline">Tailwind CSS Documentation</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-xl md:text-2xl">Some Facts about Tailwind CSS</h2>
        <ul className="list-disc pl-6 mb-4 sm:text-sm md:text-lg">
          <li>Utility-first CSS framework for rapid UI development</li>
          <li>Highly customizable with a config file for themes, colors, and spacing</li>
          <li>Responsive design made simple with built-in breakpoints</li>
          <li>Comprehensive documentation and examples for every feature</li>
          <li>Works seamlessly with modern build tools like Vite, Webpack, and Parcel</li>
        </ul>

        <ol className="list-decimal pl-6 mb-4 sm:text-sm md:text-lg">
          <li>Install Tailwind CSS via npm or a CDN</li>
          <li>Create a `tailwind.config.js` file for customization</li>
          <li>Include Tailwind's styles in your CSS file</li>
          <li>Use Tailwind's utility classes directly in your HTML or JSX</li>
          <li>Run your build tool to generate the final CSS</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-xl md:text-2xl">Style Forms with Tailwind CSS</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium sm:text-sm">Full Name:</label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium sm:text-sm">Email Address:</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-xl md:text-2xl">Tables</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border">John Doe</td>
              <td className="py-2 px-4 border">35</td>
              <td className="py-2 px-4 border">john.doe@example.com</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-4 border">Jane Smith</td>
              <td className="py-2 px-4 border">28</td>
              <td className="py-2 px-4 border">jane.smith@example.com</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">Michael Johnson</td>
              <td className="py-2 px-4 border">42</td>
              <td className="py-2 px-4 border">michael.johnson@example.com</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-xl md:text-2xl">Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Remix Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Remix</h3>
            <p className="text-gray-700 mb-4">
              Build fast, modern web applications with server-side rendering, seamless data loading, and routing features.
            </p>
            <a
              href="https://remix.run/docs"
              className="text-blue-500 hover:underline"
              aria-label="Learn more about Remix"
            >
              Learn more
            </a>
          </div>

          {/* Tailwind CSS Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Tailwind CSS</h3>
            <p className="text-gray-700 mb-4">
              A utility-first CSS framework that helps you create custom designs without leaving your HTML.
            </p>
            <a
              href="https://tailwindcss.com/docs"
              className="text-blue-500 hover:underline"
              aria-label="Learn more about Tailwind CSS"
            >
              Learn more
            </a>
          </div>

          {/* React Card */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-4">React.js</h3>
            <p className="text-gray-700 mb-4">
              A JavaScript library for building user interfaces. Learn how to create reusable components and manage state efficiently.
            </p>
            <a
              href="https://reactjs.org/"
              className="text-blue-500 hover:underline"
              aria-label="Learn more about React.js"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-xl md:text-2xl">Images</h2>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Cape_may.jpg"
          alt="Beautiful Sunset"
          className="rounded-lg shadow-md mb-4 w-full max-w-lg mx-auto"
        />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-xl md:text-2xl">Buttons</h2>
        <div className="space-x-4 text-center">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Subscribe Now
          </button>
          <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
            Learn More
          </button>
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            Contact Support
          </button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center sm:text-xl md:text-2xl">Alert Box</h2>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p>We are launching a new feature! Stay tuned for more updates.</p>
        </div>
      </section>
    </main>
  );
}
