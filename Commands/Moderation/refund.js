const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, WebhookClient, User } = require("discord.js");
const Database = require("../../Schemas/Infractions");
const ms = require("ms");
const voucher_codes = require("voucher-code-generator");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("refund")
    .setDescription("maak een refund aan")
	.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false)
    .addStringOption(options => options 
        .setName("type")
        .setDescription("Kies uit: money, weapon of item")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("aantal")
        .setDescription("Aantal")
        .setRequired(true)
        )
    .addStringOption(options => options
        .setName("product")
        .setDescription("Product invullen voor wapens of item")
		.setRequired(false)
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {

        const { options } = interaction;
        


        const type = options.getString("type")
        const aantal = options.getString("aantal")
        const product = options.getString("product") || "NULL"


        const key = voucher_codes.generate({
            pattern: "OPTIX-####-####",
          });

        var mysql      = require('mysql');
        var connection = mysql.createConnection({
        host     : '185.197.251.22',
        user     : 'u7_RK3GqGajkK',
        password : 'ss9Aullq0Cbftl.MuZe+@xYU',
        database : 's7_OptixRP'
    });
        
         const code = key.toString().toUpperCase();
        

        
     if(!product) {
         
     }
    connection.connect();
	connection.query(`INSERT INTO refund (type, test2, product,  amount) VALUES ('${type}','${code}','${product}','${aantal}')`, function(err, results, field) {


        if(err) throw err;

        const embed = new EmbedBuilder()
        .setColor("#36393f")
        .setDescription(
            `Type Refund: ${type},
            Aantal: ${aantal}
            Product: ${product}
            Code ingame te gebruiken: /claimrefund ${code}`
        )

        interaction.reply({embeds: [embed]})
    })


        

    }
}