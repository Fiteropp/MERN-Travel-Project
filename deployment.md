# Deploying the Project on Render

Render simplifies deploying full-stack applications, even when your project resides in a single repository. Here’s how you can deploy both the backend and frontend:

## Step 1: Deploy the Backend (Express App)

1. **Log in to Render**  
   Navigate to [Render.com](https://render.com/) and log in using your preferred method (GitHub, GitLab, etc.).
2. **Create a New Web Service**  
   From the dashboard, click on **"New +"** and select **"Web Service"**.
3. **Connect Your Repository**  
   Select your GitHub/GitLab repository containing the code. You’ll need to authorize Render to access your account if it’s your first time.
4. **Set Deployment Settings**

   - **Service Name:** Choose a name for your backend service.
   - **Language:** Select **Node** since the backend is built with Node.js.
   - **Branch**: Select the branch that contains the production code (main in this case)
   - **Region**: Select the region to have your server in. Let this be the closest to where your users will be.
   - **Root Directory**: Set **server** as the root directory since it contains the code for the backend, and it's where all the commands to run the service will be executed from.
   - **Build Command**:

   ```bash
   rm -rf node_modules package-lock.json && npm install && npm run build
   ```

   It ensures that the installed dependencies that vary depending on the environment are updated to those that are specific to the Linux environment.

   - **Start Command:** Instruct Render to start your Express server:

   ```bash
   npm start
   ```

   Make sure this matches the `start` script in your `server/package.json`.

5. **Instance Type**
   For the instance type, select one according to the features you need and the budget you have. The Hobby plan is sufficient for casual hosting.
6. **Set Environment Variables**  
   Click on the **Environment Variables** section and add any required variables (e.g. `DB_STRING`, `FRONTEND_URL`). Render automatically sets a `PORT` variable; make sure your Express app respects this:

   ```javascript
   const PORT = process.env.PORT || 3005;
   ```

7. **Deploy**  
   Click **Create Web Service**, and Render will begin the deployment. This process may take a few minutes. Once complete, Render will provide a public URL for your backend, such as `https://my-app-backend.onrender.com`.

## Step 2: Deploy the Frontend (React App)

1. **Create a New Static Site**  
   Return to the dashboard and click **"New +"** > **"Static Site"**.
2. **Connect Your Repository**  
   Select the same repository and branch you used for the backend.
3. **Set Deployment Settings**
   - **Name:** Choose a name for your frontend site.
   - **Branch**: Select the branch that contains the production code (main in this case).
   - **Root Directory**: Set the root directory where the react app is (in this case **client/react**), which is where all the commands to run the service will be executed from.
   - **Build Command:** Tell Render how to build your React app:
   ```bash
   npm install && npm run build
   ```
   - **Publish Directory:** Specify the directory where the React build artifacts are located:
   ```
   dist
   ```
4. **Set Environment Variables**  
   Click on the **Environment Variables** section and add any required variables (e.g. `VITE_BACKEND_URL`).
5. **Deploy**  
   Click **Deploy Static Site**, and Render will begin building and deploying your React app. Once complete, you’ll receive a public URL like `https://my-app-frontend.onrender.com`.

## Step 3. Connect the Frontend to the Backend

To enable communication between your React app (frontend) and Express app (backend), follow these steps:

#### Update API Calls in the Frontend

In your React app, replace any API paths to localhost (e.g., `http://localhost:3005/api/hello`) with the full URL of your backend. For example:

```javascript
const response = await fetch(
  "https://mern-travel-project-backend.onrender.com/api/hello"
);
```

You might want to handle this dynamically for easier maintenance:

1. Create a .env file in your React app:

```env
VITE_BACKEND_URL='https://mern-travel-project-backend.onrender.com';
```

2. Use the `VITE_BACKEND_URL` in your API calls:

```javascript
const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hello`);
```

3. In Render, set an environment variable for your React app (`VITE_BACKEND_URL`) with the backend’s URL.

## Step 4. Handle Cross-Origin Resource Sharing (CORS) in the Backend

If your backend serves API requests to your frontend, configure CORS to allow access:

1. Install the `cors` package in your `server` directory:

```bash
npm install cors
```

2. Add frontend URL from your Render deployment of the static site in the `.env` file:

```env
FRONTEND_URL='https://mern-travel-project-frontend.onrender.com';
```

3. Add CORS middleware to your Express app:

```javascript
import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
```

This setup allows requests only from your frontend’s domain.
