const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)
const cors = require('cors')
const dbConnect = require('./config/database')
const userRoutes = require('./routes/User')
const eventRoutes = require('./routes/Event')

const port = process.env.PORT || 3000
dbConnect();

app.use(express.json());
app.use(cors());

app.use('/v1/user', userRoutes)
app.use('/v1/auth', eventRoutes)

app.get('/', (req, res) => {
    res.send('Hello world');
  });
 
io.on('connection', (socket) => {
    console.log('a user connected')
})   

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

