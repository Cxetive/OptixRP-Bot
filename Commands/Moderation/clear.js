const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, WebhookClient } = require("discord.js");
const Database = require("../../Schemas/Infractions");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Verwijder berichten uit de discord, in een bepaald kanaal")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addNumberOption(options => options 
        .setName("aantal")
        .setDescription("hoeveel personen")
        .setRequired(true)
    )
    .addUserOption(options => options
        .setName("target")
        .setDescription("persoon om zijn berichten te verwijderen.")
        .setRequired(false)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild, member, channel } = interaction;

    const Amount = options.getNumber("aantal");
    const target = options.getMember("target");

    const Messages = await channel.messages.fetch();

    const Response = new EmbedBuilder().setColor("#36393f");

        if (target) {
        let i = 0;
        const filtered = [];
        (await Messages).filter((m) => {
            if (m.author.id === target.id && Amount > i) {
            filtered.push(m);
            i++;
            }
        });

        await channel.bulkDelete(filtered, true).then((messages) => {
            Response.setDescription(
            `🧹 Heeft \`${messages.size}\` verwijderd van ${target}.`
            );
            return interaction
            .reply({
                embeds: [Response],
            })
            .then((m) => {
                setTimeout(() => {
                    interaction.deleteReply().catch(console.error)
                }, 2 * 1000)

            });
        });
        } else {
            await channel.bulkDelete(Amount, true).then((messages) => {
              Response.setDescription(
                `🧹 Ik heb \`${messages.size}\` berichten verwijderd`
              );
              return interaction
                .reply({
                  embeds: [Response],
                  fetchReply: true,
                })
                .then((m) => {
                  setTimeout(() => {
                    interaction.deleteReply().catch((err) => {
                      console.log("Regular Error. Couldn't Delete the Clear Embed.");
                    });
                  }, 2 * 1000);
                });
            });
          }
    }
}