import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function userAuth() {
    const user = await currentUser();
    if (!user) {
        // console.log('user not logged in');
        return null;
    }

    const loggedInUser = await prisma.user.findUnique({
        where: {
            clerkUserId: user.id
        }
    })

    if (loggedInUser) {
        return loggedInUser
    } else {
        const newUser = await prisma.user.create({
            data: {
                clerkUserId: user.id,
                name: user.firstName,
                email: user.emailAddresses[0].emailAddress
            }
        })

        return newUser
    }
}