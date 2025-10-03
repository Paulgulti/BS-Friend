'use server'

import { prisma } from "@/lib/prisma"
import { Note } from "@/types";
import { currentUser } from "@clerk/nextjs/server"

export async function fetchNotes() {
    const user = await currentUser();
    if (!user) {
        console.log('user not logged in');
        return null
    }
    const notes: Note[] = await prisma.note.findMany({
        where: {
            authorId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    if (!notes) {
        console.log("User hasn't saved any note yet");
        // return "User hasn't saved any note yet" 
        return null
    } else {
        console.log("Notes fetched from db");
        return notes;
    }
}

export async function fetchFullNote(noteId: number) {
    const note = await prisma.note.findUnique({
        where: {
            id: noteId
        },
    })
    return note;
}