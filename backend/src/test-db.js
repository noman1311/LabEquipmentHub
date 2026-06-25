import prisma from "./prisma/client.js";

async function main() {

    const users = await prisma.user.findMany();

    console.log(users);

}

main()
.then(() => prisma.$disconnect())
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
});