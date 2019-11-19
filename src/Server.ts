import express from "express"
import { Db } from "mongodb"

class Server {
    public app = express()
    constructor(public db: Db) { }

    public setRoutes() {
        this.app.get("/api/socket", (req, res) => {
            const date = new Date()
            const timestamp = date.getTime()
            const id = req.query.id

            res.send(`Hello, user ${id}`)
        })

        this.app.get("/delete", async (req, res) => {
            try {
                await this.db.collection("messages").remove({})
                console.log("\nThe DB is purged")
                res.send("ready")
            } catch (err) {
                console.error(err.message)
                process.exit()
            }
        })
    }
}


export default Server
