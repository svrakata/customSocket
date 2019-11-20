"use strict";
// A socket is the combination of IP address plus port
// WS - web socket is a duplex connection protocol based on TCP/IP initiated by a http handshake
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
const db_1 = __importDefault(require("./db"));
const Server_1 = __importDefault(require("./Server"));
const port = 3000;
const dbUrl = "mongodb://localhost:27017";
const dbName = "socket";
const load = () => __awaiter(void 0, void 0, void 0, function* () {
    // connection to db
    const client = yield db_1.default.connect(dbUrl);
    const db = client.db(dbName);
    const server = new Server_1.default(db);
    const { app } = server;
    server.configure();
    server.setRoutes();
    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server is listening on port - ${port}`);
    });
    process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.get("http://localhost:3000/delete");
        }
        catch (err) {
            console.error(err.message);
        }
        finally {
            // tslint:disable-next-line:no-console
            console.log("\nThe server has been terminated.");
            process.exit();
        }
    }));
});
load();
