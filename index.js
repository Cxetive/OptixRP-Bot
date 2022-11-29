const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const Ascii = require('ascii-table')
const PG = require('pg')

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
  partials: [User, Message, GuildMember, ThreadMember],
});

client.config = require("./config.json");
client.commands = new Collection();
client.subCommands = new Collection();
client.events = new Collection();

require(`./Handlers/crashHandler.js`)(client, PG, Ascii)

const { connect } = require("mongoose");
connect(client.config.DatabaseURL, {})
.then(() => console.log("The client is now connected to the database."));

const { loadEvents } = require("./Handlers/eventHandler");
loadEvents(client);

client.login(client.config.token)
