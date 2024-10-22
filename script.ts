import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function createUser() {
    await prisma.user.create(
        {
            data: {
                name: `name_${Math.floor(Math.random() * 1000)}`
            }
        }
    )
    console.log("User Created");
}

async function createPost() {
    const user = await prisma.user.findFirst({
        select: {
            id: true
        }
    });
    await prisma.post.create(
        {
            data: {
                title: `How to lose a job ${Math.floor(Math.random() * 1000)}`,
                author: {
                    connect: { id: user?.id}
                }
            }
        }
    )
    console.log("Post created")
}

async function getAllPostsOfUser(userID? : string) {
    const posts = await prisma.user.findUnique({
        where:{
            id : userID
        },
        select: {
            Post : true
        }
    });

    return posts
}

async function main() {
    // await prisma.user.create({data: {name: "prad2"}})
    // await createUser()
    // await createPost()
    const users = await prisma.user.findMany();
    console.log("Users are: ", users);

    const posts = await prisma.post.findMany();
    console.log(`Posts are: `, posts);

    const firstUser = await prisma.user.findFirst();
    const userPosts = await getAllPostsOfUser( firstUser?.id )
    console.log("All posts of first user: ", userPosts);
}

main()
    .catch(e => {
        console.log(e);
    })