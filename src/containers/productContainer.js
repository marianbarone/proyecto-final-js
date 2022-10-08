// import config from "../config.js"
// import mongoose from "mongoose"
import productModel from "../models/productModel.js"


export class ProductContainer {
    constructor() { }

    async addProduct(data) {
        try {
            console.log("entre al try del container")
            const response = await productModel.create({
                title: data.title,
                description: data.description,
                code: data.code,
                thumbnail: data.thumbnail,
                price: data.price,
                stock: data.stock
            })
            return response
        } catch (e) {
            console.log(e)
        }
    }

    async getById(id) {
        const ObjectId = require("mongodb").ObjectID
        const o_id = new ObjectId(id)
        const product = await productModel.find({ _id: o_id })
        return product
    }

    async getProducts() {
        try {
            console.log('entre al try del controller de products')
            const products = await productModel.find()
            return products
            // console.log(products)
        } catch (error) {
            console.log('err container')
            console.log("No existen productos", error)
        }
    }

    async deleteById(id) {
        const ObjectId = require("mongodb").ObjectID
        const o_id = new ObjectId(id)
        const product = await productModel.deleteOne({ _id: o_id })
        return product

        // console.log(product)
    }

    async updateProduct(id) {
        const ObjectId = require("mongodb").ObjectID
        const o_id = new ObjectId(id)
        const productToUpdate = await productModel.updateOne({ _id: o_id })
        return productToUpdate
        // console.log(productToUpdate)
    }
}
