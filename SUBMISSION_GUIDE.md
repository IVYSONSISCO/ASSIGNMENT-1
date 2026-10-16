# Push, Deploy and Submit

## 1. Push to a new GitHub repository (without node_modules)
1. Create a new **public** repository on https://github.com/new (do NOT add a README, it already exists).
2. In the project folder run:
```bash
git init
git add .
git commit -m "Initial commit: Student Management System"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/student-management-system.git
git push -u origin main
```
3. `.gitignore` already excludes `node_modules`, `dist` and `.env`. Confirm on GitHub that there is no `node_modules` folder.

## 2. Deploy on Vercel (recommended)
1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New → Project**, pick your repository, click **Import**.
3. Vercel detects **Vite** automatically (Build command `npm run build`, Output `dist`). Click **Deploy**.
4. Copy the live URL and paste it into README.md, then commit and push again.

No `vercel.json` is needed: this is a single-page app with no extra routes.

*Netlify alternative:* New site from Git → choose repo → Build command `npm run build`, Publish directory `dist` → Deploy.

## 3. Pre-submission checklist
- [ ] Repository is **public** and opens in a private/incognito window
- [ ] No `node_modules` or `dist` folder in the repo
- [ ] README has the real live URL and GitHub URL
- [ ] Live URL loads without errors (check the browser console)
- [ ] Add, Edit and Delete all work on the live site
- [ ] Data survives a refresh on the live site
- [ ] Mobile layout checked on a phone
- [ ] `npm install` then `npm run dev` works from a fresh clone
