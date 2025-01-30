export default function Footer() {
    return (
      <footer className="bg-black text-gray-300 py-6 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          {/* Left Section - Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-white">PC-NEXUS</h2>
            <p className="text-sm text-gray-400">Your one-stop shop for quality computer parts</p>
          </div>
  
          {/* Center Section - Navigation Links */}
          <nav className="flex space-x-6 text-sm mt-4 md:mt-0">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/products" className="hover:text-white transition">Products</a>
            <a href="/about" className="hover:text-white transition">About</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </nav>
  
          {/* Right Section - Copyright */}
          <p className="text-sm text-gray-500 mt-4 md:mt-0">
             {new Date().getFullYear()} PC Parts Shop. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  