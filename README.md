# Frontend Study Mock Backend

## Prerequisites
- Node.js
- NPM

## Development
`npm install`

`npm run dev`
Server should be running on port 8000.

## Frontend Exam #1 

### Setup React Project in another directory

`npx create-react-app frontend --template typescript`

### Follow Paste Guide to start using Paste Components

`https://paste.twilio.design/introduction/for-engineers/manual-installation`

You only need to run 

`npm install @twilio-paste/core @twilio-paste/icons`

Add the theme provider as shown in the guide to your App.tsx file.

### Create components to display a table of notes.

It is recommended to use `react-query` for making requests.
See quick start here:
https://tanstack.com/query/v3/docs/framework/react/quick-start


Alternatively you can use Fetch API to make requests to `http://localhost:8000/api/v1/notes`

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch


See more details in UI Training Plan Home:
https://wiki.hq.twilio.com/display/UTP/UI+Training+Program+Home

