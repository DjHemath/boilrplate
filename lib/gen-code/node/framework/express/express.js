const js = require("../js")

class Express{
    constructor(){
        this.js = new js()
    }

    createApp(){
        return "const app = express()"
    }

    importDependency(depname){
        return this.js.functionCall("require", [`"${depname}"`])
    }

    importDependencyWithVariable(variable, depname){
        return this.js.variable("const", variable, this.importDependency(depname))
    }

    listen(port, cb="()=>{}"){
        return this.js.functionCallFromObject("app", "listen", [port, cb])
    }

    middleware(type, middleware){
        if(type === "normal")
            return this.js.functionCallFromObject("app", "use", [middleware])
        else if(type === "router")
            return this.js.functionCallFromObject("app", "use", [`"${middleware[0]}"`, middleware[1]])
    }
}

module.exports = Express