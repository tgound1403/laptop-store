const Invoice = require('../models/invoiceModel');

const getAllInvoice = async (req, res) => {
    try {
        const data = await Invoice.getInvoice();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Invoice.getSpecificInvoice(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createInvoice = async (req, res) => {
    try {
        const { userID, productID, status, total } = req.body;
        const data = await Invoice.postInvoice(userID, productID, status, total);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Invoice.deleteInvoice(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateInvoiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const data = await Invoice.updateInvoice(id, status);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllInvoice,
    getUserInvoice,
    createInvoice,
    removeInvoice,
    updateInvoiceStatus,
};
