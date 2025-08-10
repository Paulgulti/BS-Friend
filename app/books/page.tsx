// import localFont from 'next/font/local'
import { fetchBooks } from '@/actions/fetchBooks'
import { Book } from '@/types';
import Link from 'next/link';
import React from 'react'
import { lucidaBlackletterRegular, wallauUnzialBold } from '../layout';

const page = async () => {


    const books: Book[] = await fetchBooks();
    const oldTestament: Book[] = books.filter((book, index) => index < 39);
    const newTestament: Book[] = books.filter((book, index) => index >= 39);

    return (
        <div className={`${wallauUnzialBold.className} container mx-auto mt-5`}>
            <Link
                className="border border-red-400 py-1 px-2 cursor-pointer flex items-center w-[150px] gap-2 "
                href="/">
                <span>Back to Home</span>
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className='w-4 h-4'
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="#ffffff"></path> </g>
                </svg>
            </Link>
            <h1 className={`${lucidaBlackletterRegular.className} text-2xl md:text-3xl font-semibold text-center`}>Books</h1>
            <div className='flex gap-4 flex-col mt-3 md:mt-6'>
                <div className='  container mx-auto px-4'>
                    <h2 className={`${lucidaBlackletterRegular.className} text-xl md:text-2xl font-semibold`}>Old Testament</h2>
                    <div className='flex flex-row flex-wrap w-full gap-2 mt-2'>
                        {oldTestament
                            .map(book =>
                                <Link href={`/books/${book.slug}`}
                                    key={book.id}
                                    className='border border-red-400 mb-2 cursor-pointer min-w-auto text-center px-1 md:text-lg'>
                                    {book.name}
                                </Link>
                            )}
                    </div>
                </div>
                <div className=' container mx-auto px-4'>
                    <h2 className={`${lucidaBlackletterRegular.className} text-xl md:text-2xl font-semibold`}>New Testament</h2>
                    <div className='flex flex-row flex-wrap w-full gap-2 mt-2'>
                        {newTestament
                            .map(book =>
                                <Link href={`/books/${book.slug}`}
                                    key={book.id}
                                    className='border border-red-400 mb-2 cursor-pointer min-w-auto text-center px-1 md:text-lg'>

                                    {book.name}
                                </Link>
                            )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page