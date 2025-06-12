# Next.js Starting Project

This project is a small Next.js application using Ant Design tables to display data fetched from [jsonplaceholder](https://jsonplaceholder.typicode.com/). The tables now support in–place editing of their contents.

## Development

Install dependencies and start the development server:

```bash
cd ~/desktop
cd nextjs_starting_project
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to view the app.

Create a `.env.local` file with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

## Features

- Lists of users, posts, todos, comments and albums
- Editable table rows for all lists (login required)
- Delete table rows when logged in
- Search tables by any field
- Editable tags for each row
- User login with sign out option
- Profile page to edit your account details
- Locations table syncs with Supabase in real time

## Build

To create a production build:

```bash
npm run build
npm start
```
