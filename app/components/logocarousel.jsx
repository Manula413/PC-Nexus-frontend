import { useState, useEffect } from "react";
import { useLoaderData } from "@remix-run/react";

const LogoCarousel = () => {
  const { logos } = useLoaderData(); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  useEffect(() => {
    if (!isClient || logos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [logos, isClient]);

  if (!isClient) return null;

  return (
    <div className="relative flex justify-center items-center w-full overflow-hidden py-6">
      <div className="w-full max-w-5xl overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {logos.concat(logos).map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="w-full sm:w-1/3 flex-shrink-0 flex justify-center px-4"
            >
              <img
                className="h-10 sm:h-8 md:h-10 lg:h-15 transition-transform duration-500 hover:scale-110"
                src={`/images/${logo.url}`}
                alt={`Brand ${logo.id}`}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + logos.length) % logos.length)}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 border-2 border-black text-black p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
      >
        <span className="text-xl">←</span>
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % logos.length)}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 border-2 border-black text-black p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
      >
        <span className="text-xl">→</span>
      </button>
    </div>
  );
};

export default LogoCarousel;
