    const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')
    const fivem = require("discord-fivem-api");
    const server = new fivem.DiscordFivemApi("45.140.191.13:25565");

    module.exports = {
        data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Will repond with pong."),
        async execute(interaction) {
            const { guild, member, message } = interaction;
            var interval = setInterval (function () {
            server.getPlayers().then((data) => {
                let result  = [];
                let index = 1;
                for (let player of data) {
                  result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
                }
                const status = server.getServerStatus()
                console.log(`Status : ${server.getPlayers()}`)
                if(server.getPlayers()) {
                    const embed = new EmbedBuilder()
                        .addFields(
                            { name: `**Server Status**`, value: `\`\`\`Online\`\`\``},
                            { name: `**Connect**`, value: `\`\`\`F8 -> connect 45.140.191.13:25565\`\`\``, inline: true},
                            { name: `**Aantal Spelers:**`, value: `\`\`\`${data.length}\`\`\``, inline: true}
                        )
    
                        interaction.reply({embeds: [embed]});
    
                } else { 
                    const embed = new EmbedBuilder()
                        .addFields(
                            { name: `**Server Status**`, value: `\`\`\`Offline\`\`\``},
                        )
    
                        interaction.reply({embeds: [embed]});
                }
                console.log(result)
            })
           
        }, 1 * 1000);

        }
        
    }
