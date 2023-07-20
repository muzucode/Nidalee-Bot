"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const CommandValidator_1 = require("./CommandValidator");
const CommandRouter_1 = require("./CommandRouter");
const configuration = {
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES, // Required to receive message events
        // Add more intents if needed, for example:
        // Intents.FLAGS.GUILD_VOICE_STATES, // Required for voice channel related events
    ],
};
const client = new discord_js_1.Client(configuration);
client.on('ready', () => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}`);
});
client.on('messageCreate', (message) => {
    if (CommandValidator_1.CommandValidator.validate(message)) {
        CommandRouter_1.CommandRouter.route(message);
    }
});
client.login(process.env.APPLICATION_TOKEN);
