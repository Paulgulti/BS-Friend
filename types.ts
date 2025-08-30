export type Book = {
    id: number;
    name: string;
    slug: string;
}

export type Chapter = {
    number: number;
    verses: Verse[];
}

export type Verse = {
    number: number;
    id: number;
    text: string;
    chapterId: number;
}

export type ChatMessage = {
    role: string;
    content: string;
};

export type Note = {
    title: string;
    id: number;
    content: string | null;
    authorId: string;
    createdAt: Date;
}