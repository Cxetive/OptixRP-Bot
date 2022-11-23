const { EmbedBuilder, WebhookClient } = require("discord.js")
const { JOINLOGS } = require("../../config.json")

module.exports = {
    name: "guildMemberAdd",

    /**
     * @param {Member} member
     */

    execute(member) {
         const { guild } = member;

        console.log(guild)

        const JoinEmbed = new EmbedBuilder()
        .setColor("#36393f")
        .setDescription(
            `🦸🏻‍♀️ ${member.user.username} is zojuist de server binnen gekomen.
            \n
            We hebben nu ${guild.memberCount} mensen in de server`
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/1029076050677870643/1040586689644597258/Naamloodfgs-1.png")
		
        member.roles.add("1042539541829005404")
        new WebhookClient({
            url: JOINLOGS,
        })
        .send({ embeds: [JoinEmbed] })
        .catch((err) => {
            console.log(err)
        })

        
    }
}