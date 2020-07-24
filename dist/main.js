const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.json());
const mainRouter = require("./main-router");
app.use("/api",mainRouter);
app.listen(PORT,()=>console.log(`Server started on: ${PORT}`))