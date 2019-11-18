"use strict";
// make client that requests
// make server that responds
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
const server_1 = __importDefault(require("./server"));
const port = 3000;
server_1.default.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is listening on port - ${port}`);
    const numberOfUsers = 6;
    for (let i = 0; i <= numberOfUsers; i++) {
        const client = new client_1.default();
        client.request();
    }
});
//# sourceMappingURL=index.js.map