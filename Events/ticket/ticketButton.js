const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ChannelType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const { Types } = require("mongoose");
  
  const ticketSchema = require("../../Schemas/ticketSchema");
  const userSchema = require("../../Schemas/userSchema");
  
  const { createTranscript } = require("discord-html-transcripts");
  
  module.exports = {
    name: "interactionCreate",
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
      if (interaction.isButton) {
        const { channel, member, guild, customId } = interaction;
  
        switch (customId) {
          case "createTicket":
            const userId = interaction.user.id;
  
            const data = await ticketSchema.findOne({
              guildId: guild.id,
            });
  
            if (!data)
              return await interaction.reply({
                content: "You have not setup the ticket system yet.",
                ephemeral: true,
              });
  
            const channelPermissions = [
              "ViewChannel",
              "SendMessages",
              "AddReactions",
              "ReadMessageHistory",
              "AttachFiles",
              "EmbedLinks",
              "UseApplicationCommands",
            ];
  
            const ticketEmbed = new EmbedBuilder().setColor("Blurple");
  
            interaction.guild.channels
              .create({
                name: `${interaction.user.username}-ticket`,
                type: ChannelType.GuildText,
                parent: data.categoryId,
                permissionOverwrites: [
                  {
                    id: userId,
                    allow: [channelPermissions],
                  },
                  {
                    id: data.supportId,
                    allow: [channelPermissions],
                  },
                  {
                    id: interaction.guild.roles.everyone.id,
                    deny: ["ViewChannel"],
                  },
                ],
              })
              .then(async (channel) => {
                userSchema.create({
                  _id: Types.ObjectId(),
                  guildId: guild.id,
                  ticketId: channel.id,
                  claimed: false,
                  closed: false,
                  deleted: false,
                  creatorId: userId,
                  claimer: null,
                });
  
                channel.setRateLimitPerUser(2);
  
                ticketEmbed
                  .setTitle(`Welcome to ${interaction.channel.name}!`)
                  .setDescription(
                    `Welkom <@${userId}> bij je Ticket. Wacht tot het ondersteuningsteam reageert op uw ticket, leg in de tussentijd uw situatie uit!`
                  );
  
                channel.send({
                  embeds: [ticketEmbed],
                  components: [
                    new ActionRowBuilder().addComponents(
                      new ButtonBuilder()
                        .setCustomId("claimTicket")
                        .setLabel("Claim")
                        .setEmoji("<:4402yesicon:1015234867530829834>")
                        .setStyle(ButtonStyle.Success),
                      new ButtonBuilder()
                        .setCustomId("closeTicket")
                        .setLabel("Close")
                        .setEmoji("<:9061squareleave:1015234841190600756>")
                        .setStyle(ButtonStyle.Success)
                    ),
                  ],
                });
  
                await channel
                  .send({
                    content: `${member}`,
                  })
                  .then((message) => {
                    setTimeout(() => {
                      message.delete().catch((err) => console.log(err));
                    }, 5 * 1000);
                  });
  
                await interaction
                  .reply({
                    embeds: [
                      new EmbedBuilder()
                        .setDescription(
                          `Je hebt successvol een ticket aangemaakt. <#${channel.id}>!`
                        )
                        .setColor("Green"),
                    ],
                    ephemeral: true,
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch(async (err) => {
                console.log(err);
              });
            break;
                
                case "createTicket1":
            const userId1 = interaction.user.id;
  
            const data1 = await ticketSchema.findOne({
              guildId: guild.id,
            });
  
            if (!data1)
              return await interaction.reply({
                content: "You have not setup the ticket system yet.",
                ephemeral: true,
              });
  
            const channelPermissions1 = [
              "ViewChannel",
              "SendMessages",
              "AddReactions",
              "ReadMessageHistory",
              "AttachFiles",
              "EmbedLinks",
              "UseApplicationCommands",
            ];
  
            const ticketEmbed1 = new EmbedBuilder().setColor("Blurple");
  
            interaction.guild.channels
              .create({
                name: `${interaction.user.username}-ticket`,
                type: ChannelType.GuildText,
                parent: "1044177916088569906",
                permissionOverwrites: [
                  {
                    id: userId1,
                    allow: [channelPermissions1],
                  },
                  {
                    id: data1.supportId,
                    allow: [channelPermissions1],
                  },
                  {
                    id: interaction.guild.roles.everyone.id,
                    deny: ["ViewChannel"],
                  },
                ],
              })
              .then(async (channel) => {
                userSchema.create({
                  _id: Types.ObjectId(),
                  guildId: guild.id,
                  ticketId: channel.id,
                  claimed: false,
                  closed: false,
                  deleted: false,
                  creatorId: userId1,
                  claimer: null,
                });
  
                channel.setRateLimitPerUser(2);
  
                ticketEmbed1
                  .setTitle(`Welcome to ${interaction.channel.name}!`)
                  .setDescription(
                    `Welkom <@${userId1}> bij je Ticket. Wacht tot het ondersteuningsteam reageert op uw ticket, leg in de tussentijd uw situatie uit!`
                  );
  
                channel.send({
                  embeds: [ticketEmbed1],
                  components: [
                    new ActionRowBuilder().addComponents(
                      new ButtonBuilder()
                        .setCustomId("claimTicket")
                        .setLabel("Claim")
                        .setEmoji("<:4402yesicon:1015234867530829834>")
                        .setStyle(ButtonStyle.Success),
                      new ButtonBuilder()
                        .setCustomId("closeTicket")
                        .setLabel("Close")
                        .setEmoji("<:9061squareleave:1015234841190600756>")
                        .setStyle(ButtonStyle.Success)
                    ),
                  ],
                });
  
                await channel
                  .send({
                    content: `${member}`,
                  })
                  .then((message) => {
                    setTimeout(() => {
                      message.delete().catch((err) => console.log(err));
                    }, 5 * 1000);
                  });
  
                await interaction
                  .reply({
                    embeds: [
                      new EmbedBuilder()
                        .setDescription(
                          `Je hebt successvol een ticket aangemaakt. <#${channel.id}>!`
                        )
                        .setColor("Green"),
                    ],
                    ephemeral: true,
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch(async (err) => {
                console.log(err);
              });
            break;
            case "createTicket2":
                const userId2 = interaction.user.id;
      
                const data2 = await ticketSchema.findOne({
                  guildId: guild.id,
                });
      
                if (!data2)
                  return await interaction.reply({
                    content: "You have not setup the ticket system yet.",
                    ephemeral: true,
                  });
      
                const channelPermissions2 = [
                  "ViewChannel",
                  "SendMessages",
                  "AddReactions",
                  "ReadMessageHistory",
                  "AttachFiles",
                  "EmbedLinks",
                  "UseApplicationCommands",
                ];
      
                const ticketEmbed2 = new EmbedBuilder().setColor("Blurple");
      
                interaction.guild.channels
                  .create({
                    name: `${interaction.user.username}-ticket`,
                    type: ChannelType.GuildText,
                    parent: "1044180317365358592",
                    permissionOverwrites: [
                      {
                        id: userId2,
                        allow: [channelPermissions2],
                      },
                      {
                        id: data2.supportId,
                        allow: [channelPermissions2],
                      },
                      {
                        id: interaction.guild.roles.everyone.id,
                        deny: ["ViewChannel"],
                      },
                    ],
                  })
                  .then(async (channel) => {
                    userSchema.create({
                      _id: Types.ObjectId(),
                      guildId: guild.id,
                      ticketId: channel.id,
                      claimed: false,
                      closed: false,
                      deleted: false,
                      creatorId: userId2,
                      claimer: null,
                    });
      
                    channel.setRateLimitPerUser(2);
      
                    ticketEmbed2
                      .setTitle(`Welcome to ${interaction.channel.name}!`)
                      .setDescription(
                        `Welkom <@${userId2}> bij je Ticket. Wacht tot het ondersteuningsteam reageert op uw ticket, leg in de tussentijd uw situatie uit!`
                      );
      
                    channel.send({
                      embeds: [ticketEmbed2],
                      components: [
                        new ActionRowBuilder().addComponents(
                          new ButtonBuilder()
                            .setCustomId("claimTicket")
                            .setLabel("Claim")
                            .setEmoji("<:4402yesicon:1015234867530829834>")
                            .setStyle(ButtonStyle.Success),
                          new ButtonBuilder()
                            .setCustomId("closeTicket")
                            .setLabel("Close")
                            .setEmoji("<:9061squareleave:1015234841190600756>")
                            .setStyle(ButtonStyle.Success)
                        ),
                      ],
                    });
      
                    await channel
                      .send({
                        content: `${member}`,
                      })
                      .then((message) => {
                        setTimeout(() => {
                          message.delete().catch((err) => console.log(err));
                        }, 5 * 1000);
                      });
      
                    await interaction
                      .reply({
                        embeds: [
                          new EmbedBuilder()
                            .setDescription(
                              `Je hebt successvol een ticket aangemaakt. <#${channel.id}>!`
                            )
                            .setColor("Green"),
                        ],
                        ephemeral: true,
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch(async (err) => {
                    console.log(err);
                  });
                break;
                case "createTicket3":
                    const userId3 = interaction.user.id;
          
                    const data3 = await ticketSchema.findOne({
                      guildId: guild.id,
                    });
          
                    if (!data3)
                      return await interaction.reply({
                        content: "You have not setup the ticket system yet.",
                        ephemeral: true,
                      });
          
                    const channelPermissions3 = [
                      "ViewChannel",
                      "SendMessages",
                      "AddReactions",
                      "ReadMessageHistory",
                      "AttachFiles",
                      "EmbedLinks",
                      "UseApplicationCommands",
                    ];
          
                    const ticketEmbed3 = new EmbedBuilder().setColor("Blurple");
          
                    interaction.guild.channels
                      .create({
                        name: `${interaction.user.username}-ticket`,
                        type: ChannelType.GuildText,
                        parent: "1044180366824574986",
                        permissionOverwrites: [
                          {
                            id: userId3,
                            allow: [channelPermissions3],
                          },
                          {
                            id: data3.supportId,
                            allow: [channelPermissions3],
                          },
                          {
                            id: interaction.guild.roles.everyone.id,
                            deny: ["ViewChannel"],
                          },
                        ],
                      })
                      .then(async (channel) => {
                        userSchema.create({
                          _id: Types.ObjectId(),
                          guildId: guild.id,
                          ticketId: channel.id,
                          claimed: false,
                          closed: false,
                          deleted: false,
                          creatorId: userId3,
                          claimer: null,
                        });
          
                        channel.setRateLimitPerUser(2);
          
                        ticketEmbed3
                          .setTitle(`Welcome to ${interaction.channel.name}!`)
                          .setDescription(
                            `Welkom <@${userId3}> bij je Ticket. Wacht tot het ondersteuningsteam reageert op uw ticket, leg in de tussentijd uw situatie uit!`
                          );
          
                        channel.send({
                          embeds: [ticketEmbed3],
                          components: [
                            new ActionRowBuilder().addComponents(
                              new ButtonBuilder()
                                .setCustomId("claimTicket")
                                .setLabel("Claim")
                                .setEmoji("<:4402yesicon:1015234867530829834>")
                                .setStyle(ButtonStyle.Success),
                              new ButtonBuilder()
                                .setCustomId("closeTicket")
                                .setLabel("Close")
                                .setEmoji("<:9061squareleave:1015234841190600756>")
                                .setStyle(ButtonStyle.Success)
                            ),
                          ],
                        });
          
                        await channel
                          .send({
                            content: `${member}`,
                          })
                          .then((message) => {
                            setTimeout(() => {
                              message.delete().catch((err) => console.log(err));
                            }, 5 * 1000);
                          });
          
                        await interaction
                          .reply({
                            embeds: [
                              new EmbedBuilder()
                                .setDescription(
                                  `Je hebt successvol een ticket aangemaakt. <#${channel.id}>!`
                                )
                                .setColor("Green"),
                            ],
                            ephemeral: true,
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      })
                      .catch(async (err) => {
                        console.log(err);
                      });
                    break;

                    case "createTicket4":
                        const userId4 = interaction.user.id;
              
                        const data4 = await ticketSchema.findOne({
                          guildId: guild.id,
                        });
              
                        if (!data4)
                          return await interaction.reply({
                            content: "You have not setup the ticket system yet.",
                            ephemeral: true,
                          });
              
                        const channelPermissions4 = [
                          "ViewChannel",
                          "SendMessages",
                          "AddReactions",
                          "ReadMessageHistory",
                          "AttachFiles",
                          "EmbedLinks",
                          "UseApplicationCommands",
                        ];
              
                        const ticketEmbed4 = new EmbedBuilder().setColor("Blurple");
              
                        interaction.guild.channels
                          .create({
                            name: `${interaction.user.username}-ticket`,
                            type: ChannelType.GuildText,
                            parent: "1044180402232905738",
                            permissionOverwrites: [
                              {
                                id: userId4,
                                allow: [channelPermissions4],
                              },
                              {
                                id: data4.supportId,
                                allow: [channelPermissions4],
                              },
                              {
                                id: interaction.guild.roles.everyone.id,
                                deny: ["ViewChannel"],
                              },
                            ],
                          })
                          .then(async (channel) => {
                            userSchema.create({
                              _id: Types.ObjectId(),
                              guildId: guild.id,
                              ticketId: channel.id,
                              claimed: false,
                              closed: false,
                              deleted: false,
                              creatorId: userId4,
                              claimer: null,
                            });
              
                            channel.setRateLimitPerUser(2);
              
                            ticketEmbed4
                              .setTitle(`Welcome to ${interaction.channel.name}!`)
                              .setDescription(
                                `Welkom <@${userId4}> bij je Ticket. Wacht tot het ondersteuningsteam reageert op uw ticket, leg in de tussentijd uw situatie uit!`
                              );
              
                            channel.send({
                              embeds: [ticketEmbed4],
                              components: [
                                new ActionRowBuilder().addComponents(
                                  new ButtonBuilder()
                                    .setCustomId("claimTicket")
                                    .setLabel("Claim")
                                    .setEmoji("<:4402yesicon:1015234867530829834>")
                                    .setStyle(ButtonStyle.Success),
                                  new ButtonBuilder()
                                    .setCustomId("closeTicket")
                                    .setLabel("Close")
                                    .setEmoji("<:9061squareleave:1015234841190600756>")
                                    .setStyle(ButtonStyle.Success)
                                ),
                              ],
                            });
              
                            await channel
                              .send({
                                content: `${member}`,
                              })
                              .then((message) => {
                                setTimeout(() => {
                                  message.delete().catch((err) => console.log(err));
                                }, 5 * 1000);
                              });
              
                            await interaction
                              .reply({
                                embeds: [
                                  new EmbedBuilder()
                                    .setDescription(
                                      `Je hebt successvol een ticket aangemaakt. <#${channel.id}>!`
                                    )
                                    .setColor("Green"),
                                ],
                                ephemeral: true,
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          })
                          .catch(async (err) => {
                            console.log(err);
                          });
                        break;
      
                        case "createTicket5":
                        const userId5 = interaction.user.id;
              
                        const data5 = await ticketSchema.findOne({
                          guildId: guild.id,
                        });
              
                        if (!data5)
                          return await interaction.reply({
                            content: "You have not setup the ticket system yet.",
                            ephemeral: true,
                          });
              
                        const channelPermissions5 = [
                          "ViewChannel",
                          "SendMessages",
                          "AddReactions",
                          "ReadMessageHistory",
                          "AttachFiles",
                          "EmbedLinks",
                          "UseApplicationCommands",
                        ];
              
                        const ticketEmbed5 = new EmbedBuilder().setColor("Blurple");
              
                        interaction.guild.channels
                          .create({
                            name: `${interaction.user.username}-ticket`,
                            type: ChannelType.GuildText,
                            parent: "1044180442330439681",
                            permissionOverwrites: [
                              {
                                id: userId5,
                                allow: [channelPermissions5],
                              },
                              {
                                id: data5.supportId,
                                allow: [channelPermissions5],
                              },
                              {
                                id: interaction.guild.roles.everyone.id,
                                deny: ["ViewChannel"],
                              },
                            ],
                          })
                          .then(async (channel) => {
                            userSchema.create({
                              _id: Types.ObjectId(),
                              guildId: guild.id,
                              ticketId: channel.id,
                              claimed: false,
                              closed: false,
                              deleted: false,
                              creatorId: userId5,
                              claimer: null,
                            });
              
                            channel.setRateLimitPerUser(2);
              
                            ticketEmbed5
                              .setTitle(`Welcome to ${interaction.channel.name}!`)
                              .setDescription(
                                `Welkom <@${userId5}> bij je Ticket. Wacht tot het ondersteuningsteam reageert op uw ticket, leg in de tussentijd uw situatie uit!`
                              );
              
                            channel.send({
                              embeds: [ticketEmbed5],
                              components: [
                                new ActionRowBuilder().addComponents(
                                  new ButtonBuilder()
                                    .setCustomId("claimTicket")
                                    .setLabel("Claim")
                                    .setEmoji("<:4402yesicon:1015234867530829834>")
                                    .setStyle(ButtonStyle.Success),
                                  new ButtonBuilder()
                                    .setCustomId("closeTicket")
                                    .setLabel("Close")
                                    .setEmoji("<:9061squareleave:1015234841190600756>")
                                    .setStyle(ButtonStyle.Success)
                                ),
                              ],
                            });
              
                            await channel
                              .send({
                                content: `${member}`,
                              })
                              .then((message) => {
                                setTimeout(() => {
                                  message.delete().catch((err) => console.log(err));
                                }, 5 * 1000);
                              });
              
                            await interaction
                              .reply({
                                embeds: [
                                  new EmbedBuilder()
                                    .setDescription(
                                      `Je hebt successvol een ticket aangemaakt. <#${channel.id}>!`
                                    )
                                    .setColor("Green"),
                                ],
                                ephemeral: true,
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          })
                          .catch(async (err) => {
                            console.log(err);
                          });
                        break;
      
  
          case "claimTicket":
            const ticketDat = await ticketSchema.findOne({
              guildId: guild.id,
            });
            const userDat = await userSchema.findOne({
              guildId: guild.id,
              ticketId: channel.id,
            });
  
            if (userDat.claimed === true)
              return await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`Ticket is al geclaimed`),
                ],
                ephemeral: true,
              });
  
            if (!member.roles.cache.find((r) => r.id === ticketDat.supportId))
              return await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`Je bent niet toegestaan om dit te doen.`),
                ],
                ephemeral: true,
              });
  
            await userSchema.updateMany(
              {
                ticketId: channel.id,
              },
              {
                claimed: true,
                claimer: member.id,
              }
            );
  
            await interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor("Blue")
                  .setDescription(`Je ticket is geclaimed.`),
              ],
              ephemeral: true
            });
            break;
  
          case "closeTicket":
            const ticketsData = await ticketSchema.findOne({
              guildId: guild.id,
            });
            const usersData = await userSchema.findOne({
              guildId: guild.id,
              ticketId: channel.id,
            });
  
            if (!member.roles.cache.find((r) => r.id === ticketsData.supportId)) {
              return await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`Je bent niet toegestaan om dit te doen.`),
                ],
                ephemeral: true,
              });
            }
  
            if (usersData.closed === true)
              return await interaction.reply({
                embeds: [
                  new EmbedBuilder().setDescription("Deze ticket is al gesloten").setColor("0x2F3136")
                ]
              });
  
            await userSchema.updateMany(
              {
                ticketId: channel.id,
              },
              {
                closed: true,
                closer: member.id,
              }
            );
  
            if (!usersData.closer == member.id)
              return await interaction.reply({
                embeds: [
                  new EmbedBuilder().setDescription("Je bent niet de gene die dit heeft gesloten").setColor("Red")
                ],
                ephemeral: true,
              });
  
            client.channels.cache
              .get(usersData.ticketId)
              .permissionOverwrites.edit(usersData.creatorId, {
                ViewChannel: false,
              });
  
            await interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor("Blue")
                  .setTitle("Ticket Closed")
                  .setDescription(
                    "Het ticket is gesloten, de gebruiker die dit ticket heeft aangemaakt kan het nu niet zien!"
                  )
                  .addFields(
                    {
                      name: "Ticket Aangemaakt",
                      value: `<@${usersData.creatorId}> heeft deze ticket gemaakt`,
                    },
                    {
                      name: "Ticket Gesloten",
                      value: `<@${member.user.id}> heef dit gesloten!`,
                    },
                    {
                      name: "Gesloten om",
                      value: `${new Date().toLocaleString()}`,
                    }
                  )
                  .setFooter({
                    text: `${client.user.tag} door discord.gg/optixrp`,
                    iconURL: client.user.displayAvatarURL(),
                  }),
              ],
              components: [
                new ActionRowBuilder().setComponents(
                  new ButtonBuilder()
                    .setCustomId("reopenTicket")
                    .setEmoji("🔓")
                    .setLabel("Opnieuw openen")
                    .setStyle(ButtonStyle.Primary),
                  new ButtonBuilder()
                    .setCustomId("deleteTicket")
                    .setEmoji("⛔")
                    .setLabel("Delete")
                    .setStyle(ButtonStyle.Danger)
                ),
              ],
            });
            break;
  
          case "reopenTicket":
            const uData = await userSchema.findOne({
              guildId: guild.id,
              ticketId: channel.id,
            });
  
            if (!uData.closed)
              return await interaction.reply({
                embeds: [
                  new EmbedBuilder().setDescription("Deze ticket is niet gesloten").setColor("0x2F3136")
                ]
              });
  
            await userSchema.updateMany(
              {
                ticketId: channel.id,
              },
              {
                closed: false,
              }
            );
  
            interaction.message.edit({
              components: [
                new ActionRowBuilder().setComponents(
                  new ButtonBuilder()
                  .setCustomId("ticket-reopen")
                  .setLabel("Heropenen")
                  .setEmoji("🔓")
                  .setStyle(ButtonStyle.Success)
                  .setDisabled(true),
                  new ButtonBuilder()
                    .setCustomId("ticket-delete")
                    .setLabel("Verwijderen")
                    .setEmoji("⛔")
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true)
                ),
              ],
            });
  
            client.channels.cache
              .get(uData.ticketId)
              .permissionOverwrites.edit(uData.creatorId, {
                ViewChannel: true,
              });
  
            await interaction
              .reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle("Ticket opnieuw geopend!")
                    .setDescription(`opnieuw geopend door ${member.user.tag}`)
                    .setColor("Blue"),
                ],
                ephemeral: true
              })
              .catch((err) => console.log(err));
            break;
          case "deleteTicket":
            const tksData = await ticketSchema.findOne({
              guildId: guild.id,
            });
            const usrData = await userSchema.findOne({
              guildId: interaction.guild.id,
              ticketId: channel.id,
            });
  
            if (!member.roles.cache.find((r) => r.id === tksData.supportId)) {
              return await interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`Je bent niet toegestaan om dit te gebruiken!`),
                ],
                ephemeral: true,
              });
            }
  
            interaction.message.edit({
              components: [
                new ActionRowBuilder().setComponents(
                  new ButtonBuilder()
                    .setCustomId("ticket-close")
                    .setLabel("Close Ticket")
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true)
                ),
              ],
            });
  
            userSchema
              .findOneAndDelete({
                guildId: guild.id,
              })
              .catch((err) => console.log(err));
  
            setTimeout(
              () => channel.delete().catch((err) => console.log(err)),
              5 * 1000
            );
  
            const transcript = await createTranscript(channel, {
              limit: -1,
              returnBuffer: false,
              fileName: `Ticket-${member.user.username}.html`,
            });
  
            await client.channels.cache
              .get(tksData.logsId)
              .send({
                embeds: [
                  new EmbedBuilder()
                    .setTitle("closed ticket.")
                    .setDescription(`Transcript: (download)[${transcript}]`)
                    .addFields(
                      {
                        name: "Closer",
                        value: `<@${usrData.closer}>`
                      },
                      {
                        name: "Ticket Deleted By",
                        value: `<@${member.user.id}>`
                      },
                      {
                        name: "Deleted At",
                        value: `${new Date().toLocaleString()}`
                      }
                    )
                    .setColor("Blue"),
                ],
                files: [transcript],
              })
              .catch((err) => console.log(err));
  
            await interaction
              .reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle("Ticket Gesloten")
                    .setDescription(`Verwijderd door ${member.user.tag}`)
                    .addFields({
                      name: "Time",
                      value: "Ticket wordt verwijderd in 5 seconden..",
                    })
                    .setColor("Blue"),
                ],
              })
              .catch((err) => console.log(err));
  
            break;
          default:
            break;
        }
      }
    },
  };