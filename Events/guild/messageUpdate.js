const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "messageUpdate",

    async execute(oldMessage, newMessage) {
        console.log(`oldMessage : ${oldMessage.content} || newMessage ${newMessage.content}`)
    }

}
