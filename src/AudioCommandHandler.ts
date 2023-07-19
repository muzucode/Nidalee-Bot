import { Message } from "discord.js";
import { CommandHandler } from "./CommandHandler";

export class AudioCommandHandler extends CommandHandler {
  private static isPlaying: boolean = false


  public static startAudio(message: Message) {
    // TODO: Begin playing audio
    this.isPlaying = true
  }
  public static stopAudio() {
    this.isPlaying = false
  }
}