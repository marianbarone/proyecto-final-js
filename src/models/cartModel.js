import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartsSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});


export default mongoose.model('Cart', cartsSchema);