import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function main() {
    // await prisma.user.create({data: {name: "prad2"}})
    const users = await prisma.user.findMany();
    console.log("Users are: ", users);
}

main()
    .catch(e => {
        console.log(e);
    })