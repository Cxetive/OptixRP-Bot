const { EmbedBuilder, WebhookClient } = require('discord.js')


module.exports = {
    name: "messageUpdate",

    async execute(oldMessage, newMessage) {
        console.log(`oldMessage : ${oldMessage.content} || newMessage ${newMessage.content}`)

        const embed = new EmbedBuilder()
        .setTitle(`📕 | [Bericht](${oldMessage.url}) bijgewerkt`)
        .addFields(
            { name: "**Verwijderd door:**", value: `\`\`\`${oldMessage.author}\`\`\``},
            { name: "**Oud Bericht:**", value: `\`\`\`${oldMessage.content}\`\`\``, inline: true},
            { name: "**Nieuw Bericht:**", value: `\`\`\`${newMessage.content}\`\`\``, inline: true}
        )
        .setColor("#ff7b00")
        .setThumbnail(`https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`)
        .setFooter({ text: `Optix Roleplay™ | Berichten Logs`, iconURL: `https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`})
                        

        new WebhookClient({
            url: "https://discord.com/api/webhooks/1042545060899737723/6TDJt_X673mRMsiUEwl2KaHhG6vvzzxCLUishgLxXCvZsRQaCGEDTrvd5tUwGl1tA9Tr",
        })
        .send({ embeds: [embed] })
        .catch((err) => {
            console.log(err)
        })
    }

}
