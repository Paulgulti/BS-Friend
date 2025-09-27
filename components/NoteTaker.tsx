'use client'

import { useRef, useState } from "react"
import CustomEditor, { CustomEditorHandle } from "./CustomEditor";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { handleSaveNoteToDB } from "@/actions/saveNoteToDB";
import { toast } from "react-toastify";

const NoteTaker = () => {
    const [createNote, setCreateNote] = useState<boolean>(false);
    const [noteTitle, setNoteTitle] = useState<string>('')
    function toggleCreateNoteButton() {
        setCreateNote(!createNote)
    }

    const [editorContent, setEditorContent] = useState('');
    const [editorText, setEditorText] = useState('');
    const editorRef = useRef<CustomEditorHandle | null>(null);
    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    const { userId } = useAuth()

    const onSave = async (formData: FormData) => {
        await handleSaveNoteToDB(formData)
        toast('Note Saved!')
        setEditorContent('')
        setEditorText('')
        setNoteTitle('')
        setCreateNote(false)
    }

    return (
        <div className="relative">
            <button
                className="mr-2 hover:cursor-pointer border rounded-lg py-1 px-2 hover:bg-gray-200"
                onClick={toggleCreateNoteButton}>
                {createNote ? (
                    'X'
                ) : (
                    'Create Note'
                )}
            </button>
            {createNote && userId && (
                <div
                    className="app-container bg-gray-400 border w-[300px] md:w-[500px] absolute top-10 md:top-0 right-full md:mr-2 mr-[-24px] z-50 shadow-lg rounded-lg p-4"
                >
                    <form
                        action={onSave}
                        className="editor-wrapper ">
                        <h1>Note taker</h1>
                        <label htmlFor="noteTitle">Title: &nbsp;<input id="noteTitle" name="noteTitle" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} required type="text" className="border"/></label>
                        <CustomEditor
                            ref={editorRef}
                            value={editorContent}
                            onChange={handleEditorChange}
                            onChangeText={setEditorText}
                            placeholder="Start writing your content here..."
                            readOnly={false}
                        />
                        {/* <form className="mt-2" action={onSave}>
                            <input type="hidden" name="html" value={editorContent} />
                            <input type="hidden" name="text" value={editorText} />
                            <button className="border px-2 py-1" type="submit">Save</button>
                        </form> */}
                        <input type="hidden" name="html" value={editorContent} />
                        <input type="hidden" name="text" value={editorText} />
                        <button className="border px-2 py-1" type="submit">Save</button>
                    </form>
                </div>
            )}
            {createNote && !userId && (
                <div>
                    <SignInButton>Sign in first</SignInButton>
                </div>
            )}
        </div>
    )
}

export default NoteTaker
