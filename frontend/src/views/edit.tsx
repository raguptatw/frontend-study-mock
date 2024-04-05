import React, { useState, useEffect } from 'react';

import Note from '../model/Note';
import { useParams } from 'react-router-dom';

import { Heading, Form, Label, Input,  FormActions, Button, 
    FormControl } from '@twilio-paste/core';

import {
    useQuery,
    QueryClient,
    QueryClientProvider,
    } from '@tanstack/react-query'
    import axios from 'axios';
    
    const backendUrl = 'http://localhost:8000'
    const queryClient = new QueryClient()

interface EditNoteProps {
    noteId?: number;
}

const EditNote: React.FC<EditNoteProps> = () => {
    let { noteId } = useParams();
    let Id = Number(noteId);
    return (
        <QueryClientProvider client={queryClient}>
          <FormNote noteId={Id} />
        </QueryClientProvider>
);

  
};

const FormNote: React.FC<EditNoteProps> = (props)  => {
    
    const handleSave = (e: any) => {
        e.preventDefault();
    };

    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['getNote', props.noteId],
        queryFn: () =>
          axios
            .get(backendUrl + '/api/v1/notes/' + props.noteId)
            .then((res) => res.data),
      });
    
      if (isPending) return (<div>Loading...</div>);
    
      if (error) return (<div>An error has occurred: + {error.message} </div>);

    return (
        <Form >
            <Heading
                as="h3"
                variant="heading20"
                marginBottom='space0'
            >
                Edit Note
            </Heading>
            <FormControl>
                <Label htmlFor="txtTitle" required>Title</Label>
                <Input type="text" id="txtTitle" name="txtTitle" value={data.title}
                placeholder='Add Title' required></Input>
            </FormControl>
            <FormControl>
                <Label htmlFor="txtDescription" required>Description</Label>
                <Input
                    type="text"
                    id="txtDescription"
                    name="txtDescription"
                    placeholder="Add Description"
                    required
                    value={data.description}
                />
            </FormControl>
            <FormActions>
                <Button variant="primary" onClick={handleSave}>Save</Button>
                <a href='/'><Button variant="destructive">Cancel</Button></a>
            </FormActions>
        </Form>
    );
}

export default EditNote;