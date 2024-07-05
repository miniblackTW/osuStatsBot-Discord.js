echo off
cls
echo Refreshing all slash commands...
node deploy-commands.js
echo Starting Bot
node index.js
pause
