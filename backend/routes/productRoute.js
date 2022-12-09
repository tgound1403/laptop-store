const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFiles');
const {
    getAllProducts,
    getProductByQuery,
    getProductByID,
    getAmountOfProductPerPage,
    postProduct,
} = require('../controllers/productController');

router.get('/pagination', getAmountOfProductPerPage);
router.get('/id/:id', getProductByID);
router.get('/query/:query', getProductByQuery);
router.get('/', getAllProducts);
router.post('/', upload.single('image'), postProduct);

module.exports = router;
