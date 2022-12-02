const { SlashCommandBuilder, EmbedBuilder, WebhookClient, PermissionFlagsBits } = require('discord.js')


module.exports = {
    subCommand: "clock.uit",

    /**
     * @param {ChatInputCommandInteraction} interaction;
     * @param {Client} client;
     */

    async execute(interaction) {

        const { guild, member } = interaction;
        
        

        const embed = new EmbedBuilder()
            .setDescription(`${member} Heeft zich zojuist uitgelockt en is niet meer in dienst als Staff`)
            .setTimestamp()
            .setColor("#49fc03")


            new WebhookClient({ 
                url: 'https://discord.com/api/webhooks/1048188203867308053/8YjB33n1sybzJjFF8oN0wk-yhQtrAP6YPHu8SoaxPY80gEgd3M5DPnr25heoauKzR4vc'
             })
             .send({ embeds: [embed] })
             .catch((err) => {
               console.log(err);
             });;

    }
}