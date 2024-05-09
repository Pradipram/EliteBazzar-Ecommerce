import Product from '../model/productSchema.js';


export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});
        response.status(200).json(products);
    }catch (error) {
        response.status(500).json({message : error.message});
    }
}

export const getProductById = async (request, response) => {
    try {
        const products = await Product.findOne({ 'id': request.params.id });
        response.status(200).json(products);
    }catch (error) {
        response.status(500).json({message : error.message});
    }
}

export const addProduct = async (request, response) => {
    try{
        console.log("Add product is being called");
        let {productCode, ...newProduct} = request.body;
        newProduct = {...newProduct, "id" : request.body.productCode};
        newProduct = {...newProduct, "MerchandId" : request.userId};
        // console.log(product);
        let isExist = await Product.findOne({id: newProduct.id});
        if(isExist){
            return response.status(403).json({message: "Product already exist with this ProductCode"});
        }
        isExist = await Product.findOne({title:newProduct.title,MerchandId:newProduct.MerchandId});
        if(isExist){
            return response.status(403).json({message: "You have already added Product with this name"});
        }
        const product = new Product(newProduct);
        product.save();
        return response.status(200).json(product);
    }
    catch( error ){
        response.status(500).json({message : "something went wrong"});
    }
}