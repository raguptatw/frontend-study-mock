import React from 'react';

import Note from '../model/Note';
import { useParams } from 'react-router-dom';

import {
  Box, Heading, DescriptionList,
  DescriptionListSet, DescriptionListTerm, DescriptionListDetails
} from '@twilio-paste/core';

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios';

const backendUrl = 'http://localhost:8000'
const queryClient = new QueryClient()


interface ViewNoteProps {
  noteId?: number;
}

interface DisplayNoteProps {
  noteId: number;
}

const ViewNote: React.FC<ViewNoteProps> = () => {
  let { noteId } = useParams();
  let Id = Number(noteId);

  return (
    <QueryClientProvider client={queryClient}>
      <DisplayNote noteId={Id} />
    </QueryClientProvider>
  );

};

const DisplayNote: React.FC<DisplayNoteProps> = (props) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['getNote', props.noteId],
    queryFn: () =>
      axios
        .get(backendUrl + '/api/v1/notes/' + props.noteId)
        .then((res) => res.data),
  });

  if (isPending) return (<div>Loading...</div>);

  if (error) return (<div>An error has occurred: + {error.message} </div>);

  console.log(data);
  return (
    <div>
      <Box>
        <Heading as="h1" variant="heading10">
          {data.title}
        </Heading>
        <Box display="flex" columnGap="space70" width="size80">
          <Box width="size40">
            <DescriptionList>
              <DescriptionListSet>
                <DescriptionListTerm>Description</DescriptionListTerm>
                <DescriptionListDetails>{data.description}</DescriptionListDetails>
              </DescriptionListSet>
              <DescriptionListSet>
                <DescriptionListTerm>Created At:</DescriptionListTerm>
                <DescriptionListDetails>{new Date(data.createdAt).toLocaleDateString()}</DescriptionListDetails>
              </DescriptionListSet>
              <DescriptionListSet>
                <DescriptionListTerm>Updated At:</DescriptionListTerm>
                <DescriptionListDetails>{new Date(data.updatedAt).toLocaleDateString()}</DescriptionListDetails>
              </DescriptionListSet>
            </DescriptionList>
          </Box>

        </Box>
      </Box>

    </div>
  );
}

export default ViewNote;