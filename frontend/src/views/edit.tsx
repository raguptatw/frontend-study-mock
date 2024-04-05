import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Note from '../model/Note';
import { useParams } from 'react-router-dom';

import {
    Heading, Form, Label, Input, FormActions, Button,
    FormControl
} from '@twilio-paste/core';

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

interface IFormInput {
    title: string;
    description: string;
}

const FormNote: React.FC<EditNoteProps> = (props) => {


    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => {

        console.log(data)

        axios.put(backendUrl + '/api/v1/notes/' + props.noteId, data)
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            });

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
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Heading
                as="h3"
                variant="heading20"
                marginBottom='space0'
            >
                Edit Note
            </Heading>
            <FormControl>
                <Label htmlFor="txtTitle" required>Title</Label>
                <Input type="text" id="txtTitle" defaultValue={data.title}
                    placeholder='Add Title' required
                    {...register("title", { required: true, maxLength: 20 })}
                ></Input>
            </FormControl>
            <FormControl>
                <Label htmlFor="txtDescription" required>Description</Label>
                <Input
                    type="text"
                    id="txtDescription"
                    placeholder="Add Description"
                    required
                    defaultValue={data.description}
                    {...register("description", { required: true, maxLength: 50 })}
                />
            </FormControl>
            <FormActions>
                <Button variant="primary" type='submit'>Save</Button>
                <a href='/'><Button variant="destructive">Cancel</Button></a>
            </FormActions>
        </Form>
    );
}

export default EditNote;