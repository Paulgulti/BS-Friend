'use server'

import { prisma } from "@/lib/prisma";
import { Book, Chapter } from "@/types";
import { unstable_cache } from "next/cache";
import { fetchBooks } from "./fetchBooks";
import { Prisma } from "@prisma/client";

export async function getIdOfBook (book: string) {
    const idOfBook = await prisma.book.findFirst({
        where: {
            slug: book
        },
        select: {
            id: true
        }
    })

    return idOfBook?.id
}

const getCachedChapters = unstable_cache(
    async (book: string) => {
        const id = await getIdOfBook(book)
        const chapters = await prisma.chapter.findMany({
            where: {
                bookId: id
            },
            select: {
                number: true,
                // verses: true,
            }
        });
        return chapters as Chapter[];
    },
    ['books'],
    {
        tags: ['books'],
        revalidate: false
    }
);

export async function fetchChapters(book: string) {
    return await getCachedChapters(book);
        //     const id = await getIdOfBook(book)
        // const chapters = await prisma.chapter.findMany({
        //     where: {
        //         bookId: id
        //     },
        //     select: {
        //         number: true,
        //         verses: true,
        //     }
        // });
        // return chapters as Chapter[];
}