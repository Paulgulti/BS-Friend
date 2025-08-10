'use server'

import { prisma } from "@/lib/prisma"
import { Book } from "@/types";
import { unstable_cache } from "next/cache";

// export const getCachedBooks = unstable_cache(
//     async () => {
//     }
// )

export async function fetchBooks() {
    const books = await prisma.book.findMany({
        select: {
            id: true,
            name: true,
            slug: true
        }
    });
    
    return books as Book[];
    // return await getCachedBooks();
}