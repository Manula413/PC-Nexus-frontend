import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({
        data: [
            {
                "name": "Acer Nitro V ANV15-51-7389",
                "price": "$769.99",
                "description": "15.6\" Gaming Laptop, Intel Core i7-13620H Processor, 16GB DDR5 RAM",
                "image": "/image/laptop/laptop1_img1.jpg",
                "rating": 4.3,
                "reviews": 513,
                "category": "Laptop",
                "brand": "Acer"
              },
              {
                "name": "ASUS ROG Strix G16 G614JV-A574",
                "price": "$1,317.75",
                "description": "16\" Gaming Laptop, 16:10 FHD 165Hz Display, NVIDIA GeForce RTX 4060",
                "image": "/image/laptop/laptop2_img1.jpg",
                "rating": 4.3,
                "reviews": 1533,
                "category": "Laptop",
                "brand": "Asus"
              },
              {
                "name": "MSI Katana 15",
                "price": "$1,249.99",
                "description": "Gaming Laptop: 13th Gen Intel Core i7, GeForce RTX 4000, 17.3\"",
                "image": "/image/laptop/laptop3_img1.jpg",
                "rating": 5,
                "reviews": 421,
                "category": "Laptop",
                "brand": "MSI"
              },
              {
                "name": "MSI Katana 17",
                "price": "$1,299.00",
                "description": "144Hz FHD Display, 32GB DDR5, 1TB NVMe SSD, USB-Type C, Cooler Boost 5, Win11 Home",
                "image": "/image/laptop/laptop4_img1.jpg",
                "rating": 4,
                "reviews": 390,
                "category": "Laptop",
                "brand": "MSI"
              },
              {
                "name": "MSI Stealth GS77",
                "price": "$1,389.11",
                "description": "Intel Core i7-12700H, GeForce RTX 2060, 17.3\" FHD, 144Hz, 16GB DDR5, 1TB NVMe SSD, USB-Type C, Thunderbolt 4, CNC Aluminum, Win 11 Home",
                "image": "/image/laptop/laptop5_img1.jpg",
                "rating": 3.9,
                "reviews": 17,
                "category": "Laptop",
                "brand": "MSI"
              },
              {
                "name": "ASUS TUF A15",
                "price": "$601.43",
                "description": "15.6\" Gaming Laptop, 8GB DDR5 RAM, 512GB PCIe SSD, Full HD",
                "image": "/image/laptop/laptop6_img1.jpg",
                "rating": 5,
                "reviews": 300,
                "category": "Laptop",
                "brand": "Asus"
              },
              {
                "name": "ASUS TUF A16",
                "price": "$1,355.73",
                "description": "16\" FHD+ 16:10 165Hz Display, AMD Ryzen 9 7940HX, NVIDIA GeForce RTX 4070",
                "image": "/image/laptop/laptop7_img1.jpg",
                "rating": 4.7,
                "reviews": 53,
                "category": "Laptop",
                "brand": "Asus"
              },
              {
                "name": "GIGABYTE - G6X",
                "price": "$1,389.11",
                "description": "165Hz 1920x1200 WUXGA, NVIDIA GeForce RTX 4060, Intel i7-13650HX, 1TB SSD, 16GB DDR5 RAM, Windows 11 Home",
                "image": "/image/laptop/laptop8_img1.jpg",
                "rating": 4.2,
                "reviews": 362,
                "category": "Laptop",
                "brand": "Gigabyte"
              },
              {
                "name": "GIGABYTE AORUS 16X",
                "price": "$1,495.00",
                "description": "165Hz 2560x1600 WQXGA, NVIDIA GeForce RTX 4070, Intel i7-14650HX, 1TB SSD, 32GB DDR5 RAM, Windows 11 Home",
                "image": "/image/laptop/laptop9_img1.jpg",
                "rating": 4,
                "reviews": 105,
                "category": "Laptop",
                "brand": "Gigabyte"
              },
              {
                "name": "Acer Predator Helios Neo 16",
                "price": "$999.99",
                "description": "Intel Core i7 13650HX, NVIDIA GeForce RTX 4060, 16\" WUXGA 1920x1200 165Hz G-SYNC Display, 16GB DDR5, 512GB Gen 4 SSD",
                "image": "/image/laptop/laptop10_img1.jpg",
                "rating": 5,
                "reviews": 425,
                "category": "Laptop",
                "brand": "Acer"
              }
        ],
    });

    console.log("Database seeded!");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());