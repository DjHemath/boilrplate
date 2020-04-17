const fs = require("fs");

const Utils = require("../utils")

class ReadSpec{
    readSpec(){
        let specfile = process.cwd() + "\\gen.json"
        let readJson = Utils.readJson(specfile)
        return readJson
    }
}

module.exports = ReadSpec