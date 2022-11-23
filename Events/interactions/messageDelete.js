const { EmbedBuilder, Message, WebhookClient, ReactionUserManager } = require('discord.js')
const { MESSAGELOGS } = require("../../config.json")

module.exports = {
    name: "messageDelete",

    /**
     * @param {Message} message
     */

    execute(message) { 

        const LOG = new EmbedBuilder()
        .setColor("#36393f")
        .setDescription(
            `📕 Een [bericht](${message.url}) van ${message.author.tag}
            is **verwijderd**\n
            **Verwijderd Bericht:**\n ${
                message.content ? message.content : "None"
            }`.slice(0, 4096)
        );

        if (message.attachments.size >= 1) {
            LOG.addFields(
                `Attachments:`,
                `${message.attachments.map((a) => a.url)}`,
                true
            );
        }

        new WebhookClient({
            url: MESSAGELOGS,
        })
        .send({ embeds: [LOG] })
        .catch((err) => {
            console.log(err)
        })
    },
};