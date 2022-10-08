import { ProductContainer }from "../../containers/productContainer.js"

class ProductDaoMongo extends ProductContainer {
    constructor() {
        super('products')
    }
}

export default new ProductDaoMongo()
