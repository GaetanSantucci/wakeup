import { Product } from '../datamapper/product.js';
import { ErrorApi } from '../services/errorHandler.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getAllProducts = async (req, res) => {
    try {
        const productList = await Product.findAll();
        if (!productList)
            throw new ErrorApi("Impossible d'obtenir la liste des articles", req, res, 400);
        return res.status(200).json(productList);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const getProductById = async (req, res) => {
    try {
        const productId = +req.params.plateId;
        const oneProduct = await Product.findOne(productId);
        if (!oneProduct)
            throw new ErrorApi('Article non trouvé', req, res, 404);
        return res.status(200).json(oneProduct);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const createNewProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        if (newProduct)
            return res.status(200).json("L'article a bien été crée");
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { getAllProducts, getProductById, createNewProduct };
