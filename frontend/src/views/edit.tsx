import React, { useState, useEffect } from 'react';

import Note from '../model/Note';

interface EditNoteProps {
    noteId: number;
}

const EditNote: React.FC<EditNoteProps> = ({ noteId }) => {
    const [note, setNote] = useState<Note | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // Fetch the note data from the backend using the noteId
        // and update the state with the fetched note
        const fetchNote = async () => {
            try {
                const response = await fetch(`/api/notes/${noteId}`);
                const data = await response.json();
                setNote(data);
                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };

        fetchNote();
    }, [noteId]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Update the note on the backend with the new title and content
        try {
            await fetch(`/api/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
            console.log('Note updated successfully!');
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    if (!note) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Note</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" value={content} onChange={handleContentChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditNote;