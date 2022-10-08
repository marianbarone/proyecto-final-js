import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        default: 'No title'
    },
    description: {
        type: String,
        default: 'No description'
    },
    code: {
        type: String,
        default: 'No code'
    },
    thumbnail: {
        type: String,
        default: 'No thumbnail'
    },
    price: {
        type: Number,
        default: 1
    },
    stock: {
        type: Number,
        default: 0
    }
});


export default mongoose.model('Product', productSchema);