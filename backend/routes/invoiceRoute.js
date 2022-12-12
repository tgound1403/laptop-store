const express = require('express');
const router = express.Router();
const {
    getAllInvoice,
    getUserInvoice,
    createInvoice,
    removeInvoice,
    updateInvoiceStatus,
} = require('../controllers/invoiceController');

router.put('/:id', updateInvoiceStatus);

router.delete('/:id', removeInvoice);

router.post('/', createInvoice);

router.get('/:id', getUserInvoice);

router.get('/', getAllInvoice);

module.exports = router;
