"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandValidator = void 0;
const Validator_1 = require("./Validator");
class CommandValidator extends Validator_1.Validator {
    static validate(message) {
        return message.content[0] === ';';
    }
}
exports.CommandValidator = CommandValidator;
