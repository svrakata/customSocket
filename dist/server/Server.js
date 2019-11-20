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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
class Server {
    constructor(db) {
        this.db = db;
        this.app = express_1.default();
    }
    configure() {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
    }
    setRoutes() {
        this.app.get("/api/socket", (req, res) => {
            const date = new Date();
            const timestamp = date.getTime();
            const id = req.query.id;
            // check for new content
            // stall the request if no new content is available
            // listen for event that triggers the response with the fresh payload
            // else
            // response
            res.send(`Request from user with id: ${id}.`);
        });
        this.app.post("/message", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            yield this.db.collection("messages").insertOne(data);
            console.log(`Message was send from user with id: ${data.userID}`);
            res.send(`Message was send from user with id: ${data.userID}`);
        }));
        this.app.get("/delete", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.collection("messages").deleteMany({});
                console.log("\nThe DB is purged");
                res.send("ready");
            }
            catch (err) {
                console.error(err.message);
                process.exit();
            }
        }));
    }
}
exports.default = Server;
