import { fetchChapters } from "@/actions/fetchChapters"
import { handleSaveNoteToDB } from "@/actions/saveNoteToDB"
import { userAuth } from "@/actions/userAuth"
import AllChapters from "@/components/AllChapters"
import ChatUI from "@/components/ChatUi"
import NoteTaker from "@/components/NoteTaker"
import { prisma } from "@/lib/prisma"
import { Note } from "@/types"
import { auth } from "@clerk/nextjs/server"
import Link from "next/link"

export default async function BooksPageLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<{ book: string }>
}) {

    const { userId } = await auth()
    const { book } = await params
    // const idOfBook = await getIdOfBook(book)
    const chapters = await fetchChapters(book)

    // async function handleSaveNoteToDb(formData: FormData) {
    //     'use server'
    //     const html = (formData.get('html') as string) || ''
    //     const text = (formData.get('text') as string) || ''
    //     const noteTitle = (formData.get('noteTitle') as string) || ''
    //     const user = await userAuth()
    //     if (!user) {
    //         console.log('User not found to create note in the db');
    //         return 'User not found to create note in the db'
    //     } else {
    //         const newNote: Note = await prisma.note.create({
    //             data: {
    //                 title: noteTitle,
    //                 content: html,
    //                 authorId: user.clerkUserId,
    //             }
    //         })
    //         console.log('note saved to db');
    //         return newNote
    //     }
    // }
    // const handleSaveNoteToDb = await handleSaveNoteToDB()

    return (
        <div className="container px-1 md:px-2">
            <div className="bg-sky-600 sticky top-0 z-20 py-2 md:py-3 pl-1">
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
                <div className="flex justify-between ">
                    <div className="flex  flex-col md:flex-row md:items-center  md:py-2">
                        <h1 className="text-lg w-[200px] ">Book: <span>{book}</span></h1>
                        <AllChapters chapters={chapters} book={book} />
                    </div>
                    <NoteTaker  />
                </div>
            </div>

            {children}
            {userId && (
                <ChatUI initialHistory={[]} />
            )}
        </div>
    )
}