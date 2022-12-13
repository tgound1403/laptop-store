const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    brand: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    color: {
        type: Array,
        require: false,
    },
    tags: {
        type: Array,
        require: false,
    },
    image: {
        type: String,
        require: true,
    },
});

//* [GET]: view all products - admin functionality
productSchema.statics.viewProduct = async function () {
    const data = await this.find({});
    return data;
};

//* [POST]: create a new product - admin functionality
productSchema.statics.createProduct = async function (name, brand, price, color, tags, image) {
    if (!name || !brand || !price || !color || !tags || !image) {
        throw Error('All filed must be filled');
    }
    const path = `/productImages/${image.filename}`;

    const data = await this.create({
        name,
        brand,
        price,
        color,
        tags,
        image: path,
    });
    return data;
};

//* [GET]: get a specific product base on name or brand
productSchema.statics.getSpecificProduct = async function (query) {
    if (!query) {
        throw Error('Query must be defined');
    }
    const data = await this.find({
        $or: [{ name: query }, { brand: query }, { tags: query }],
    });
    return data;
};

// * [GET]: get a product base on ID
productSchema.statics.getSpecificProductById = async function (_id) {
    const data = await this.findById({ _id });
    return data;
};

//* [GET]: get a specific amount of products per page (pagination)
productSchema.statics.getAmountOfProduct = async function (page, productPerPage) {
    const data = await this.find({})
        .skip(page * productPerPage)
        .limit(productPerPage);
    return data;
};

productSchema.statics.deleteSpecificProduct = async function (id) {
    const data = await this.findByIdAndRemove(id);
    return data;
};

productSchema.statics.updateSpecificProduct = async function (id, object, image) {
    if (image) {
        const path = `/productImages/${image.filename}`;
        const data = await this.findByIdAndUpdate({ _id: id }, { ...object, image: path }, { new: true });
        return data;
    } else {
        const data = await this.findByIdAndUpdate({ _id: id }, { ...object }, { new: true });
        return data;
    }
};

module.exports = mongoose.model('Product', productSchema);
