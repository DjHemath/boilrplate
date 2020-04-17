const Node = require("./node/node")

class GenCode{
    constructor(data){
        this.language = data["spec"]["language"]
        this.framwork = data["spec"]["framework"]
        this.database = data["spec"]["database"]["dbms"]
        this.resources = data["spec"]["resources"]
    }

    genCode(dist){
        if(this.language === "nodejs"){
            let node = new Node(this.framwork, this.database, this.resources)
            node.genCode(dist)
        }
    }
}

module.exports = GenCode