# Environment Setup

This project uses environment configuration files to manage API keys and other sensitive data.

## Initial Setup

1. Copy the environment template files:

    ```bash
    cp src/environments/environment.template.ts src/environments/environment.ts
    cp src/environments/environment.template.ts src/environments/environment.prod.ts
    ```

2. Edit both files and replace `YOUR_TMDB_API_KEY_HERE` with your actual TMDB API key.

3. Get your TMDB API key from: https://www.themoviedb.org/settings/api

## Important Notes

- **Never commit** `environment.ts` or `environment.prod.ts` with real API keys
- These files are already in `.gitignore` to prevent accidental commits
- Only commit `environment.template.ts` with placeholder values
- Each developer needs to set up their own environment files locally

## Environment Files

- `environment.ts` - Used for development (`npm start`)
- `environment.prod.ts` - Used for production builds (`npm run build`)
- `environment.template.ts` - Template file (safe to commit)
