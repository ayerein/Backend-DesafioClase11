let {Router} = require("express")
let router = new Router()
let hbs = require('express-handlebars')



let Contenedor = require ('./context.js')

const productos = new Contenedor('productos.txt')



module.exports = app => {
    app.engine("handlebars", hbs.engine())
    
    app.set("views", "./views/hbs")
    app.set("view engine", "handlebars")
    
    /* Traer todos los productos. */
    app.use("/", router)
    router.get("/", async(req, res, next) => {
        /* let mostrarProductos = await productos.getAll() */
        res.render("index", /* {mostrarProductos} */)
    })

    /* Buscar producto por id. */
    router.get("/productos/:id", async(req, res, next) => {
        let id = Number(req.params.id)
        let productoId = await productos.getById(id)
        res.json(productoId)
    })

    /* Agregar un nuevo producto. */
    router.post("/", async(req, res, next) => {
        let productoNuevo = req.body

        if (productoNuevo) {
            await productos.save(productoNuevo)
            res.redirect("/")
        }
    })

    /* Actualizar un producto. */
    router.put("/productos/:id", async(req, res, next) => {
        let traerProductos = await productos.getAll()
        let id = Number(req.params.id)
        let index = traerProductos.map(producto => producto.id).indexOf(id)
        let productoNuevo = req.body
        productoNuevo.id = id
        if (index >= 0){
            await productos.update(productoNuevo)
            res.send('Producto actualizado!')
        } else {
            res.send('Id de producto no encontrado.')
        }
    })


    /* Eliminar un producto por su id. */
    router.delete("/productos/:id", async(req, res, next) => {
        let mostrarProductos = await productos.getAll()
        let id = Number(req.params.id)
        if (id <= mostrarProductos.length && id > 0){
            await productos.deleteById(id)
            res.send(`Se elimino correctamente el producto de id: ${id}`)
        } else {
            res.send('Por favor ingresa un Id válido.')
        }
    })

}