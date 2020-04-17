const Utils = require("../utils")

class Node{
    constructor(data){
        this.data = data
    }
    generatePackageJSON(dist){
        let data = {
            "name": this.data["name"],
            "version": this.data["version"],
            "author": this.data["author"],
            "dependencies": this.generatePackages(),
            "license": this.data["license"],
            "description": this.data["description"]
          }

        let distPath = process.cwd() + `\\${dist}`
        Utils.creatDirIfNotExist(distPath)
        Utils.createJson(distPath + "\\package.json", data)
    }

    generatePackages(){
        let packagesObj = {}
        this.data["dependencies"].forEach(pkg =>{
            packagesObj[pkg.name] = pkg["version"]
        })
        return packagesObj
    }
}

module.exports = Node