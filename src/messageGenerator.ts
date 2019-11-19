import axios from "axios"
import DataBase from "./db"

class MessageGenerator {
    public url = "http://localhost:4000/messages"
    public messageNumber = 1
    public timeoutID: NodeJS.Timeout = null

    constructor(public userID: number) { }

    public randomIntInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min
    }

    public generate(messageLimit: number) {
        this.timeoutID = setTimeout(async () => {
            if (this.timeoutID) {
                clearTimeout(this.timeoutID)
            }

            const db = DataBase.getDB("socket")
            const collection = db.collection("messages")
            const date = new Date()
            const ts = date.getTime()

            await collection.insert(
                { payload: `${this.messageNumber} Mississippi`, userID: this.userID, timestamp: ts })
            this.messageNumber++
            this.generate(messageLimit)

        }, this.randomIntInRange(1, 10) * 1000)

        if (messageLimit && messageLimit <= this.messageNumber) {
            clearTimeout(this.timeoutID)
        }
    }

    public end() {
        clearTimeout(this.timeoutID)
    }

}

export default MessageGenerator
