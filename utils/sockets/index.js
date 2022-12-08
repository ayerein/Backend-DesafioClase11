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
        this.usuarios = null
    }
    init(){
        try {
            this.io.on('connection', socket =>{
                this.io.sockets.emit("fillP", this.mensajes)
                this.io.sockets.emit("fillProd", this.productos)
                console.log("Usuario conectado.")
                this.io.sockets.emit("init", this.mensajes)
                this.io.sockets.emit("init", this.productos)

                socket.on("agregarUsuario", user => {
                    this.usuarios = user
                    console.log("nuevo usuario", user.email)
                })

                socket.on("nuevoMensaje", data => {
                    let today = new Date();
                    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+"  "+today.getHours() + ":" + today.getMinutes()
                    let nuevoMensaje = `<b style="color:blue">${this.usuarios.email}</b> [${date}]: <i style="color:green">${data}</i>`
                    this.mensajes.push(nuevoMensaje)
                    this.io.sockets.emit("fillP", this.mensajes)
                })

                socket.on("nuevoProducto", prod =>{
                    this.productos.push(prod)
                    this.io.sockets.emit("fillProd", this.productos)
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Socket