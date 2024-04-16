# Principles

- Colocation
- Developer Experience

## Built With

- React (Vite), for the frontend
- NestJS, for the backend
- Postgres (primary database)
- Prisma ORM, which frees you to switch to any other relational database with a few minor changes in the code
- Redis (for caching, session storage and resume statistics)
- Minio (for object storage: to store avatars, resume PDFs and previews)
- Browserless (for headless chrome, to print PDFs and generate previews)
- SMTP Server (to send password recovery emails)
- Sentry (for error tracing and performance monitoring)
- GitHub/Google OAuth (for quickly authenticating users)

### Apps and Packages

- `@repo/portal`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `portal` and `marketing` applications
- `@repo/config`: `tsconfig.json`s used throughout the monorepo and `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`) and global tailwind config.
- `@repo/common`: common constants, utils, components, hooks to use accross apps
- `@repo/database`: `prisma` database.
<!-- - `@repo/auth`: next library for firebase auth. -->
- `@repo/scripts`: scripts for complex use-cases.

### Setup

1. Install Packages: `pnpm install`
2. Setup Vercel Token: `export VERCEL_TOKEN={TOKEN}`
3. Fetch Env Vars: `pnpm env:local`
4. Run App: `pnpm dev`

### Env

This repo uses `vercel/env` to manage environment variables

- Fetch variables to run Apps locally

````sh
### Get env vars
pnpm env:local

### Add env vars
- Get the ENV example for each app
- Go to vercel settings/environment-variables and import the file with updated values

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```
````

# Development Processes

### Vercel: Steps to create projects

#### Create project

1. Import repository
2. Set Project Name: {ORG}-{APP}-{ENV}
3. Set Root directory: To root
4. Set Build command: turbo run build --filter {APP}
5. Set output Directory
6. Set install command
7. Set Buld & Deployment Settings
8. Add git integration (Optional)
9. Set Ignore Build Step
10. Add env vars
11. Set up prod domain
12. Remove pull request comments and commit comments (Optional)
