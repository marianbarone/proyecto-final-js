import { getProducts, getById, addProductsController, updateProduct, deleteById, } from "../controllers/products-controller.js";
import { Router } from "express";

const productsRouter = Router()


//Products
productsRouter.get("/products", getProducts);
productsRouter.get("/products/:id", getById);
productsRouter.post("/products", addProductsController);
productsRouter.put("/products/:id", updateProduct);
productsRouter.delete("/products/:id", deleteById);

export default productsRouter
