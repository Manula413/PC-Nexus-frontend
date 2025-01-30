const ProductCard = ({ product }) => {
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(product.rating);

    return (
        <div className="flex flex-col items-center">
            <div className="bg-white shadow-md rounded-xl p-3 w-full relative flex justify-center">
                <img className="w-56 h-56 object-cover rounded-lg" src={product.image} alt={product.name} />
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>
            </div>
            <div className="mt-2 w-full px-2">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-base font-bold text-gray-800">{product.price}</p>
                </div>
                <p className="text-xs text-gray-500">{product.description}</p>
                <div className="flex items-center mt-2">
                    {[...Array(fullStars)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 15.27L15.18 18l-1.64-5.47L18 8.24l-5.53-.45L10 3 7.53 7.79 2 8.24l4.46 4.29L4.82 18z" />
                        </svg>
                    ))}
                    {halfStar && (
                        <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 15.27L15.18 18l-1.64-5.47L18 8.24l-5.53-.45L10 3" fill="white" />
                        </svg>
                    )}
                    {[...Array(emptyStars)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 15.27L15.18 18l-1.64-5.47L18 8.24l-5.53-.45L10 3 7.53 7.79 2 8.24l4.46 4.29L4.82 18z" />
                        </svg>
                    ))}
                    <span className="text-gray-500 text-xs ml-1">({product.reviews})</span>
                </div>
                <button className="mt-3 border border-black text-black px-4 py-1 rounded-lg hover:bg-gray-100 transition duration-300">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
