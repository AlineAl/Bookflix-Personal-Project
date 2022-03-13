import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newLink = await prisma.book.create({
        data: {
            title: "Les Frères Karamazov",
            body: "Grande oeuvre majeure de la philosophie",
            author: "Fiodor Dostoievski",
            genre: "classique",
            date: 1879
        },
    })

    const allBooks = await prisma.book.findMany();
    console.log(allBooks);
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });