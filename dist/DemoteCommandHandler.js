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
exports.DemoteCommandHandler = void 0;
const CommandHandler_1 = require("./CommandHandler");
const CommandParserUtility_1 = require("./CommandParserUtility");
class DemoteCommandHandler extends CommandHandler_1.CommandHandler {
    static demote(message) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let args = CommandParserUtility_1.CommandParserUtility.parseArgs(message);
            if (args.length < 2) {
                message.channel.send("Please mention a user to demote.");
                return;
            }
            const durationInMinutes = parseInt(args[2], 10);
            if (isNaN(durationInMinutes) || durationInMinutes <= 0) {
                message.channel.send("Invalid demotion duration. Please provide a positive number of minutes.");
                return;
            }
            const mentionedUser = message.mentions.users.first();
            if (!mentionedUser) {
                message.channel.send("Invalid user mentioned.");
                return;
            }
            const guildMember = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(mentionedUser.id);
            if (!guildMember) {
                message.channel.send("User is not a member of this server.");
                return;
            }
            try {
                const originalRoles = guildMember.roles.cache;
                const friendsRole = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.roles.cache.get("YOUR_FRIENDS_ROLE_ID");
                if (!friendsRole) {
                    message.channel.send("Could not find 'Friends' role.");
                    return;
                }
                const demotionTimer = DemoteCommandHandler.demotionTimers.get(mentionedUser.id);
                if (demotionTimer) {
                    clearTimeout(demotionTimer);
                }
                const rolesToRemove = originalRoles.filter((role) => role.id !== friendsRole.id);
                yield guildMember.roles.remove(rolesToRemove);
                yield guildMember.roles.add(friendsRole);
                message.channel.send(`Successfully demoted ${guildMember.user.tag} for ${durationInMinutes} minutes.`);
                // Set a timer to restore the user's original roles after the specified duration
                const restoreTimer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield guildMember.roles.remove(friendsRole);
                    yield guildMember.roles.add([...originalRoles.values()]);
                    message.channel.send(`Demotion time for ${guildMember.user.tag} is up. Restored original roles.`);
                    DemoteCommandHandler.demotionTimers.delete(mentionedUser.id);
                }), durationInMinutes * 60 * 1000); // Convert minutes to milliseconds
                DemoteCommandHandler.demotionTimers.set(mentionedUser.id, restoreTimer);
            }
            catch (error) {
                console.error("Error demoting user:", error);
                message.channel.send("An error occurred while demoting the user.");
            }
        });
    }
}
exports.DemoteCommandHandler = DemoteCommandHandler;
DemoteCommandHandler.demotionTimers = new Map();
