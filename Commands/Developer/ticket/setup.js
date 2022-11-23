const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    ChannelType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const { Types } = require("mongoose");
  
  const ticketSchema = require("../../../Schemas/ticketSchema");

module.exports = {
    subCommand: "tickets.setup",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const channel = interaction.options.getChannel("channel");
        const category = interaction.options.getChannel("category");
        const supportRole = interaction.options.getRole("support-role");
        const description = interaction.options.getString("description");
        const ticketLogs = interaction.options.getChannel("ticket-logs");
  
        const data = await ticketSchema.findOne({
          guildId: interaction.guild.id,
        });
  
        if (data) {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("You have already created the ticket system")
                .addFields({
                  name: "<:channelemoji:1015242699277873192> Channel",
                  value: `<:reply:1015235235195146301> <#${data.channelId}>`,
                  inline: true,
                }),
            ],
            ephemeral: true,
          });
          return;
        }
  
        const newSchema = new ticketSchema({
          _id: Types.ObjectId(),
          guildId: interaction.guild.id,
          channelId: channel.id,
          supportId: supportRole.id,
          categoryId: category.id,
          logsId: ticketLogs.id,
        });
  
        newSchema.save().catch((err) => console.log(err));
  
        interaction
          .reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("Ticket System")
                .setDescription("Successfully setup ticket system!")
                .addFields(
                  {
                    name: "<:channelemoji:1015242699277873192> Channel",
                    value: `<:reply:1015235235195146301>  <#${channel.id}>`,
                    inline: true,
                  },
                  {
                    name: "<:6974orangenwand:1015234855379943454> Support Role",
                    value: `<:reply:1015235235195146301>  <@&${supportRole.id}>`,
                    inline: true,
                  },
                  {
                    name: "<:Discussions:1015242700993351711> Panel Description",
                    value: `<:reply:1015235235195146301>  ${description}`,
                    inline: true,
                  },
                  {
                    name: "Ticket Logs",
                    value: `<#${ticketLogs}>`,
                  }
                ),
            ],
            ephemeral: true,
          })
          .catch(async (err) => {
            console.log(err);
            await interaction.reply({
              content: "An error has occurred...",
            });
          });
  
        const sampleMessage =
          'Welkom bij het support kanaal! Klik op de knop "Create" om een ​​ticket aan te maken en het ondersteuningsteam staat voor je klaar';
  
        client.channels.cache.get(channel.id).send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket System")
              .setDescription(description == null ? sampleMessage : description)
              .setImage(
                "https://cdn.discordapp.com/attachments/1015320163169611870/1016335587344654346/UTS.png"
              ),
          ],
          components: [
            new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId("createTicket")
                .setLabel("🪧 Algemene Vragen")
                .setEmoji("<:ticketbadge:1010601796374364171>")
                .setStyle(ButtonStyle.Primary),
               new ButtonBuilder()
                .setCustomId("createTicket1")
                .setLabel("🪧 Staff Klacten")
                .setEmoji("<:ticketbadge:1010601796374364171>")
                .setStyle(ButtonStyle.Primary),
			 new ButtonBuilder()
                .setCustomId("createTicket2")
                .setLabel("🪧 Speler Klacht")
                .setEmoji("<:ticketbadge:1010601796374364171>")
                .setStyle(ButtonStyle.Primary),
             new ButtonBuilder()
                .setCustomId("createTicket3")
                .setLabel("🪧 Refund")
                .setEmoji("<:ticketbadge:1010601796374364171>")
                .setStyle(ButtonStyle.Primary),
             new ButtonBuilder()
                .setCustomId("createTicket4")
                .setLabel("🪧 Unban Aanvraag")
                .setEmoji("<:ticketbadge:1010601796374364171>")
                .setStyle(ButtonStyle.Primary),
            ),
              new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                .setCustomId("createTicket5")
                .setLabel("🪧 Donatie")
                .setEmoji("<:ticketbadge:1010601796374364171>")
                .setStyle(ButtonStyle.Primary),
              ),
          ],
        });
      
    }
}