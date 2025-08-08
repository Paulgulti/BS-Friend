import kjv from '../public/KJV.json';
import { prisma } from '../lib/prisma';
import { slugify } from './slugify';

export interface Bible {
    translation: string;
    books: {
        name: string;
        chapters: {
            chapter: number;
            verses: {
                verse: number;
                text: string;
            }[]
        }[]
    }[]
}


export async function importBible() {
    const bible = kjv as Bible;
    
    for (const book of bible.books) {
        const slug = slugify(book.name);
        const createdBook = await prisma.book.create({
            data: {
                name: book.name,
                slug,
            }
        });

        for (const chapter of book.chapters) {
            const createdChapter = await prisma.chapter.create({
                data: {
                    number: chapter.chapter,
                    bookId: createdBook.id,
                }
            })

            const verseData = chapter.verses.map((verse) => ({
                number: verse.verse,
                text: verse.text,
                chapterId: createdChapter.id
            }))

            await prisma.verse.createMany({
                data: verseData,
                skipDuplicates: true
            })
        }
    }
}