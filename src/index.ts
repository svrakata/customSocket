// A socket is the combination of IP address plus port

import axios from "axios"
import User from "./client/User"
import DataBase from "./server/db"
import Server from "./server/Server"

const port = 3000
const dbUrl = "mongodb://localhost:27017"
const dbName = "socket"
const load = async () => {
    // connection to db
    const client = await DataBase.connect(dbUrl)
    const db = client.db(dbName)
    const server = new Server(db)
    const { app } = server

    server.configure()
    server.setRoutes()

    app.listen(port, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server is listening on port - ${port}`)

        const numberOfUsers = 6

        for (let i = 0; i <= numberOfUsers; i++) {
            const user = new User()
            user.request()
            user.generateMessagesAtRandomTimes()
        }
    })

    process.on("SIGINT", async () => {
        try {
            await axios.get("http://localhost:3000/delete")
        } catch (err) {
            console.error(err.message)
        } finally {
            // tslint:disable-next-line:no-console
            console.log("\nThe server has been terminated.")
            process.exit()
        }
    })
}

load()
