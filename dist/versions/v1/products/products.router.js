
const router = require("express").Router();
const functions = require("./products.functions");

// Get a products
router.get("/:id", async (req, res) => {
const id = req.params.id;
const response = await functions.getProducts(id);
res.status(response.statusCode).json(response);
});

// Get all products
router.get("/", async (req, res) => {
const response = await functions.getAllProducts();
res.status(response.statusCode).json(response);
});

// Create a products
router.post("/", async (req, res) => {
const data = req.body;
const response = await functions.insertProducts(data);
res.status(response.statusCode).json(response);
});

// update a products
router.put("/:id", async (req, res) => {
const data = req.body;
const id = req.params.id;
const response = await functions.updateProducts(id, data);
res.status(response.statusCode).json(response);
});
// delete a products
router.delete("/:id", async (req, res) => {
const id = req.params.id;
const resposne = await functions.deleteProducts(id);
res.json(resposne);
});

module.exports = router;

        