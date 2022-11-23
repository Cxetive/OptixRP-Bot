const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, WebhookClient, User } = require("discord.js");
const Database = require("../../Schemas/Infractions");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban een persoon uit de discord.")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers    )
    .setDMPermission(false)
    .addUserOption(options => options 
        .setName("persoon")
        .setDescription("Kies een persoon")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("reden")
        .setDescription("de reden voor de kick.")
        .setRequired(false)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {

        const { options, member, guild } = interaction;

        const reason = options.getString("reden") || "Geen reden opgegeven.";

        const target = options.getMember("persoon");
        
        const errorsArray = [];

        const errorsEmbed = new EmbedBuilder()
        .setAuthor({name: "Persoon kon niet gebanned worden."})
        .setColor("Red");
        
        if(!target) return interaction.reply({ 
            content: "Je hebt geen persoon geselecteerd",
            ephemeral: true,
        });
        if(!target.manageable || !target.moderatable)
        errorsArray.push("De bot kan geen dingen aanpassen aan deze persoon..");


        if(member.roles.highest.position < target.roles.highest.position)
        errorsArray.push("De persoon die jij wilt bannen heeft een hogere role dan jou.");
        
        if(errorsArray.length)
        return interaction.reply({
            embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
            ephemeral: true
        });


        const successEmbed = new EmbedBuilder()
        .setColor("#36393f")
        .setDescription([
            `👋 | Iemand is gebanned uit de discord.`,
            `\n`,
            `Moderator: ${member} (${member.id})`,
            `Persoon: ${target} (${target.id})`,
            `Datum: <t:${Math.round(interaction.createdTimestamp / 1000)}>`,
            `Reden: ${reason}`
        ].join(`\n`))

        new WebhookClient({ 
            url: 'https://discord.com/api/webhooks/1034584591354310666/Hfxy5uI6OXK6k-YH23XXAqldVimBFcooLRV1FDerlil_wbHllxBNEnRJq6CV03wVk3ww'
         })
         .send({ embeds: [successEmbed] })
         .catch((err) => {
           console.log(err);
         });;

         guild.members.ban(target)
         .catch(console.error)

         interaction.reply({ 
            content: `${target} is nu gebanned uit de discord.`,
            ephemeral: true,
        })



    }
}