# SULYverse AI

A dark, turquoise-accented Arabic-first AI assistant built with Next.js App Router, TypeScript, Tailwind CSS, and the OpenAI API.

## Features
- Responsive Arabic RTL interface
- Starter prompts and new chat control
- Server-side AI API route (API key is not exposed to the browser)
- Curated project knowledge and privacy boundaries in the system prompt
- Clear setup and deployment path

## Run locally
1. Install Node.js 20 or newer.
2. In this folder, run:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local`.
4. Add your API key to `.env.local`:
   ```env
   OPENAI_API_KEY=your_key_here
   OPENAI_MODEL=gpt-4o-mini
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open http://localhost:3000

## Deploy to GitHub and Vercel
1. Create a new GitHub repository and upload/push the project files.
2. In Vercel, select **Add New → Project** and import the repository.
3. In **Project Settings → Environment Variables**, add:
   - `OPENAI_API_KEY` = your private API key
   - `OPENAI_MODEL` = `gpt-4o-mini` (optional)
4. Deploy. If environment variables are added after deployment, redeploy the project.
5. Never commit `.env.local` or share your API key.

## Before public launch
- Add rate limiting / abuse protection to `/api/chat`.
- Add a privacy notice and terms appropriate to your use case.
- Consider authentication or quotas if you expect regular public use.
- Review and update the project knowledge in `app/api/chat/route.ts`; distinguish shipped features from planned ideas.
- Test the deployed app on mobile and desktop.

## Notes
This is a starter implementation. It does not include persistent chat history, user accounts, file uploads, or a retrieval database yet. Conversation messages are held in the current browser session state only and sent to the server for each response.
