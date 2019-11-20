import bodyParser from "body-parser"
import express from "express"
import { Db } from "mongodb"

class Server {
    public app = express()
    constructor(public db: Db) { }

    public configure() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    public setRoutes() {
        this.app.get("/api/socket", (req, res) => {
            const date = new Date()
            const timestamp = date.getTime()
            const id = req.query.id

            res.send(`Request from user with id: ${id}.`)
        })

        this.app.post("/message", async (req, res) => {
            const data = req.body
            await this.db.collection("messages").insertOne(data)
            console.log(`Message was send from user with id: ${data.userID}`)
            res.send(`Message was send from user with id: ${data.userID}`)
        })

        this.app.get("/delete", async (req, res) => {
            try {
                await this.db.collection("messages").deleteMany({})
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
