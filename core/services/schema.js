const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartSchema = new Schema({
    name: String,
    price: Number,
    availability: Boolean,
    url: String,
    sellerId: String,
    lastUpdated: Date,
    tags: Array,
    description: String,
    imageUrl: String
});

module.exports = {
    PartSchema: PartSchema
};
