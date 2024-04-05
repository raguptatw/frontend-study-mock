import React from 'react';

import Note from '../model/Note';
import { useParams } from 'react-router-dom';


interface ViewNoteProps {
    noteId?: number;
} 

const ViewNote: React.FC<ViewNoteProps> = () => {
    let { noteId } = useParams();
    return (
        <div>
            <h2>Note: {noteId}</h2>
            
            
        </div>
    );
};

export default ViewNote;