"use strict";
// dont need abstraction now
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get("/api/socket", (req, res) => {
    const date = new Date();
    console.log(req.query);
    res.send(`hello, ${date.getTime()}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map