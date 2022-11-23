const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, WebhookClient, User } = require("discord.js");
const Database = require("../../Schemas/Infractions");
const ms = require("ms");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("inventory")
    .setDescription("Bekijk de info van een persoon")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false)
    .addStringOption(options => options 
        .setName("firstname")
        .setDescription("Voornaam van een karakter ingame")
    ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {

        const { options } = interaction;

        const member = options.getString("firstname")

        var mysql      = require('mysql');
        var connection = mysql.createConnection({
        host     : '185.197.251.22',
        user     : 'u7_RK3GqGajkK',
        password : 'ss9Aullq0Cbftl.MuZe+@xYU',
        database : 's7_OptixRP'
    });
     
    connection.connect();

    connection.query(`SELECT * FROM users WHERE firstname = '${member}'`, function(err, results, field) {  
        if(!results[0]) return interaction.reply({content: "Deze persoon staat niet in de database"})
        if(err) throw err;

        const embed = new EmbedBuilder()
        .setColor("#36393f")
        .setDescription(`
        **VNaam | ANaam:** ${results[0].firstname} ${results[0].lastname}
        **Inventory**: ${results[0].inventory}
        `)

        interaction.reply({embeds: [embed]})
    })


        

    }
}