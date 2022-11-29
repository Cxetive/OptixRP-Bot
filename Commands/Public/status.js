const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("45.140.191.13:25565");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Will repond with pong."),
    async execute(interaction) {
        const { guild, member, message } = interaction;

        const status = server.getServerStatus()
        console.log(`Status : ${status}`)
        if(status === "online") {
            const AantalSpelers = await server.getPlayersOnline()
            const embed = new EmbedBuilder()
                .addFields(
                    { name: `**Server Status**`, value: `🟢 Online`},
                    { name: `**Connect**`, value: `\`\`\`F8 -> connect 45.140.191.13:25565\`\`\``},
                    { name: `**Aantal Spelers:**`, value: `\`\`\`${AantalSpelers}\`\`\``}
                )

                interaction.reply({embeds: [embed]});

        } else { 
            const embed = new EmbedBuilder()
                .addFields(
                    { name: `**Server Status**`, value: `🔴 Offline`},
                )

                interaction.reply({embeds: [embed]});
        }

    }
    
}
