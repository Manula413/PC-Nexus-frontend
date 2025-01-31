import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.product.createMany({
        data: [
     
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