import axios from "axios"
import MessageGenerator from "./messageGenerator"

class Room {
    public url = "http://localhost:3000/api/socket"
    public roomID = Math.floor(Math.random() * 100000)
    public messageGenerator = new MessageGenerator(this.roomID)

    public poll() {
        const load = async () => {
            try {
                const response = await axios.get(`${this.url}/?id=${this.roomID}`)
                // tslint:disable-next-line:no-console
                console.log(response.data)
                this.poll()
            } catch (err) {
                // tslint:disable-next-line:no-console
                console.log(err.message)
            }
        }
        load()
    }

    public generateMessagesAtRandomTimes(messageLimit: number = null) {
        this.messageGenerator.generate(messageLimit)
    }

    public async leaveRoom() {
        await axios.get(`${this.url}?leave=1`)
        // close chat or whatever
    }
}

export default Room
