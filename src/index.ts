import 'dotenv/config'
import { Client, Intents, Message, TextChannel } from 'discord.js';
import { CommandValidator } from './CommandValidator';
import { CommandRouter } from './CommandRouter';

const configuration = {
  intents: [
    Intents.FLAGS.GUILDS, // Required to receive guild events like 'ready'
    Intents.FLAGS.GUILD_MESSAGES, // Required to receive message events
    // Add more intents if needed, for example:
    // Intents.FLAGS.GUILD_VOICE_STATES, // Required for voice channel related events
  ],
};

const client = new Client(configuration);

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});


client.on('messageCreate', (message: Message) => {
  if(CommandValidator.validate(message)) {
    CommandRouter.route(message)
  }
});

client.login(process.env.APPLICATION_TOKEN);
