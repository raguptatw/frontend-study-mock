import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CreateNote from './views/create';
import EditNote from './views/edit';
import ViewNote from './views/view';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Theme } from '@twilio-paste/core/theme';
import { Grid, Column, Box, Heading } from '@twilio-paste/core';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <CreateNote />,
  },
  {
    path: "/edit/:noteId",
    element: <EditNote />,
  },
  {
    path: "/view/:noteId",
    element: <ViewNote />,
  }
]);

root.render(
  <React.StrictMode>

  <Theme.Provider theme="dark">
  <Grid gutter="space20" vertical={[true, false, false]}>
        <Column span={[12, 6, 6]} offset={[0, 2, 2]}>
          <Box padding="space40">
            <Heading as="h1" variant="heading10" marginBottom="space0">
              Notes
            </Heading>
          </Box>
          <Box padding="space20">
          <RouterProvider router={router} />
          </Box>
        </Column>

      </Grid>
    
  </Theme.Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
