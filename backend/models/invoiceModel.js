const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
    {
        userID: {
            type: String,
            require: true,
        },
        productID: {
            type: Array,
            require: true,
        },
        status: {
            type: Boolean,
            require: true,
            default: false,
        },
        total: {
            type: Number,
            require: true,
            default: 0,
        },
    },
    { timestamps: true },
);

invoiceSchema.statics.getInvoice = async function () {
    const data = await this.find({});
    return data;
};

invoiceSchema.statics.getSpecificInvoice = async function (id) {
    if (!id) {
        throw Error('All filed must be filled');
    }
    const data = await this.findById(id);
    return data;
};

invoiceSchema.statics.postInvoice = async function (userID, productID, status, total) {
    if (!userID || !productID) {
        throw Error('All filed must be filled');
    }
    const data = await this.create({ userID, productID, status, total });
    return data;
};

invoiceSchema.statics.deleteInvoice = async function (id) {
    if (!id) throw Error('Please fill in ID');
    const data = await this.findByIdAndRemove(id);
    return data;
};

invoiceSchema.statics.updateInvoice = async function (id, status) {
    if (!id) throw Error('Please fill in ID');
    const data = await this.findByIdAndUpdate({ _id: id }, { status }, { new: true });
    return data;
};

module.exports = mongoose.model('invoice', invoiceSchema);
