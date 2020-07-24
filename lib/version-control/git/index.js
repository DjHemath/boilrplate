const Utils = require("../../utils")
const {exec} = require("child_process")

class Git{

    constructor(){
        console.log(process.cwd())
        exec("git init",{cwd: process.cwd()}, (error, stdout, stderr)=>{
            console.log(stdout)
        })
    }

    genIgnoreFile(ignorables){
        let fileData = []
        let basePath = process.cwd()
        let ignoreFile = basePath + "\\.gitignore"
        ignorables.forEach(ignorable =>{
            fileData.push(ignorable)
        })

        Utils.writeFile(ignoreFile, fileData.join("\n"))
    }
}

module.exports = Git