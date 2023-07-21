"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftCommandHandler = void 0;
const discord_js_1 = require("discord.js");
const CommandHandler_1 = require("./CommandHandler");
class DraftCommandHandler extends CommandHandler_1.CommandHandler {
    static draft(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.promptUsersForDraftees(message);
        });
    }
    static promptUsersForDraftees(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const drafteeMessage = yield message.channel.send("Select all the reactions for each user that is part of the draft.");
            let onlineUsers = new discord_js_1.Collection();
            let users = new Map();
            let userListMessage = '';
            const emojiList = [
                "🪖",
                "🏴‍☠️",
                "🛵",
                "🧻",
                "⛑️",
                "🫒",
                "🦄",
                "🔨",
                "🎰",
                "🍆",
                "🌊",
                "🐎",
                "🚴🏼",
                "🍟",
                "🥇",
                "🥈", // Grapes
            ];
            if (message.guild) {
                let emojiIndex = 0;
                message.guild.members.cache.forEach(user => {
                    userListMessage = userListMessage + user.nickname + ` - ${emojiList[emojiIndex]}\n`;
                    emojiIndex++;
                });
                message.channel.send(userListMessage);
            }
        });
    }
}
exports.DraftCommandHandler = DraftCommandHandler;
