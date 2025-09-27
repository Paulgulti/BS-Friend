'use server'

import { prisma } from "@/lib/prisma"
import { userAuth } from "./userAuth"
import { Note } from "@/types"

export async function handleSaveNoteToDB(formData: FormData) {
    const html = (formData.get('html') as string) || ''
    const text = (formData.get('text') as string) || ''
    const noteTitle = (formData.get('noteTitle') as string) || ''
    const user = await userAuth()
    if (!user) {
        console.log('User not found to create note in the db');
        return 'User not found to create note in the db'
    } else {
        const newNote: Note = await prisma.note.create({
            data: {
                title: noteTitle,
                content: html,
                authorId: user.clerkUserId,
            }
        })
        console.log('note saved to db');
        return newNote
    }
}