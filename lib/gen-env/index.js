const Utils = require("../utils")

class GenEnv{
    constructor(envVariables){
        this.envVariables = envVariables
    }

    genEnvs(){
        console.log(this.envVariables)
        let fileData = this.envVariables.map(variable =>{
            return `${variable[0]}=${variable[1]}`
        })
        return fileData.join("\n")
    }

    genEnvFile(){
        let fileData = this.genEnvs()
        let basePath = process.cwd()
        let envFile = basePath + "\\.env"
        Utils.writeFile(envFile, fileData)
    }
}

module.exports = GenEnv