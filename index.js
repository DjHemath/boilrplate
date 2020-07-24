#!/usr/bin/env node
const ReadSpec = require("./lib/read-spec");
const GenPackage = require("./lib/gen-package")
const GenCode = require("./lib/gen-code")
const GenEnv = require("./lib/gen-env")
const VersionControl = require("./lib/version-control")
const {exec} = require("child_process")

function getReqPackages(spec, others){
    let packages = []
    if(spec["language"] === "nodejs"){
        if(spec["framework"] === "express"){
            packages.push({name: "express", version: "*"})
        }
        if(spec["database"]){
            if(spec["database"]["dbms"] === "mongodb"){
                if(spec["database"]["orm"]){
                    if(spec["database"]["orm"]["package"] === "mongoose"){
                        packages.push({name: "mongoose", version: "*"})
                        packages.push({name: "mongodb-autoincrement", version: "*"})
                    }
                }
            }
            if(["mysql", "mssql", "mariadb", "sqlite", "postgres"].includes(spec["database"]["dbms"])){
                if(spec["database"]["orm"]){
                    if(spec["database"]["orm"]["package"] === "sequelize"){
                        packages.push({name: "sequelize", version: "*"})
                    }
                }
            }
        }
        if(others["env"]){
            if(others["env"]["enable"]){
                packages.push({name: "dotenv", version: "*"})
            }
        }
    }
    return packages
}

function buildData(specData){
    return {
        "name": specData["project-name"],
        "author": specData["author"],
        "version": specData["version"],
        "dependencies": getReqPackages(specData["spec"], specData["others"]),
        "license": "ISC",
        "description": "Boilrplate is a boilerplate generating tool",
    }
}

let readspec = new ReadSpec()
let specData = readspec.readSpec()

// Generate package
let genpkg = new GenPackage(specData["spec"]["language"], buildData(specData), specData["dist"])
genpkg.generatePackage()

// NPM install
console.log(process.cwd())
exec(`npm install`, {cwd: process.cwd()+`\\${specData["dist"]}`}, (error, stdout, stderr) =>{
    console.log(stdout)
})

// Generate code
let gencode = new GenCode(specData)
gencode.genCode(specData["dist"])

// Generate env
let genenv = new GenEnv(specData["others"]["env"]["variables"])
genenv.genEnvFile()

// Generate .gitignore
let versionControl = new VersionControl(specData["others"]["version-control"])
versionControl.genIgnoreFile()