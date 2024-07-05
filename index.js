const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { TOKEN, OSU_API_KEY } = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
    console.log('[OsuStats] Loaded OsuStats v2.0');
    console.log('Made by miniblack_TW')
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'osu') {
        const player = interaction.options.getString('player');

        try {
            const response = await axios.get(`https://osu.ppy.sh/api/get_user`, {
                params: {
                    k: OSU_API_KEY,
                    u: player,
                },
            });

            const data = response.data[0];
            const osuEmbed = new EmbedBuilder()
                .setTitle(`${player}'s osu! profile`)
                .setColor('#00FFFF')
                .addFields(
                    { name: 'Global Ranking', value: `#${data.pp_rank}`, inline: false },
                    { name: 'Country Ranking', value: `#${data.pp_country_rank}`, inline: false },
                    { name: 'PP', value: `${data.pp_raw}`, inline: false },
                    { name: 'Accuracy', value: `${parseFloat(data.accuracy).toFixed(2)}%`, inline: false },
                    { name: 'Level', value: `${parseInt(data.level)}`, inline: false },
                    { name: 'Play Count', value: `${data.playcount} times`, inline: false },
                    { name: 'Ranks', value: '\u200b', inline: false },
                    { name: 'Rank - SS+', value: `${data.count_rank_ssh}`, inline: true },
                    { name: 'Rank - S+', value: `${data.count_rank_sh}`, inline: true },
                    { name: 'Rank - SS', value: `${data.count_rank_ss}`, inline: true },
                    { name: 'Rank - S', value: `${data.count_rank_s}`, inline: true },
                    { name: 'Rank - A', value: `${data.count_rank_a}`, inline: true }
                );

            await interaction.reply({ embeds: [osuEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to get the osu! profile... Try again later');
        }
    }
});

client.login(TOKEN);
