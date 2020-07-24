const router = require("express").Router();
const users = require("./version/users/router");
router.use("/users",users);
const products = require("./version/products/router");
router.use("/products",products);
module.exports = router