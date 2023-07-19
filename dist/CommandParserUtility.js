"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandParserUtility = void 0;
const Utility_1 = require("./Utility");
class CommandParserUtility extends Utility_1.Utility {
    static removePrefix(messageContent) {
        return messageContent.substring(1);
    }
    static parseArgs(message) {
        let unprefixedMessage = this.removePrefix(message.content);
        return unprefixedMessage.split(' ');
    }
}
exports.CommandParserUtility = CommandParserUtility;
