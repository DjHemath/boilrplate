const Express = require("./express")
const js = require("../js")

class ExpFile{

    constructor(){
        this.express = new Express()
        this.js = new js()
    }

    genMainFile(){
        let fileData = []
        // import express
        fileData.push(this.express.importDependencyWithVariable("express", "express"))

        // Create app
        fileData.push(this.express.createApp())

        // PORT
        fileData.push(this.js.variable("const", "PORT", "3000 || process.env.PORT"))

        // Create middle ware body parse
        fileData.push(this.express.middleware("normal", "express.json()"))

        // Main Router
        fileData.push(this.express.importDependencyWithVariable("mainRouter", "./main-router"))
        fileData.push(this.express.middleware("router", ["/api", "mainRouter"]))

        // Listen app
        fileData.push(this.express.listen("PORT", '()=>console.log(`Server started on: ${PORT}`)'))

        let txt = fileData.join(";\n")

        return txt

    }

    genMainRouter(){
        let fileData = []

        // Express Router
        fileData.push(this.js.functionCallFromObject(this.express.importDependencyWithVariable("router", "express"), "Router", []))

        // V1
        fileData.push(this.express.importDependencyWithVariable("v1", "./versions/v1/router"))
        fileData.push(this.js.functionCallFromObject("router", "use", ['"/v1"', "v1"]))

        // Export
        fileData.push(this.js.exportModule("router"))

        return fileData.join(";\n")
    }

    generateVersionRouterFile(resources){
        let fileData = []

        // Express Router
        fileData.push(this.js.functionCallFromObject(this.express.importDependencyWithVariable("router", "express"), "Router", []))

        resources.forEach(resource =>{
            fileData.push(this.express.importDependencyWithVariable(`${resource}`, `./${resource}/${resource}.router`))
            fileData.push(this.js.functionCallFromObject("router", "use", [`"/${resource}"`, resource]))
        })

        // Export
        fileData.push(this.js.exportModule("router"))

        return fileData.join(";\n")
    }

    generateRouterFile(resource){
        return `
const router = require("express").Router();
const functions = require("./${resource}.functions");

// Get a ${resource}
router.get("/:id", async (req, res) => {
const id = req.params.id;
const response = await functions.get${resource.charAt(0).toUpperCase() + resource.slice(1)}(id);
res.status(response.statusCode).json(response);
});

// Get all ${resource}
router.get("/", async (req, res) => {
const response = await functions.getAll${resource.charAt(0).toUpperCase() + resource.slice(1)}();
res.status(response.statusCode).json(response);
});

// Create a ${resource}
router.post("/", async (req, res) => {
const data = req.body;
const response = await functions.insert${resource.charAt(0).toUpperCase() + resource.slice(1)}(data);
res.status(response.statusCode).json(response);
});

// update a ${resource}
router.put("/:id", async (req, res) => {
const data = req.body;
const id = req.params.id;
const response = await functions.update${resource.charAt(0).toUpperCase() + resource.slice(1)}(id, data);
res.status(response.statusCode).json(response);
});
// delete a ${resource}
router.delete("/:id", async (req, res) => {
const id = req.params.id;
const resposne = await functions.delete${resource.charAt(0).toUpperCase() + resource.slice(1)}(id);
res.json(resposne);
});

module.exports = router;

        `
    }

    generateModelFile(resource, database){
        if(database === "mongodb"){
            return `
const mongoose = require("mongoose");
const autoIncrement = require("mongodb-autoincrement");

const ${resource}Schema = mongoose.Schema(
{
    
});

${resource}Schema.plugin(autoIncrement.mongoosePlugin, {
model: "${resource.charAt(0).toUpperCase() + resource.slice(1)}",
field: "id",
startAt: 1,
incrementBy: 1
});

const ${resource.charAt(0).toUpperCase() + resource.slice(1)} = mongoose.model("${resource}", ${resource}Schema);

module.exports = ${resource.charAt(0).toUpperCase() + resource.slice(1)};

        `
    }

    else if(["mysql", "mariadb", "sqlite", "mssql"].includes(database)){
        return `const sequelize = require("sequelize");
const ${resource.charAt(0).toUpperCase() + resource.slice(1)} = sequelize.define('${resource}', {
    }, {
    // options
    });
    module.exports = ${resource.charAt(0).toUpperCase() + resource.slice(1)}
        `
    }
    }

    generateFunctionsFile(resource){
        return `
const ${resource.charAt(0).toUpperCase() + resource.slice(1)} = require("./${resource}.model");

const get${resource.charAt(0).toUpperCase() + resource.slice(1)} = async id => {
    let result = {};

    return result;
};

const getAll${resource.charAt(0).toUpperCase() + resource.slice(1)} = async () => {
    let result = {};

    return result;
};

const insert${resource.charAt(0).toUpperCase() + resource.slice(1)} = async data => {
    let result = {};

    return result;
};

const update${resource.charAt(0).toUpperCase() + resource.slice(1)} = async (id, data) => {
    let result = {};
    delete data.id;

    return result;
};

const delete${resource.charAt(0).toUpperCase() + resource.slice(1)} = async id => {
    let result = {};

    return result;
};

module.exports = {
get${resource.charAt(0).toUpperCase() + resource.slice(1)},
getAll${resource.charAt(0).toUpperCase() + resource.slice(1)},
insert${resource.charAt(0).toUpperCase() + resource.slice(1)},
update${resource.charAt(0).toUpperCase() + resource.slice(1)},
delete${resource.charAt(0).toUpperCase() + resource.slice(1)}
};

        `
    }


    genResources(resources, database){
        let bundle = {}
        resources.forEach(resource =>{
            bundle[resource] = {}
            bundle[resource]["router"] = this.generateRouterFile(resource)
            bundle[resource]["model"] = this.generateModelFile(resource, database)
            bundle[resource]["functions"] = this.generateFunctionsFile(resource)

            // console.log("=======Router=======\n")
            // console.log(this.generateRouterFile(resource))
            // console.log("=======Model=======\n")
            // console.log(this.generateModelFile(resource))
            // console.log("=======Functions=======\n")
            // console.log(this.generateFunctionsFile(resource))
            // console.log("\n\n\n")
        })
        return bundle
    }
}

module.exports = ExpFile