// make client that requests
// make server that responds

import Client from "./client"
import app from "./server"

const port = 3000

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is listening on port - ${port}`)

    const numberOfUsers = 6

    for (let i = 0; i <= numberOfUsers; i++) {
        const client = new Client()
        client.request()
    }


})
