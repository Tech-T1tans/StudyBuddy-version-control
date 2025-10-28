@echo off
echo ========================================
echo  StudyBuddy - GitHub Push Script
echo ========================================
echo.

echo [1/5] Setting up Git configuration...
git config user.email "soniakv8441@gmail.com"
git config user.name "Tech-T1tans"
echo ✓ Configuration done
echo.

echo [2/5] Pulling existing changes from GitHub...
git pull origin main --allow-unrelated-histories
echo.

echo [3/5] Committing local changes...
git add .
git commit -m "Integrated AI Quiz Generator with backend API support"
echo ✓ Changes committed
echo.

echo [4/5] Setting branch to main...
git branch -M main
echo ✓ Branch set to main
echo.

echo [5/5] Pushing to GitHub...
git push -u origin main
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo ✓ SUCCESS! Code pushed to GitHub
    echo ========================================
    echo.
    echo Repository: https://github.com/Tech-T1tans/StudyBuddy-version-control
    echo.
) else (
    echo ========================================
    echo ✗ FAILED! There was an error
    echo ========================================
    echo.
    echo Try resolving conflicts manually:
    echo 1. Run: git status
    echo 2. Resolve any merge conflicts
    echo 3. Run: git add .
    echo 4. Run: git commit -m "Merged changes"
    echo 5. Run: git push origin main
    echo.
)

pause
