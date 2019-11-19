import axios from "axios"
import MessageGenerator from "./messageGenerator"

class User {
    public clearInt: NodeJS.Timeout
    public url = "http://localhost:3000/api/socket"
    public repeatTime = 5
    public userID = Math.floor(Math.random() * 100000)
    public messageGenerator = new MessageGenerator(this.userID)

    public request() {
        this.clearInt = setInterval(() => {
            const load = async () => {
                try {
                    const response = await axios.get(`${this.url}/?id=${this.userID}`)
                    // tslint:disable-next-line:no-console
                    console.log(response.data)

                } catch (err) {
                    // tslint:disable-next-line:no-console
                    console.log(err.message)
                }
            }
            load()
        }, this.repeatTime * 1000)
    }

    public generateMessagesAtRandomTimes(messageLimit: number = null) {
        this.messageGenerator.generate(messageLimit)
    }

    public endRequest() {
        clearInterval(this.clearInt)
    }
}

export default User
