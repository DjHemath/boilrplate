class Js{
    comment(text){
        return `//${text}`
    }

    exportModule(name){
        return `module.exports = ${name}`
    }

    functionCall(name, parameters=[]){
        let txt = `${name}(`
        if(parameters.length !== 0){
            parameters.forEach(parameter => {
                txt += `${parameter},`
            })
        }
        if(txt[txt.length-1] === ",")
            txt = txt.slice(0, -1)
        txt += `)`

        return txt
    }

    functionCallFromObject(objectName, functionName, functionParameters){
        return `${objectName}.` + this.functionCall(functionName, functionParameters)
    }

    middleWare(type, mid){
        if(type === "normal"){
            return `app.use(${mid})`
        }
        else if(type === "router"){
            if(mid.length === 1){
                return `app.use(${mid})`
            }
            else if(mid.length === 2){
                return `app.use("${mid[0]}", ${mid[1]})`
            }
        }
    }

    variable(type, variable, value){
        return `${type} ${variable} = ${value}`
    }
}

module.exports = Js