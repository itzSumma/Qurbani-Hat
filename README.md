This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment Variables

This project requires environment variables for auth configuration.

For local development, you can create a `.env.local` file with values such as:

```env
MONGODB_URI=your-mongodb-connection-string
BETTER_AUTH_URL=http://localhost:3000/api/auth
NEXT_PUBLIC_AUTH_URL=http://localhost:3000/api/auth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

The `.env.example` file is only a sample and is not required to deploy to Vercel.
On Vercel, set these variables in your project settings instead of committing a local `.env` file.

When deployed, set `BETTER_AUTH_URL` and `NEXT_PUBLIC_AUTH_URL` to your Vercel app URL plus `/api/auth`, for example:

```env
BETTER_AUTH_URL=https://your-app.vercel.app/api/auth
NEXT_PUBLIC_AUTH_URL=https://your-app.vercel.app/api/auth
```

If you do not use Google sign-in, you can leave the Google values blank.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
