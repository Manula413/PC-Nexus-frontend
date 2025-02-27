# Welcome to My Remix Project!

This project was created as a learning experience for Remix and serves as the frontend for my NestJS backend.

## Features

- **Product Display**: View a list of products fetched from the backend.
- **Manage Products Page**: Perform CRUD operations (Create, Read, Update, Delete) on products.
- **Tailwind CSS**: Used for styling the application.
- **Prisma & SQLite**: Integrated for database management.

## Development

Run the dev server:

```sh
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

### DIY Hosting

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`:

- `build/server`
- `build/client`

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for a simple and flexible styling experience. You can use any CSS framework you prefer. See the [Vite docs on CSS](https://vitejs.dev/guide/features.html#css) for more information.
