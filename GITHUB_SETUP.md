# GitHub Setup Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name:** `dog-boarding-management` (or your choice)
   - **Description:** "Full-stack dog boarding management system for service dog training organization"
   - **Visibility:** Public (recommended for portfolio)
   - **DO NOT** check: Initialize with README, .gitignore, or license
4. Click **"Create repository"**

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Navigate to your project
cd "C:\Users\njyan\OneDrive\Desktop\CNIB project\CNIB_Planning"

# Add GitHub as remote origin (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/dog-boarding-management.git

# Rename branch to main (GitHub's default)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Example:**
If your username is `njyan` and repo is `dog-boarding-management`:
```bash
git remote add origin https://github.com/njyan/dog-boarding-management.git
git branch -M main
git push -u origin main
```

## Step 3: Verify on GitHub

1. Refresh your GitHub repository page
2. You should see all your files!
3. Check that README.md is displaying on the main page

## Important Security Note

✅ **Your `.env` file with passwords is NOT pushed** (thanks to .gitignore)
✅ **Only `.env.example` is pushed** (safe template without real passwords)

Always verify after pushing:
- Check GitHub repo - you should NOT see `backend/.env`
- You SHOULD see `backend/.env.example`

## Future Commits

After making changes to your code:

```bash
# Stage changes
git add .

# Commit with message
git commit -m "Your commit message here"

# Push to GitHub
git push
```

## Adding to Your Resume

### GitHub Repository Link
Add to your resume/LinkedIn:
- **Dog Boarding Management System**
- GitHub: https://github.com/YOUR_USERNAME/dog-boarding-management
- "Full-stack application for managing service dog boarding logistics"

### Project Description
"Developed a full-stack web application using Java Spring Boot and React to manage boarding arrangements for service dogs. Implemented role-based access control, RESTful API, PostgreSQL database with Flyway migrations, and automated boarder matching algorithm."

## Optional: Add a Nice README Badge

Add this to the top of your README.md for a professional touch:

```markdown
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![React](https://img.shields.io/badge/React-18-blue)
```

## Optional: Add License

If you want to add a license, create `LICENSE` file:

```
MIT License

Copyright (c) 2026 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

Or use GitHub's "Add file" → "Create new file" → name it `LICENSE` → choose a license template.

## Troubleshooting

### Error: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Error: "Authentication failed"
- Make sure you're using the correct GitHub username
- You may need to set up a Personal Access Token (GitHub Settings → Developer settings → Personal access tokens)

### Forgot to add .gitignore before first commit
```bash
# Remove .env from tracking (if accidentally committed)
git rm --cached backend/.env
git commit -m "Remove .env from version control"
git push
```

## Next Steps

- ✅ Repository created and code pushed
- 📝 Add project to your resume
- 🔗 Add link to your LinkedIn
- 🚀 Continue building features
- 📊 Commit regularly (shows activity on GitHub profile)
