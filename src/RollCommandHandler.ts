import { Message } from "discord.js";
import { CommandHandler } from "./CommandHandler";
import { CommandParserUtility } from "./CommandParserUtility";

export class RollCommandHandler extends CommandHandler {
  public static roll(message: Message) {
    let args: string[] = CommandParserUtility.parseArgs(message);

    if (args.length < 2) {
      message.channel.send("Please provide the maximum number for the roll.");
      return;
    }

    const maxNumber = parseInt(args[1], 10);
    if (isNaN(maxNumber) || maxNumber <= 0 || maxNumber > 1000) {
      message.channel.send("Invalid maximum number. Please provide a positive integer not exceeding 1000.");
      return;
    }

    let numRolls = 1;
    if (args.length >= 3) {
      numRolls = parseInt(args[2], 10);
      if (isNaN(numRolls) || numRolls <= 0) {
        message.channel.send("Invalid number of rolls. Please provide a positive integer.");
        return;
      }
    }

    // Generate 'numRolls' random numbers between 1 and maxNumber (inclusive)
    const rolledNumbers: number[] = [];
    for (let i = 0; i < numRolls; i++) {
      const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      rolledNumbers.push(randomNumber);
    }

    const outputMessage = rolledNumbers.join(", ");
    message.channel.send(`You rolled: ${outputMessage}.`);
  }
}
