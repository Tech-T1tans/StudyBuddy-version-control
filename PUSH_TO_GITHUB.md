# How to Push to GitHub

This guide will help you push the StudyBuddy project to GitHub.

## Quick Method (Recommended)

I've created a batch script to automate the process. Just run:

```bash
push-to-github.bat
```

This will:
1. Configure git user settings
2. Commit all changes
3. Set the main branch
4. Push to GitHub

## Manual Method

If you prefer to do it manually, follow these steps:

### Step 1: Configure Git (First Time Only)
```bash
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

### Step 2: Check Status
```bash
git status
```

### Step 3: Add All Files (if needed)
```bash
git add .
```

### Step 4: Commit Changes
```bash
git commit -m "Integrated AI Quiz Generator with backend API support"
```

### Step 5: Set Branch and Push
```bash
git branch -M main
git push -u origin main
```

## What's Included in This Push

### ✅ New Features
- **AI Quiz Generator Component** (`src/pages/QuizGenerator.js`)
- **Quiz API Service** (`src/services/quizAPI.js`)
- **Backend Quiz Server** (`quiz-server.js`)
- **Quiz History & Tracking**
- **Multiple Quiz Patterns** (JEE, Boards, Fun)
- **Difficulty Levels**

### ✅ Updated Files
- `package.json` - Added backend dependencies and scripts
- `src/App.js` - Quiz Generator route (already existed)

### ✅ Documentation
- `QUIZ_SETUP.md` - Complete setup guide for the quiz feature
- `PUSH_TO_GITHUB.md` - This file
- `.env.example` - Environment variable template

### ✅ Backup Files
- `src/pages/QuizGenerator_backup.js` - Original quiz generator (backup)

## After Pushing to GitHub

### Setup on Another Machine

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tech-T1tans/StudyBuddy-version-control.git
   cd StudyBuddy-version-control
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   - Copy `.env.example` to `.env`
   - Add your OpenRouter API key

4. **Run the application:**
   ```bash
   npm run dev
   ```

### Important Notes

- The `.env` file is NOT pushed to GitHub (it's in `.gitignore`)
- Each team member needs to create their own `.env` file
- Keep API keys private and secure
- The `node_modules` folder is also not pushed (will be created on `npm install`)

## Verification

After pushing, verify on GitHub:
1. Go to: https://github.com/Tech-T1tans/StudyBuddy-version-control
2. Check if all files are present
3. Verify the commit message
4. Check the README and documentation

## Need Help?

If you encounter issues:

### Authentication Error
```bash
# Use GitHub CLI or Personal Access Token
git config credential.helper store
```

### Push Rejected
```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

### Merge Conflicts
```bash
# Resolve conflicts manually
git status  # See conflicted files
# Edit files to resolve conflicts
git add .
git commit -m "Resolved merge conflicts"
git push origin main
```

## Next Steps

After successful push:
1. ✅ Share repository link with team
2. ✅ Add collaborators on GitHub
3. ✅ Create a README.md for the repository
4. ✅ Set up GitHub Actions (optional)
5. ✅ Create issues/project board for tasks

---

Happy Coding! 🚀
