
const mongoose = require("mongoose");
const autoIncrement = require("mongodb-autoincrement");

const productsSchema = mongoose.Schema(
{
    
});

productsSchema.plugin(autoIncrement.mongoosePlugin, {
model: "Products",
field: "id",
startAt: 1,
incrementBy: 1
});

const Products = mongoose.model("products", productsSchema);

module.exports = Products;

        