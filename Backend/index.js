const connectToMongo = require("./DB");
const express = require('express')
var cors = require('cors')

connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./Routes/Auth'));
app.use('/api/Notes', require('./Routes/Notes'));

app.listen(port, () => {
  console.log(`Inote-book listening at http://localhost:${port}`)
})

