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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const app = express_1.default();
app.get("/api/socket", (req, res) => {
    const date = new Date();
    const timestamp = date.getTime();
    const id = req.query.id;
    res.send(`Hello, user ${req.query.id}`);
});
app.get("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield db_1.default.connect("mongodb://localhost:27017/socket");
    console.log(db);
    try {
        console.log("\nThe DB is purged");
        res.send("ready");
    }
    catch (err) {
        console.error(err.message);
        process.exit();
    }
}));
exports.default = app;
//# sourceMappingURL=server.js.map