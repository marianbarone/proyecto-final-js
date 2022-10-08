import cartModel from "../models/cartModel.js"
import productModel from "../models/productModel.js"

class CartContainer {
    constructor() { }

    async createCart(data) {
        try {
            console.log("entre al try del container")
            const newShoppingCart = await cartModel.create({
                products: data.products
            })
            return newShoppingCart
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async addProduct(id, id_prod) {
        const ObjectId = require("mongodb").ObjectID
        const o_id = new ObjectId(id)
        const o_id_prod = new ObjectId(id_prod)
        try {
            const selectedCart = await cartModel.findById({ _id: o_id })
            const productToAdd = await productModel.findById({ _id: o_id_prod })
            const option = { new: true }
            console.log("selectedCart", selectedCart)
            console.log("productToAdd", productToAdd)

            if (selectedCart && productToAdd) {
                const updatedDocument = await cartModel.findOneAndUpdate(
                    { selectedCart },
                    { $addToSet: { products: productToAdd } }
                )
                // const productsAddtion = selectedCart.products.push(productToAdd) ;
                console.log("updatedDocument", updatedDocument)
                // return await cartModel.updateOne(id, {products:productsAddtion})
            } else {
                console.log("Lo sentimos, no pudimos agregar el producto")
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getAllProducts(id) {
        const ObjectId = require("mongodb").ObjectID
        const o_id = new ObjectId(id)
        try {
            const carts = await cartModel
                .find({ _id: o_id })
                .populate({
                    path: "products",
                    select: "timestamp title description code thumbnail price stock"
                })
            return carts
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async getCartById(id) {
        const ObjectId = require("mongodb").ObjectID
        const o_id = new ObjectId(id)
        try {
            const cart = await cartModel
                .findById({ _id: o_id })
                .populate({
                    path: "products",
                    select: "timestamp title description code thumbnail price stock"
                })
            return cart
        } catch (error) {
            console.log(error)
            return []
        }
    }

    async deleteCartById(id) {
        try {
            const deleteCart = await cartModel.findByIdAndDelete(id)
            console.log(deleteCart)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteProductById(id, productId) {
        try {
            let addProduct = await cartModel.findByIdAndUpdate(id, {
                $pull: {
                    products: productId
                }
            })
            return addProduct
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default CartContainer
