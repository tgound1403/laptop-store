const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const data = await Product.viewProduct();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductByQuery = async (req, res) => {
    try {
        const { query } = req.params;
        const data = await Product.getSpecificProduct(query);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductByID = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Product.getSpecificProductById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAmountOfProductPerPage = async (req, res) => {
    try {
        const page = req.query.page || 0;
        const productPerPage = 15;
        const data = await Product.getAmountOfProduct(page, productPerPage);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postProduct = async (req, res) => {
    try {
        const image = req.file;
        const { name, price, color, brand, tags } = req.body;
        const data = await Product.createProduct(name, brand, price, color, tags, image);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductByQuery,
    getProductByID,
    getAmountOfProductPerPage,
    postProduct,
};
