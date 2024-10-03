echo off
cls
echo Refreshing all slash commands...
node deploy-command.js
echo Starting Bot
node index.js
pause
