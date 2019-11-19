import { MongoClient } from "mongodb"

class DataBase {
    public static client: MongoClient

    public static connect(url: string): Promise<MongoClient> {
        try {
            return MongoClient.connect(url, { useUnifiedTopology: true })
        } catch (err) {
            console.log(err)
        }
    }

    public static getDB(name: string) {
        return DataBase.client.db(name)
    }

    public static createCollection(name: string) {
        // DataBase.client
    }

    public disconnect(): void {
        DataBase.client.close()
    }
}

export default DataBase
