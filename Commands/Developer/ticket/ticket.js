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
    data: new SlashCommandBuilder()
      .setName("tickets")
      .setDescription("Ticket options and setup")
      .addSubcommand((subcommand) =>
        subcommand
          .setName("setup")
          .setDescription("Setup the ticket system")
          .addChannelOption((option) => {
            return option
              .setName("channel")
              .setDescription("channel to send the ticket message in")
              .setRequired(true)
              .addChannelTypes(ChannelType.GuildText);
          })
          .addChannelOption((option) => {
            return option
              .setName("category")
              .setDescription("Category to create the ticket in")
              .setRequired(true)
              .addChannelTypes(ChannelType.GuildCategory);
          })
          .addRoleOption((option) => {
            return option
              .setName("support-role")
              .setDescription("Support role for the ticket")
              .setRequired(true);
          })
          .addChannelOption((option) => {
            return option
              .setName("ticket-logs")
              .setDescription("The channel where ticket logs get sent in.")
              .setRequired(true)
              .addChannelTypes(ChannelType.GuildText);
          })
          .addStringOption((option) => {
            return option
              .setName("description")
              .setDescription("The text to send with the ticket panel")
              .setRequired(false);
          })
      )
      .addSubcommand((subcommand) =>
      subcommand.setName("delete").setDescription("Delete the ticket system")
      ),


  };