"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRouter = void 0;
const CommandParserUtility_1 = require("./CommandParserUtility");
const AudioCommandHandler_1 = require("./AudioCommandHandler");
const DraftCommandHandler_1 = require("./DraftCommandHandler");
const DemoteCommandHandler_1 = require("./DemoteCommandHandler");
const RollCommandHandler_1 = require("./RollCommandHandler");
class CommandRouter {
    static route(message) {
        let args = CommandParserUtility_1.CommandParserUtility.parseArgs(message);
        // Route command to correct handler
        switch (args[0]) {
            // Music
            case 'play':
                AudioCommandHandler_1.AudioCommandHandler.startAudio(message);
                break;
            case 'stop':
                AudioCommandHandler_1.AudioCommandHandler.stopAudio();
                break;
            // Draft
            case 'draft':
                DraftCommandHandler_1.DraftCommandHandler.draft(message);
                break;
            case 'demote':
                DemoteCommandHandler_1.DemoteCommandHandler.demote(message);
                break;
            case 'roll':
                RollCommandHandler_1.RollCommandHandler.roll(message);
                break;
        }
        args.forEach(arg => {
            console.log(arg);
        });
    }
}
exports.CommandRouter = CommandRouter;
