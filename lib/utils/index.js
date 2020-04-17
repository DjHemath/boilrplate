const fs = require("fs")
class Utils{
    static readJson(path){
        return JSON.parse(fs.readFileSync(path))
    }

    static createJson(path, data){
        return fs.writeFileSync(path, JSON.stringify(data))
    }

    static writeFile(path, data){
        return fs.writeFileSync(path, data)
    }

    static creatDirIfNotExist(path){
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    }
}

module.exports = Utils