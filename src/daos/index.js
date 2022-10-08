import dotenv from "dotenv"
dotenv.config()


// let ProductDao = require("./products/productDao")
// let CartDao = require("./carts/cartDao")
// let ProductDao
// let CartDao

// // const { default: CartDaoMongo } = await import("./carts/cartDao.js");
// // const { default: ProductDaoMongo } = await import("./products/productDao.js");

// // CartDao = CartDaoMongo;
// // ProductDao = ProductDaoMongo;


// switch (process.env.DATABASE) {
//     case "firebase":
//         import("./products/productDaoFirebase").then(
//             dao => (ProductDao = dao.default)
//         )
//         import("./carts/cartDaoFirebase").then(
//             daoCart => (CartDao = daoCart.default)
//         )

//         break

//     case "mongodb":
//         import("./products/productDao.js").then(dao => (ProductDao = dao.default))
//         import("./carts/cartDao.js").then(daoCart => (CartDao = daoCart.default))

//         break
//     default:
//         ProductDao = require("./products/productDao.js")
//         CartDao = require("./carts/cartDao.js")
//         break
// }

// console.log(ProductDao)
// export { ProductDao, CartDao }

let CartDao;
let ProductDao;

switch (process.env.DATABASE) {
    case "mongoDB":
        const { default: cartsDaoMongo } = await import("./carts/cartDao.js");
        const { default: productsDaoMongo } = await import("./products/productDao.js");

        CartDao = cartsDaoMongo;
        ProductDao = productsDaoMongo;

        break;

    case "firebase":
        // const { default: cartsModelDaoFirebase } = await import("./daos/cartsModel-firebase.js");
        // const { default: productsModelDaoFirebase } = await import("./daos/productsModel-firebase.js");

        // CartDao = cartsModelDaoFirebase;
        // ProductDao = productsModelDaoFirebase;


        // break;

    default:
        break;
}

export {
    CartDao,
    ProductDao,
}
