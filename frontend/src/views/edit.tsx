import React, { useState, useEffect } from 'react';

import Note from '../model/Note';
import { useParams } from 'react-router-dom';


interface EditNoteProps {
    noteId?: number;
}

const EditNote: React.FC<EditNoteProps> = () => {
    let { noteId } = useParams();
  

    return (
        <div>
            <h1>Edit Note {noteId}</h1>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditNote;