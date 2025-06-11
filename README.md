# Next.js Starting Project

This project is a minimal starter template for building web applications with [Next.js](https://nextjs.org/). It includes example pages that fetch data from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API and display it using components from the [Ant Design](https://ant.design/) library.

## Available pages

The application provides basic pages for the following resources:

- **Users** – lists users with links to their detail pages
- **Posts** – displays posts
- **Comments** – shows comments
- **Todos** – shows todo items
- **Albums** – displays albums

Each page fetches the corresponding data on the server and renders a table component in the browser.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to view the site.

To create an optimized production build, run:

```bash
npm run build
npm start
```

## Project structure

- `app/` – Next.js route handlers, global layout and styles
- `components/` – React components such as table views and the main header
- `public/` – static assets

This template is intended as a learning project or a starting point for further development.
