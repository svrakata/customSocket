import express from "express"

const app = express()

app.get("/api/socket", (req, res) => {
    const date = new Date()
    const timestamp = date.getTime()


    res.send(`hello, user ${req.query.id}`)
})

export default app

