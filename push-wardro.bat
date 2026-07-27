@echo off
cd /d "C:\Users\SUFI\Documents\Wardro fnl"

echo Checking Wardro website changes...

git add .

git diff --cached --quiet
if %errorlevel%==0 (
    echo No new changes found.
    pause
    exit /b
)

git commit -m "Update Wardro website %date% %time%"
git push origin main

echo.
echo Changes uploaded successfully.
echo Vercel deployment should start automatically.
pause