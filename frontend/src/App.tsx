import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Theme} from '@twilio-paste/core/theme';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  return (
    <Theme.Provider theme="default">
      <div className="App">
      </div>
    </Theme.Provider>
  );
}

export default App;
