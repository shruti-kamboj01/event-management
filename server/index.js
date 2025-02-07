const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)
const cors = require('cors')
const dbConnect = require('./config/database')

const port = process.env.PORT || 3000
dbConnect();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello world');
  });
 
io.on('connection', (socket) => {
    console.log('a user connected')
})   

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

