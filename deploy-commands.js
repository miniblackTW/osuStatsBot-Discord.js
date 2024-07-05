const { REST, Routes } = require('discord.js');
const { CLIENT_ID, TOKEN } = require('./config.json');

const commands = [
    {
        name: 'osu',
        description: 'Get osu! profile of a player',
        options: [
            {
                name: 'player',
                type: 3,
                description: 'Name of the osu! player',
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing slash commands.');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );

        console.log('Reloaded all slash commands.');
    } catch (error) {
        console.error(error);
    }
})();
