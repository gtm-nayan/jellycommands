import { command } from 'jellycommands';

export default command({
    name: 'guildtest',
    description: 'A testing command bound to guild not global',

    guilds: ['663140687591768074'],

    dev: true,

    guards: {
        mode: 'blacklist',

        users: ['331151683067445251'],

        roles: ['740589901095108739'],
    },

    run: ({ interaction }) =>
        interaction.reply({ embeds: [{ description: 'as' }] }),
});
