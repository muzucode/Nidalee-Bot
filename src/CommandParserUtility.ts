import { Message } from "discord.js"
import { Utility } from "./Utility"

export class CommandParserUtility extends Utility {
  
  private static removePrefix(messageContent: string): string {
    return messageContent.substring(1)
  }
  public static parseArgs(message: Message): string[] {
    let unprefixedMessage = this.removePrefix(message.content)
    return unprefixedMessage.split(' ')
  }

}