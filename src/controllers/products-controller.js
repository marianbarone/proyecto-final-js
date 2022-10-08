import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
import { ProductDao } from '../daos/index.js'


// mongoose.connect(process.env.URLMongo, (err, res) => {
//     if (err) throw err;
//     console.log("Base de datos MONGO conectada.");
// })

console.log(ProductDao)

//GetAll
const getProducts = async (req, res) => {
    try {
        let products = await ProductDao.getProducts()
        const html = res.render('products', { products })
        document.getElementById('products').innerHTML = html;
    } catch (err) {
        console.log("No existen productos", err)
    }
}

//add

const addProductsController = async (req, res) => {
    try {
        let product = req.body
        console.log(product)
        let newProduct = await ProductDao.addProduct(product)
        console.log(newProduct)

        if (newProduct) {
            res.status(201).json({
                msg: "El producto se creo de manera exitosa",
                data: newProduct
            })
        } else {
            res.status(400).json("No se pudo agregar el producto")
        }
    } catch (e) {
        console.log("Ocurrio un error al agregar el producto")
    }
}

//GetByID

const getById = async (req, res) => {
    const id = req.params.id

    let data = await ProductDao.getById(id)

    if (data) {
        res.send(data)
    } else {
        res.status(404).json({ error: "Producto no encontrado!" })
    }
}

// Update con id

const updateProduct = async (req, res) => {
    const id = req.params.id
    const data = req.body
    let product = await ProductDao.getById(id)

    if (product) {
        const productUpdate = await ProductDao.updateById(id, data, product)
        res.json({
            msg: `El producto con el id ${id} fue actualizado con exito`
        })
    } else {
        res.status(404).json({ error: "Producto no encontrado" })
    }
}

//Delete por id

const deleteById = async (req, res) => {
    const id = req.params.id
    let data = await ProductDao.deleteById(id)
    if (data) {
        res.json("Producto eliminado")
    } else {
        res.status(404).json({ error: "Producto no encontrado!" })
    }
}

export {
    getProducts,
    addProductsController,
    getById,
    updateProduct,
    deleteById
}
