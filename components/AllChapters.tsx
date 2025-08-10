'use client'
import { Chapter } from '@/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const AllChapters = ({ chapters, book }: { chapters: Chapter[], book: string }) => {
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const chapterNumber = e.target.value;
        if (chapterNumber) {
            router.push(`/books/${book}/${chapterNumber}`);
        }
    };
    return (
        <div className="w-full mt-2">
            <select
                onChange={handleChange}
                defaultValue=""
                className="border border-red-400 p-2 rounded bg-black "
            >
                <option value="" disabled>
                    Select a chapter
                </option>
                {chapters.map((chapter) => (
                    <option key={chapter.number} value={chapter.number}>
                        {chapter.number}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default AllChapters
