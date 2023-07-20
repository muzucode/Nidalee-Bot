import { Message, MessageReaction, User, TextChannel, ReactionCollector, CollectorOptions } from "discord.js";
import { CommandHandler } from "./CommandHandler";

export class DraftCommandHandler extends CommandHandler {
  public static async draft(message: Message) {
    try {
      const {completionCollector, drafteesCollector} = await this.promptUsersForDraftees(message);
      console.log(drafteesCollector)
      console.log(drafteesCollector)
      console.log(drafteesCollector)
      const team1Captain = await this.promptForTeamCaptain(message, "Team 1");
      const team2Captain = await this.promptForTeamCaptain(message, "Team 2");

      const draftees = drafteesCollector.collected.map((reaction: MessageReaction) => reaction.users.cache.last()).filter(Boolean); // Filter out undefined values
      const team1: User[] = [];
      const team2: User[] = [];
      let currentTeam = "Team 1";

      const draftMessage = await this.presentDraftees(message.channel as TextChannel, draftees as User[]);

      drafteesCollector.on("collect", (reaction, user) => {
        if (!user || user === team1Captain || user === team2Captain) return;

        if (currentTeam === "Team 1") {
          team1.push(user);
          currentTeam = "Team 2";
        } else {
          team2.push(user);
          currentTeam = "Team 1";
        }

        reaction.users.remove(user.id);
        this.updateDraftRosters(draftMessage, team1, team2);
      });
    } catch (error) {
      console.error("Error in draft command:", error);
      message.channel.send("An error occurred during the draft.");
    }
  }

  
  private static async promptUsersForDraftees(message: Message): Promise<{completionCollector: ReactionCollector, drafteesCollector: ReactionCollector}> {
    const drafteeMessage = await message.channel.send(
      "React to this message to be added to the pool of selectable draftees.\nOnce all are selected, press ✅ to confirm."
    );

    await drafteeMessage.react("✅");

    const filter = (reaction: MessageReaction, user: User) =>
      reaction.emoji.name === "✅" && user.id === message.author.id;

    return {
      completionCollector: drafteeMessage.createReactionCollector({ filter, time: 60000 }),
      drafteesCollector: drafteeMessage.createReactionCollector({ time: 60000 })
    }
  }

  private static async promptForTeamCaptain(message: Message, teamName: string): Promise<User | undefined> {
    await message.channel.send(`Mention the captain for ${teamName}.`);

    const captainCollector = message.channel.createMessageCollector({
      filter: (m) => m.mentions.users.size > 0 && m.author.id === message.author.id,
      max: 1,
      time: 60000,
    });

    return new Promise<User | undefined>((resolve) => {
      captainCollector.on("collect", (message) => {
        const captain = message.mentions.users.first();
        resolve(captain);
      });

      captainCollector.on("end", () => {
        resolve(undefined);
      });
    });
  }

  private static async presentDraftees(channel: TextChannel, draftees: User[]): Promise<Message> {
    const drafteesList = draftees.map((draftee) => `:white_check_mark: ${draftee.username}`).join("\n");
    return channel.send(`**Draftees:**\n${drafteesList}`);
  }

  private static updateDraftRosters(draftMessage: Message, team1: User[], team2: User[]) {
    const team1List = team1.map((user) => `:large_blue_diamond: ${user.username}`).join("\n");
    const team2List = team2.map((user) => `:large_orange_diamond: ${user.username}`).join("\n");

    const rosterMessage = `**Team 1:**\n${team1List}\n\n**Team 2:**\n${team2List}`;
    draftMessage.edit(rosterMessage);
  }
}
