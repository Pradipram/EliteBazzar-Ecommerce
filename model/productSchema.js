import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type:String,
        required : true,
        unique : true
    },
    url: {
        type: String,
        required : true
    },
    title: {
        type: String,
        required : true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required : true
    },
    description: {
        type: String,
        required : true
    },
    discount: {
        type: Number,
        default : 0
    },
    MerchandId: {
        type: String,
        required : true
    }
});


const products = mongoose.model('product', productSchema);

export default products;