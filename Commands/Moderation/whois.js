const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, WebhookClient, User } = require("discord.js");
const Database = require("../../Schemas/Infractions");
const ms = require("ms");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("whois")
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
        if(results[0].vip == 1)  results[0].vip = true
        if(results[0].support == 1)  results[0].support = true
        if(results[0].supportplus == 1)  results[0].supportplus = true
        const embed = new EmbedBuilder()
        .setColor("#36393f")
        .setDescription(`
        **VNaam | ANaam:** ${results[0].firstname} ${results[0].lastname}
        **Job**: ${results[0].job}
        **Group**: ${results[0].group}
        **Money**: ${JSON.stringify(results[0].accounts)}
        **VIP**: ${results[0].vip}
        **SUPPOPT**: ${results[0].support}
        **SUPPOPTPLUS**: ${results[0].supportplus}
        `)

        interaction.reply({embeds: [embed]})
    })


        

    }
}