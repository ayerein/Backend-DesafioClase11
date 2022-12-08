let express = require('express')
let app = express()
const PORT = 3001
let {Server: HttpServer} = require("http")
let serverRoutes = require("./routes")
let Socket = require("./utils/sockets")


/* app.use(express.static('html')) */
app.use(express.json())
app.use(express.urlencoded({extended:true}))

serverRoutes(app)

let httpServer = new HttpServer(app)

let socket = new Socket(httpServer)

socket.init()

httpServer.listen(PORT, ()=> console.log(`http://localhost:${PORT}`)) 