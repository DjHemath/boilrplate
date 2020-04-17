const Express = require("./framework/express/index")
const Utils = require("../../utils")

class Node{
    constructor(framwork, database, resources){
        this.framwork = framwork
        this.database = database
        this.express = new Express()
        this.resources = resources
    }

    genCode(dist){
        if(this.framwork === "express"){

            // console.log("Main file")
            // console.log(this.express.genMainFile())

            // console.log("Main Router file")
            // console.log(this.express.genMainRouter())

            // console.log("Version Router file")
            // console.log(this.express.generateVersionRouterFile(this.resources))

            // console.log("Resources Files")
            // console.log(this.express.genResources(this.resources))
            // this.express.genResources(this.resources)
            let distPath = process.cwd() + `\\${dist}`

            Utils.creatDirIfNotExist(distPath)

            // Main File
            let mainFile = distPath+"\\main.js"
            Utils.writeFile(mainFile, this.express.genMainFile())

            // Main Router file
            let mainRouterFile = distPath + "\\main-router.js"
            Utils.writeFile(mainRouterFile, this.express.genMainRouter())

            // Version router
            let versionPath = distPath + "\\versions"
            Utils.creatDirIfNotExist(versionPath)
            let versionRouterPath = versionPath + "\\v1"
            Utils.creatDirIfNotExist(versionRouterPath)

            let versionRouterFile = versionRouterPath + "\\router.js"
            Utils.writeFile(versionRouterFile, this.express.generateVersionRouterFile(this.resources))

            // Resources
            this.resources.forEach(resource =>{
                let resourcePath = versionRouterPath + `\\${resource}`
                Utils.creatDirIfNotExist(resourcePath)
            })

            let bundle = this.express.genResources(this.resources)

            this.resources.forEach(resource =>{
                let resourcePath = versionRouterPath + `\\${resource}`
                let routerFile = resourcePath + `\\${resource}.router.js`
                let modelFile = resourcePath + `\\${resource}.model.js`
                let functionFile = resourcePath + `\\${resource}.functions.js`

                Utils.writeFile(routerFile, bundle[resource]["router"])
                Utils.writeFile(modelFile, bundle[resource]["model"])
                Utils.writeFile(functionFile, bundle[resource]["functions"])
            })
        }
    }
}

module.exports = Node