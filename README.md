# Spotify connected app

# To run locally follow the below steps

1. Register a Spotify App in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and add `https://localhost:8888/callback` as a Redirect URI in the app settings

2. Create a `.env` file at the root of the project based on `.env.example` and add your unique `CLIENT_ID` and `CLIENT_SECRET` from the Spotify dashboard

3. Ensure [nvm](https://github.com/nvm-sh/nvm) and [npm](https://www.npmjs.com/) are installed globally

4. Install the correct version of Node

   ```
   nvm install
   ```

5. Install dependencies

   ```
   npm install
   ```

6. Run the Vite + React app on <http://localhost:5173> and the Node server on <http://localhost:8888>

   ```
   npm start
   ```

   OR (if concurrently installed)

   ```
   npm run start
   ```