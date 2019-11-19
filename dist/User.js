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
const axios_1 = __importDefault(require("axios"));
const messageGenerator_1 = __importDefault(require("./messageGenerator"));
class User {
    constructor() {
        this.url = "http://localhost:3000/api/socket";
        this.repeatTime = 5;
        this.userID = Math.floor(Math.random() * 100000);
        this.messageGenerator = new messageGenerator_1.default(this.userID);
    }
    request() {
        this.clearInt = setInterval(() => {
            const load = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield axios_1.default.get(`${this.url}/?id=${this.userID}`);
                    // tslint:disable-next-line:no-console
                    console.log(response.data);
                }
                catch (err) {
                    // tslint:disable-next-line:no-console
                    console.log(err.message);
                }
            });
            load();
        }, this.repeatTime * 1000);
    }
    generateMessagesAtRandomTimes(messageLimit = null) {
        this.messageGenerator.generate(messageLimit);
    }
    endRequest() {
        clearInterval(this.clearInt);
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map