import { fetchBooks } from "@/actions/fetchBooks"
import { fetchChapters, getIdOfBook } from "@/actions/fetchChapters"
import { fetchVerses } from "@/actions/fetchVersesOfChapter"
import { cormorantGaramondRegular } from "@/app/layout"
import { notFound } from "next/navigation"

const page = async ({
    params,
}: {
    params: Promise<{ book: string }>
}) => {
    const { book } = await params
    const books = await fetchBooks()
    const chapters = await fetchChapters(book)
    const firstChapter = chapters.filter(chapter => chapter.number === 1)
    const firstChapVerses = await fetchVerses(book, 1)

    const validSlugs = books.find(boo => boo.slug.toString() === book);

    
    if (!validSlugs) {
        notFound();
    }


    return (
        <div className="mt-2 md:mt-3">
            {/* <h1>Book: {book}</h1>
            <div className="flex gap-2">
                {chapters.map(chapter =>
                    <Link
                        key={chapter.number}
                        href={`/books/${book}/${chapter.number}`}
                        className='border border-red-400 mb-2 cursor-pointer'>
                        {chapter.number}
                    </Link>
                )}
            </div> */}

            {/* first chapter */}
            <div className="max-w-[500px] px-1 md:px-2">
                {firstChapter.map(chapter => 
                    <p 
                        key={`/${book}/${chapter.number}`}
                        className="text-lg">Chapter: {chapter.number}</p>
                )}
                <div>
                    {firstChapVerses.map(vers => 
                        <div 
                            key={`/${book}/${vers.chapterId}/${vers.number}`}
                            className={`${cormorantGaramondRegular.className} md:text-xl`}>
                            <p><span className="font-semibold">{vers.number}: &nbsp;</span>{vers.text}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default page;