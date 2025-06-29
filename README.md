# Next.js Starting Project

This project is a small Next.js application using Ant Design tables to display data fetched from [jsonplaceholder](https://jsonplaceholder.typicode.com/). The tables now support in–place editing of their contents.

## Development

Install dependencies and start the development server:

```bash
cd ~/desktop
cd nextjs_starting_project
cp .env.example .env
npm install
npm run dev
```

The `.env` file provides the Supabase credentials used by the app. Adjust these
values if you wish to connect to your own Supabase project.

Open `http://localhost:3000` in your browser to view the app.

## Features

- Lists of users, posts, todos, comments and albums
- Editable table rows for all lists (login required)
- Delete table rows when logged in
- Search tables by any field
- Editable tags for each row
- User login with sign out option
- Profile page to edit your account details

## Build

To create a production build:

```bash
npm run build
npm start
```
