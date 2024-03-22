import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Table, TBody, THead, Tr, Td, Th, Box, FormActions } from '@twilio-paste/core';
import { Button } from '@twilio-paste/core/button';
import { Input } from '@twilio-paste/core/input';
import { Label } from '@twilio-paste/core/label';
import Note from './model/Note';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios';

const backendUrl = 'http://localhost:8000'
const queryClient = new QueryClient()


function App() {
  return (
            <QueryClientProvider client={queryClient}>
              <Notes />
            </QueryClientProvider>
  );
}

const Notes = () => {

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['getNotes'],
    queryFn: () =>
      axios
        .get(backendUrl + '/api/v1/notes')
        .then((res) => res.data),
  });

  if (isPending) return (<div>Loading...</div>);

  if (error) return (<div>An error has occurred: + {error.message} </div>);
  
  return (
    <><Table>
      <THead>
        <Tr>
          <Th>Title</Th>
          <Th>Description</Th>
          <Th>Created At</Th>
          <Th>Updated At</Th>
          <Th>Actions</Th>
        </Tr>
      </THead>
      <TBody>
        { data.items.map((note: Note) => (
          <Tr key={note.id}>
            <Td>{note.title}</Td>
            <Td>{note.description}</Td>
            <Td>{new Date(note.createdAt).toLocaleDateString()}</Td>
            <Td>{new Date(note.updatedAt).toLocaleDateString()}</Td>
            <Td>
              <FormActions>
              <Button variant="primary">View</Button>
              <Button variant="secondary">Edit</Button>
              <Button variant="destructive">Delete</Button>
              </FormActions>
            </Td>
          </Tr>
        
        ))}
       
      </TBody>
    </Table>
    <Box padding="space40">
     <FormActions>
      <Button variant="primary">Create Note</Button>
      </FormActions>
    </Box>
  </>
  );
};


export default App;
