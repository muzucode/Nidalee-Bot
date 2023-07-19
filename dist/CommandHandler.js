"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const CommandParserUtility_1 = require("./CommandParserUtility");
class CommandHandler {
    static handle(message) {
        let args = CommandParserUtility_1.CommandParserUtility.parseArgs(message);
        args.forEach(arg => {
            console.log(arg);
        });
    }
}
exports.CommandHandler = CommandHandler;
