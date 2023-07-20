import { Message } from "discord.js";
import { CommandParserUtility } from "./CommandParserUtility";
import { AudioCommandHandler } from "./AudioCommandHandler";
import { DraftCommandHandler } from "./DraftCommandHandler";
import { DemoteCommandHandler } from "./DemoteCommandHandler";
import { RollCommandHandler } from "./RollCommandHandler";

export class CommandRouter {
  public static route(message: Message) {
    let args: string[] = CommandParserUtility.parseArgs(message)

    // Route command to correct handler
    switch(args[0]) {
      // Music
      case 'play':
        AudioCommandHandler.startAudio(message)
        break
      case 'stop':
        AudioCommandHandler.stopAudio()
        break
      // Draft
      case 'draft':
        DraftCommandHandler.draft(message)
        break
      case 'demote':
        DemoteCommandHandler.demote(message)
        break
      case 'roll':
        RollCommandHandler.roll(message)
        break
    }
    args.forEach(arg => {
      console.log(arg)
    })
  }

}