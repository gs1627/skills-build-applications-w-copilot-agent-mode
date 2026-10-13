# OctoFit Tracker frontend

React 19 presentation tier built with Vite, React Router, and Bootstrap.

## Run locally

From the repository root:

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

Vite serves the presentation tier on port `5173`. The API is expected on port
`8000`.

## Configure the API URL

The frontend reads `VITE_CODESPACE_NAME` through `import.meta.env`. When running
in Codespaces, define this variable in
`octofit-tracker/frontend/.env.local` using your Codespace name (the value of
`CODESPACE_NAME`):

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Set this variable before starting Vite so API requests use
`https://<CODESPACE_NAME>-8000.app.github.dev`. For local development, leave
`VITE_CODESPACE_NAME` unset; requests safely fall back to
`http://localhost:8000`. Vite environment variables are embedded at startup, so
restart the dev server after changing `.env.local`.

Copy `.env.example` to `.env.local` as a starting point when configuring a
Codespace.

## Data views

The navigation provides activity, leaderboard, team, member, and workout views.
Each view accepts either a plain array response or a paginated response with
`results`, `items`, or `data` collection fields.
