const { EmbedBuilder, WebhookClient } = require('discord.js')


module.exports = {
    name: "messageDelete",

    async execute(message) {
        const embed = new EmbedBuilder()
        .addFields(
            { name: `**[Bericht](${oldMessage.url}) verwijderd:**`, value: `${oldMessage.author}`},
            { name: "**Verwijderd Bericht**", value: `\`\`\`${message.content}\`\`\``},
        )
        .setThumbnail(`https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`)
        .setFooter({ text: `Optix Roleplay™ | Berichten Logs`, iconURL: `https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`})
        .setFooter();
                        

        new WebhookClient({
            url: "https://discord.com/api/webhooks/1042545060899737723/6TDJt_X673mRMsiUEwl2KaHhG6vvzzxCLUishgLxXCvZsRQaCGEDTrvd5tUwGl1tA9Tr",
        })
        .send({ embeds: [embed] })
        .catch((err) => {
            console.log(err)
        })
    }

}
