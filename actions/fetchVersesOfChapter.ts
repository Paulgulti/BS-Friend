'use server'

import { prisma } from "@/lib/prisma"
import { unstable_cache } from "next/cache"
import { getIdOfBook } from "./fetchChapters"

const getCachedVerses = unstable_cache(
    async (book, chapter) => {
        const id = await getIdOfBook(book)
        const verses = await prisma.verse.findMany({
            where: {
                Chapter: {
                    bookId: id,
                    number: chapter,
                }
            },
        });

        return verses;
    },
    ['verses'],
    {
        tags: ['verses'],
        revalidate: false
    }
)

export async function fetchVerses(bookId: string, chapter: number) {
    return await getCachedVerses(bookId, chapter);
}