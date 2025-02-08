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
const { cloudinaryConnect } = require('./config/cloudinary')
const fileUpload = require('express-fileupload')

const port = process.env.PORT || 3000
dbConnect();
cloudinaryConnect()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.options("*", cors())
app.use(express.json());
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp/",
	})
)

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

