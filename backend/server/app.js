const express = require("express")
const app = express()
require("dotenv").config()
require("./db/config")
const port = 4000

// middlewares
app.use(require("./routes/auth"))

app.listen(port, () => {
    console.log(`app is listening on ${port}`)
})
