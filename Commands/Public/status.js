    const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
    const fivem = require("discord-fivem-api");
    const server = new fivem.DiscordFivemApi("45.140.191.13:25565");

    module.exports = {
        data: new SlashCommandBuilder()
        .setName("status")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDescription("Will repond with pong."),
        async execute(interaction) {
            const { guild, member, message } = interaction;
            
        interaction.reply({embeds: [new EmbedBuilder().setDescription("Informatie aan het ophalen")]})

       
            var interval = setInterval (function () {
            server.getPlayers().then((data) => {
                let result  = [];
                let index = 1;
                for (let player of data) {
                  result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
                }

                if(server.getPlayers()) {
                    const embed = new EmbedBuilder()
                        .setThumbnail(`https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`)
                        .setFooter({ text: `Optix Roleplay™ | Server Status`, iconURL: `https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`})
                        .setColor("#2bff00")
                        .addFields(
                            { name: `**Server Status**`, value: `\`\`\`Online\`\`\``},
                            { name: `**Connect**`, value: `\`\`\`F8 -> connect 45.140.191.13:25565\`\`\``, inline: true},
                            { name: `**Aantal Spelers:**`, value: `\`\`\`${data.length}\`\`\``, inline: true}
                        )
    
                        interaction.editReply({embeds: [embed]});
    
                } else { 
                    const embed = new EmbedBuilder()
                        .setThumbnail(`https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`)
                        .setFooter({ text: `Optix Roleplay™ | Server Status`, iconURL: `https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`})
                        .setColor("#ff0000")
                        .addFields(
                            { name: `**Server Status**`, value: `\`\`\`Offline\`\`\``},
                        )
    
                        interaction.editReply({embeds: [embed]});
                }
            })
           
        }, 1 * 60000);
        }
        
    }
