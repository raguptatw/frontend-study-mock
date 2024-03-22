import React from 'react';

import Note from '../model/Note';

interface ViewProps {
    note: Note;
}

const View: React.FC<ViewProps> = ({ note }) => {
    return (
        <div>
            <h2>{note.title}</h2>
            <p>{note.id}</p>
        </div>
    );
};

export default View;