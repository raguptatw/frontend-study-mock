import React, { useState } from 'react';

import { Heading, Form, Label, Input,  FormActions, Button, 
    FormControl } from '@twilio-paste/core';


const CreateNote: React.FC = () => {

    return (
        <FormNote />
    );
};

const FormNote = () => {
    
    const handleCreate = (e: any) => {
        e.preventDefault();
    };

    return (
        <Form >
            <Heading
                as="h3"
                variant="heading20"
                marginBottom='space0'
            >
                Create new Note
            </Heading>
            <FormControl>
                <Label htmlFor="txtTitle" required>Title</Label>
                <Input type="text" id="txtTitle" name="txtTitle" 
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
                />
            </FormControl>
            <FormActions>
                <Button variant="primary" onClick={handleCreate}>Submit</Button>
                <a href='/'><Button variant="destructive">Cancel</Button></a>
            </FormActions>
        </Form>
    );
}


export default CreateNote;