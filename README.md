# AniList SvelteKit Authentication Example

Showcase of SSR-friendly authentication for web projects using AniList for authentication.

This is a fairly minimal setup without many unnecessary files. Most of the heavy lifting is in [`src/routes/auth/+server.ts`](src/routes/auth/+server.ts) and [`src/routes/+layout.server.ts`](src/routes/%2Blayout.server.ts).

The only configuration necessary is providing 3 environment variables. These can be found in [`.env.example`](.env.example) and all the values are populated with information obtained by creating an AniList API Client [here](https://anilist.co/settings/developer).

To try it out, simply clone this repository, create a `.env` file with the correct values, and finally run the following commands:

```bash
npm install
npm run dev
```

This will start a dev server at `http://localhost:3000` and you should be able to login with AniList.