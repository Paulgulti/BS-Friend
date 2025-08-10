import { fetchChapters } from "@/actions/fetchChapters"
import { fetchVerses } from "@/actions/fetchVersesOfChapter"
import AllChapters from "@/components/AllChapters"
import Link from "next/link"

export default async function BooksPageLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{ book: string }>
}) {
    const { book } = await params
    // const idOfBook = await getIdOfBook(book)
    const chapters = await fetchChapters(book)

    return (
        <div className="container px-1 md:px-2 mt-5">
            <Link
                className="border border-red-400 py-1 px-2 cursor-pointer flex items-center w-[150px] gap-2"
                href="/books">
                <span>Back to books</span>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"
                    className="w-4 h-4"
                    >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_trace.3rCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <path d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                </svg>
            </Link>
            <h1 className="text-lg">Book: {book}</h1>
            {/* <div className="flex flex-row flex-wrap w-full gap-1 mt-2">
                {chapters.map(chapter =>
                    <Link
                        key={`/books/${book}/${chapter.number}`}
                        href={`/books/${book}/${chapter.number}`}
                        className='border border-red-400 mb-2 cursor-pointer'>
                        {chapter.number}
                    </Link>
                )}
            </div> */}
            <AllChapters chapters={chapters} book={book} />

            {children}
        </div>
    )
}