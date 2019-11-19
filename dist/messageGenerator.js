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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
class MessageGenerator {
    constructor(userID) {
        this.userID = userID;
        this.url = "http://localhost:4000/messages";
        this.messageNumber = 1;
        this.timeoutID = null;
    }
    randomIntInRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    generate(messageLimit) {
        this.timeoutID = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            if (this.timeoutID) {
                clearTimeout(this.timeoutID);
            }
            const db = db_1.default.getDB("socket");
            const collection = db.collection("messages");
            const date = new Date();
            const ts = date.getTime();
            yield collection.insert({ payload: `${this.messageNumber} Mississippi`, userID: this.userID, timestamp: ts });
            this.messageNumber++;
            this.generate(messageLimit);
        }), this.randomIntInRange(1, 10) * 1000);
        if (messageLimit && messageLimit <= this.messageNumber) {
            clearTimeout(this.timeoutID);
        }
    }
    end() {
        clearTimeout(this.timeoutID);
    }
}
exports.default = MessageGenerator;
//# sourceMappingURL=messageGenerator.js.map