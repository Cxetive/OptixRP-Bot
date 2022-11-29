const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("45.140.191.13:25565");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("ja"),
    async execute(client, interaction) {
        const { guild, member, message } = interaction;
        const status = server.getServerStatus()

        console.log(status)
        const AantalSpelers = await server.getPlayersOnline()
        const embed = new EmbedBuilder()
        .addFields(
            { name: `**Server Status**`, value: `🟢 Online`},
            { name: `**Connect**`, value: `\`\`\`F8 -> connect 45.140.191.13:25565\`\`\``},
            { name: `**Aantal Spelers:**`, value: `\`\`\`${AantalSpelers}\`\`\``}
        )
        
    }

    
}
