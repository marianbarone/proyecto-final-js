import { createCart, deleteCart, getCartProducts, addProductToCart, deleteProductFromCart, } from '../controllers/cart-controller.js';
import { Router } from "express";

const cartsRouter = Router();

// Cart
cartsRouter.post('/cart', createCart);
cartsRouter.delete('/cart/:id', deleteCart);
cartsRouter.get('/cart/:id/products', getCartProducts);
cartsRouter.post('/cart/:id/products/:id_prod', addProductToCart);
cartsRouter.delete('/cart/:id/products/:id_prod', deleteProductFromCart);

export default cartsRouter;