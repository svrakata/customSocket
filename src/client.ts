import axios from "axios"

class Client {
    public clearInt: NodeJS.Timeout
    public url = "http://localhost:3000/api/socket"
    public repeatTime = 5
    public clientID = Math.floor(Math.random() * 100000)

    public request() {
        this.clearInt = setInterval(() => {
            const load = async () => {
                try {
                    const response = await axios.get(`${this.url}/?id=${this.clientID}`)
                    // tslint:disable-next-line:no-console
                    console.log(response.data)

                } catch (err) {
                    console.log(err)
                }
            }
            load()
        }, this.repeatTime * 1000)
    }

    public endRequest() {
        clearInterval(this.clearInt)
    }
}

export default Client
