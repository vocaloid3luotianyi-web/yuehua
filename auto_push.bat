@echo off
:loop
echo Auto committing...
git add .
git commit -m "Auto-commit %date% %time%"
git push origin main
timeout /t 1800
goto loop