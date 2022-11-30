const { EmbedBuilder, WebhookClient } = require('discord.js')


module.exports = {
    name: "messageDelete",

    async execute(message) {
        if(message.author.bot) return;
        const embed = new EmbedBuilder()
        .setTitle(`📕 | Een bericht is verwijderd`)
        .addFields(
            { name: `Bericht Eigenaar`, value: `${message.author}`},
            { name: `Bericht Verwijderd:`, value: `[${message.content}](${message.url})`}
            )
        .setThumbnail(`https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`)
        .setFooter({ text: `Optix Roleplay™ | Berichten Logs`, iconURL: `https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png`})
        .setTimestamp();
                        

        new WebhookClient({
            url: "https://discord.com/api/webhooks/1042545060899737723/6TDJt_X673mRMsiUEwl2KaHhG6vvzzxCLUishgLxXCvZsRQaCGEDTrvd5tUwGl1tA9Tr",
        })
        .send({ embeds: [embed] })
        .catch((err) => {
            console.log(err)
        })
    }

}
