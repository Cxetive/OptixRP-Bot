const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const Database = require("../../Schemas/Infractions");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Restrict a member's ability to communicate.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addUserOption(options => options 
        .setName("target")
        .setDescription("Select the target member.")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("duration")
        .setDescription("Provide a duration for this timeout (1m,1h,1d)")
        .setRequired(true)
    )
    .addStringOption(options => options 
        .setName("reason")
        .setDescription("Provide a reason for this timeout.")
        .setMaxLength(512)    
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild, member } = interaction;

        const target = options.getMember("target");
        const duration = options.getString("duration");
        const reason = options.getString("reason") || "None specified.";

        const errorsArray = [];

        const errorsEmbed = new EmbedBuilder()
        .setAuthor({name: "Persoon kon niet getimeoud worden."})
        .setColor("Red");

        if(!target) return interaction.reply({
            embeds: [errorsEmbed.setDescription("Deze persoon is geleaved.")],
            ephemeral: true
        });

        if(!ms(duration) || ms(duration) > ms("28d"))
        errorsArray.push("Je hebt niet de goede tijd opgegeven of je bent over 28d gegaan");

        if(!target.manageable || !target.moderatable)
        errorsArray.push("Deze persoon kan ik niet een timeout geven.");

        if(member.roles.highest.position < target.roles.highest.position)
        errorsArray.push("De persoon die jij wilt timeouten heeft een hogere role dan jou.");

        if(errorsArray.length)
        return interaction.reply({
            embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
            ephemeral: true
        });

        let timeError = false;
        await target.timeout(ms(duration), reason).catch(async () => {
            timeError = true;
        });

        if(timeError)
        return interaction.reply({
            embeds:[errorsEmbed.setDescription("Kan gebruiker niet time-outen vanwege een ongebruikelijke fout. Kan geen negatieve waarden aannemen")],
            ephemeral: true
        });

        const newInfractionsObject = {
            IssuerID: member.id,
            IssuerTag: member.user.tag,
            Reason: reason,
            Date: Date.now()
        }

        // let userData = await Database.findOne({Guild: guild.id, User: target.id});
        // if(!userData) userData = await Database.create({Guild: guild.id, User: target.id, Infractions: [newInfractionsObject]});
        // else userData.Infractions.push(newInfractionsObject) && await userData.save();


        const successEmebd = new EmbedBuilder()
        .setAuthor({name: "Time-outproblemen", iconURL: guild.iconURL()})
        .setColor("#36393f")
        .setDescription([
            `${target} kreeg een time-out voor **${ms(ms(duration), {long: true})}** door ${member}`,
            `waardoor het totaal van hun overtredingen op **1 punten** komt.`,
            `\n`
            `\*Reden:* ${reason}`
        ].join("\n"));

        return interaction.reply({embeds: [successEmebd]});
    }
}