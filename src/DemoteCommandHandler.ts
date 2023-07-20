import { Message, GuildMember, Role } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { CommandParserUtility } from "./CommandParserUtility";

export class DemoteCommandHandler extends CommandHandler {
  private static demotionTimers: Map<string, NodeJS.Timeout> = new Map();

  public static async demote(message: Message) {
    let args: string[] = CommandParserUtility.parseArgs(message);

    if (args.length < 2) {
      message.channel.send("Please mention a user to demote.");
      return;
    }

    const durationInMinutes = parseInt(args[2], 10);
    if (isNaN(durationInMinutes) || durationInMinutes <= 0) {
      message.channel.send("Invalid demotion duration. Please provide a positive number of minutes.");
      return;
    }

    const mentionedUser = message.mentions.users.first();
    if (!mentionedUser) {
      message.channel.send("Invalid user mentioned.");
      return;
    }

    const guildMember = message.guild?.members.cache.get(mentionedUser.id);
    if (!guildMember) {
      message.channel.send("User is not a member of this server.");
      return;
    }

    try {
      const originalRoles = guildMember.roles.cache;
      const friendsRole = message.guild?.roles.cache.get("YOUR_FRIENDS_ROLE_ID");
      if (!friendsRole) {
        message.channel.send("Could not find 'Friends' role.");
        return;
      }

      const demotionTimer = DemoteCommandHandler.demotionTimers.get(mentionedUser.id);
      if (demotionTimer) {
        clearTimeout(demotionTimer);
      }

      const rolesToRemove = originalRoles.filter((role) => role.id !== friendsRole.id);
      await guildMember.roles.remove(rolesToRemove);
      await guildMember.roles.add(friendsRole);

      message.channel.send(`Successfully demoted ${guildMember.user.tag} for ${durationInMinutes} minutes.`);

      // Set a timer to restore the user's original roles after the specified duration
      const restoreTimer = setTimeout(async () => {
        await guildMember.roles.remove(friendsRole);
        await guildMember.roles.add([...originalRoles.values()]);
        message.channel.send(`Demotion time for ${guildMember.user.tag} is up. Restored original roles.`);
        DemoteCommandHandler.demotionTimers.delete(mentionedUser.id);
      }, durationInMinutes * 60 * 1000); // Convert minutes to milliseconds

      DemoteCommandHandler.demotionTimers.set(mentionedUser.id, restoreTimer);
    } catch (error) {
      console.error("Error demoting user:", error);
      message.channel.send("An error occurred while demoting the user.");
    }
  }
}
