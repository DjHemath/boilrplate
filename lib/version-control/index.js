class VersionControl{
    constructor(versionControl){
        this.versionControl = versionControl
        this.versionControlSystem = this.versionControl["system"]
        if(this.versionControlSystem === "git"){
            this.systemImp = require("./git")
            this.system = new this.systemImp()
        }
    }

    genIgnoreFile(){
        this.system.genIgnoreFile(this.versionControl["ignore"])
    }
}

module.exports = VersionControl