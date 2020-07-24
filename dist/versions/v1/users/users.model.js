
const mongoose = require("mongoose");
const autoIncrement = require("mongodb-autoincrement");

const usersSchema = mongoose.Schema(
{
    
});

usersSchema.plugin(autoIncrement.mongoosePlugin, {
model: "Users",
field: "id",
startAt: 1,
incrementBy: 1
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;

        