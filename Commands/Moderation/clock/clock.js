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
      .setName("clock")
      .setDescription("Clock je zelf in of uit")
      .addSubcommand((subcommand) =>
        subcommand
          .setName("in")
          .setDescription("Clock je in")
      ) 
      .addSubcommand((subcommand) =>
      subcommand.setName("uit").setDescription("Clock je zelf uit")
      ),


  };