"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandValidator_1 = require("./CommandValidator");
const CommandHandler_1 = require("./CommandHandler");
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
        CommandHandler_1.CommandHandler.handle(message);
    }
});
client.login('MTEzMTA1NjA5NDIwNzI5NTU1OQ.GbwEc_.hPB5AYWuRyauypPkZwMuglSZK92Sw6kDoQGifU');
