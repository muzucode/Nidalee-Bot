import { Message } from "discord.js";
import { Validator } from "./Validator";

export class CommandValidator extends Validator {
  public static validate(message: Message): boolean {
    return message.content[0] === ';'
  }
}