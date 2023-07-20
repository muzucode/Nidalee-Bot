"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioCommandHandler = void 0;
const CommandHandler_1 = require("./CommandHandler");
class AudioCommandHandler extends CommandHandler_1.CommandHandler {
    static startAudio(message) {
        // TODO: Begin playing audio
        this.isPlaying = true;
    }
    static stopAudio() {
        this.isPlaying = false;
    }
}
exports.AudioCommandHandler = AudioCommandHandler;
AudioCommandHandler.isPlaying = false;
