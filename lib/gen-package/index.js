const Node = require("./node")

class Package{
    constructor(language, data, dist){
        this.language = language,
        this.data = data
        this.node = new Node(this.data)
        this.dist = dist
    }

    // To generate package file
    generatePackage(){

        switch(this.language){
            case "nodejs":
                this.node.generatePackageJSON(this.dist)
                break;
        }
    }
}

module.exports = Package