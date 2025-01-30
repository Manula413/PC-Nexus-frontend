import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.logo.createMany({
        data: [
          {url: "/logo/logo_6.png"},
          {url: "/logo/logo_7.png"},

          
        ],
    });

    console.log("Database seeded!");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());