@echo off
echo Setting up Git configuration...
git config user.email "soniakv8441@gmail.com"
git config user.name "Tech-T1tans"

echo Committing changes...
git commit -m "Integrated AI Quiz Generator with backend API support"

echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo Done!
pause
