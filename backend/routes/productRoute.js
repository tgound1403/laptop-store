const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFiles');
const {
    getAllProducts,
    getProductByQuery,
    getProductByID,
    getAmountOfProductPerPage,
    postProduct,
    deleteProduct,
    updateProduct,
} = require('../controllers/productController');

router.put('/:id', upload.single('image'), updateProduct);
router.get('/pagination', getAmountOfProductPerPage);
router.get('/query/:query', getProductByQuery);
router.get('/id/:id', getProductByID);
router.delete('/:id', deleteProduct);
router.get('/', getAllProducts);
router.post('/', upload.single('image'), postProduct);

module.exports = router;
