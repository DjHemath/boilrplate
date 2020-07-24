class Database{
    constructor(database){
        this.database = database
    }

    genDBConnection(){
        if(this.database === "mongodb") return this.genMongo()
        else if(["mysql", "mssql", "mariadb", "postgres", "sqlite"].includes(this.database)) return this.getSqlConnection()
    }

    genMongo(){
        return `const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
        `
    }

    getSqlConnection(){
        if(["mysql", "mssql", "mariadb", "postgres"].includes(this.database)){
        return `const Sequelize = require("sequelize");
const sequelize = new Sequelize('database_name', process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: "${this.database}"
});
module.exports = sequelize
`
        }
        else{
            return `const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
    });
module.exports = sequelize
`
        }
    }
}

module.exports = Database