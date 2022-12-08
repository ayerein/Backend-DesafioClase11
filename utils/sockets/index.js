let {Server: SocketIO} = require("socket.io")

class Socket{
    static instancia
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia
        }
        Socket.instancia = this
        this.io = new SocketIO(http)
        this.productos = []
        this.mensajes = []
        this.usuarios = []
    }
    init(){
        try {
            this.io.on('connection', socket =>{
                this.io.sockets.emit("fillP", this.productos)
                console.log("Usuario conectado.")
                socket.on("nuevoProducto", prod =>{
                    this.productos.push(prod)
                    this.io.sockets.emit("fillP", this.productos)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Socket