import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
    Heading, Form, Label, Input, FormActions, Button,
    FormControl, HelpText
} from '@twilio-paste/core';

import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios';

interface IFormInput {
    title: string;
    description: string;
}

const backendUrl = 'http://localhost:8000'
const queryClient = new QueryClient()

const CreateNote: React.FC = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <FormNote />
        </QueryClientProvider>

    );
};

const FormNote = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => {

        console.log(data)

        axios.post(backendUrl + '/api/v1/notes', data)
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            });

    };


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Heading
                as="h3"
                variant="heading20"
                marginBottom='space0'
            >
                Create new Note
            </Heading>
            <FormControl>
                <Label htmlFor="txtTitle" required>Title</Label>
                <Input type="text" id="txtTitle"
                    placeholder='Add Title' required
                    {...register("title", { required: true, maxLength: 20 })}
                ></Input>
            </FormControl>
            <FormControl>
                <Label htmlFor="txtDescription" required>Description</Label>
                <Input
                    type="text"
                    id="txtDescription"
                    placeholder="Add Description" required
                    {...register("description", { required: true, maxLength: 50 })}
                />
            </FormControl>
            <FormActions>
                <Button variant="primary" type='submit'>Submit</Button>
                <a href='/'><Button variant="destructive">Cancel</Button></a>
            </FormActions>
        </Form>
    );
}


export default CreateNote;