
const router = require("express").Router();
const functions = require("./users.functions");

// Get a users
router.get("/:id", async (req, res) => {
const id = req.params.id;
const response = await functions.getUsers(id);
res.status(response.statusCode).json(response);
});

// Get all users
router.get("/", async (req, res) => {
const response = await functions.getAllUsers();
res.status(response.statusCode).json(response);
});

// Create a users
router.post("/", async (req, res) => {
const data = req.body;
const response = await functions.insertUsers(data);
res.status(response.statusCode).json(response);
});

// update a users
router.put("/:id", async (req, res) => {
const data = req.body;
const id = req.params.id;
const response = await functions.updateUsers(id, data);
res.status(response.statusCode).json(response);
});
// delete a users
router.delete("/:id", async (req, res) => {
const id = req.params.id;
const resposne = await functions.deleteUsers(id);
res.json(resposne);
});

module.exports = router;

        