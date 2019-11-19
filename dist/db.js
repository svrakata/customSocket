"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class DataBase {
    static connect(url) {
        try {
            return mongodb_1.MongoClient.connect(url, { useUnifiedTopology: true });
        }
        catch (err) {
            console.log(err);
        }
    }
    static getDB(name) {
        return DataBase.client.db(name);
    }
    static createCollection(name) {
        // DataBase.client
    }
    disconnect() {
        DataBase.client.close();
    }
}
exports.default = DataBase;
//# sourceMappingURL=db.js.map