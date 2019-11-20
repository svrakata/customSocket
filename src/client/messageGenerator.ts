import Axios from "axios"
import DataBase from "../server/db"

class MessageGenerator {
    public url = "http://localhost:3000/message"
    public messageNumber = 1
    public timeoutID: NodeJS.Timeout = null

    constructor(public userID: number) { }

    public randomIntInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    public generate(messageLimit: number) {
        this.timeoutID = setTimeout(async () => {
            const date = new Date()
            const ts = date.getTime()
            const message = { payload: `${this.messageNumber} Mississippi`, userID: this.userID, timestamp: ts }

            try {
                await Axios.post(this.url, message)
            } catch (err) {
                console.error(err.message)
            }

            this.messageNumber++
            this.generate(messageLimit)

        }, this.randomIntInRange(1, 20) * 1000)

        if (messageLimit && messageLimit <= this.messageNumber) {
            clearTimeout(this.timeoutID)
        }
    }

    public end() {
        clearTimeout(this.timeoutID)
    }

}

export default MessageGenerator
