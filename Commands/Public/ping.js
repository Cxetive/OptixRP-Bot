const { ChatInputCommandInteraction, SlashCommandBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Will repond with pong."),
  /**
   * 
   * @param {ChatInputCommandInteraction} interactin 
   */
  execute(Interactin) {
    Interactin.reply({content: "The Reload Commands Command Worked!!", ephemeral: true});
  }
}