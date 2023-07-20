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
const CommandHandler_1 = require("./CommandHandler");
class DraftCommandHandler extends CommandHandler_1.CommandHandler {
    static draft(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { completionCollector, drafteesCollector } = yield this.promptUsersForDraftees(message);
                console.log(drafteesCollector);
                console.log(drafteesCollector);
                console.log(drafteesCollector);
                const team1Captain = yield this.promptForTeamCaptain(message, "Team 1");
                const team2Captain = yield this.promptForTeamCaptain(message, "Team 2");
                const draftees = drafteesCollector.collected.map((reaction) => reaction.users.cache.last()).filter(Boolean); // Filter out undefined values
                const team1 = [];
                const team2 = [];
                let currentTeam = "Team 1";
                const draftMessage = yield this.presentDraftees(message.channel, draftees);
                drafteesCollector.on("collect", (reaction, user) => {
                    if (!user || user === team1Captain || user === team2Captain)
                        return;
                    if (currentTeam === "Team 1") {
                        team1.push(user);
                        currentTeam = "Team 2";
                    }
                    else {
                        team2.push(user);
                        currentTeam = "Team 1";
                    }
                    reaction.users.remove(user.id);
                    this.updateDraftRosters(draftMessage, team1, team2);
                });
            }
            catch (error) {
                console.error("Error in draft command:", error);
                message.channel.send("An error occurred during the draft.");
            }
        });
    }
    static promptUsersForDraftees(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const drafteeMessage = yield message.channel.send("React to this message to be added to the pool of selectable draftees.\nOnce all are selected, press ✅ to confirm.");
            yield drafteeMessage.react("✅");
            const filter = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
            return {
                completionCollector: drafteeMessage.createReactionCollector({ filter, time: 60000 }),
                drafteesCollector: drafteeMessage.createReactionCollector({ time: 60000 })
            };
        });
    }
    static promptForTeamCaptain(message, teamName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message.channel.send(`Mention the captain for ${teamName}.`);
            const captainCollector = message.channel.createMessageCollector({
                filter: (m) => m.mentions.users.size > 0 && m.author.id === message.author.id,
                max: 1,
                time: 60000,
            });
            return new Promise((resolve) => {
                captainCollector.on("collect", (message) => {
                    const captain = message.mentions.users.first();
                    resolve(captain);
                });
                captainCollector.on("end", () => {
                    resolve(undefined);
                });
            });
        });
    }
    static presentDraftees(channel, draftees) {
        return __awaiter(this, void 0, void 0, function* () {
            const drafteesList = draftees.map((draftee) => `:white_check_mark: ${draftee.username}`).join("\n");
            return channel.send(`**Draftees:**\n${drafteesList}`);
        });
    }
    static updateDraftRosters(draftMessage, team1, team2) {
        const team1List = team1.map((user) => `:large_blue_diamond: ${user.username}`).join("\n");
        const team2List = team2.map((user) => `:large_orange_diamond: ${user.username}`).join("\n");
        const rosterMessage = `**Team 1:**\n${team1List}\n\n**Team 2:**\n${team2List}`;
        draftMessage.edit(rosterMessage);
    }
}
exports.DraftCommandHandler = DraftCommandHandler;
