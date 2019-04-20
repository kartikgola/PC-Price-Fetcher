const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartSchema = new Schema({
    name: String,
    price: Number,
    availability: Boolean,
    url: String,
    seller: String,
    lastUpdated: Date,
    tag: String,
    description: String,
    imageUrl: String
});

module.exports = {
    PartSchema: PartSchema
};
