import { Message, MessageReaction, User, TextChannel, ReactionCollector, CollectorOptions, GuildMember, Collection } from "discord.js";
import { CommandHandler } from "./CommandHandler";

export class DraftCommandHandler extends CommandHandler {
  public static async draft(message: Message) {
    this.promptUsersForDraftees(message)
  }

  
  private static async promptUsersForDraftees(message: Message) {
    const drafteeMessage = await message.channel.send(
      "Select all the reactions for each user that is part of the draft."
    );

    let onlineUsers: Collection<string, GuildMember> = new Collection()
    
     
    let users = new Map<string, User>()
    let userListMessage: string = ''
    const emojiList = [
      "🪖", // Smiling face
      "🏴‍☠️", // Smiling face with sunglasses
      "🛵", // Smiling face with halo
      "🧻", // Party popper
      "⛑️", // Glowing star
      "🫒", // Rainbow
      "🦄", // Unicorn
      "🔨", // Pizza
      "🎰", // Hamburger
      "🍆", // Ice cream
      "🌊", // Strawberry
      "🐎", // Banana
      "🚴🏼", // Peach
      "🍟", // Cherries
      "🥇", // Kiwi fruit
      "🥈", // Grapes
    ];
    
    if(message.guild) {
      let emojiIndex = 0
      message.guild.members.cache.forEach(user => {
        userListMessage = userListMessage + user.nickname + ` - ${emojiList[emojiIndex]}\n`
        emojiIndex++
      })
      message.channel.send(userListMessage)
    }

  }
}
