const {
    rutainicialisAbsoluta,
    convertirRutaRelativaAabsoluta,
    fileExtencionIsMD,
    readFiles,
    validateLinks,
    routeIsDirectory,
    readDirectory,
} = require("./methods");

const { existsSync, } = require('fs');

const mdlinks = (route, options = { validate }) => {
    return new Promise((resolve, reject) => {
        let arrayLinks = [];
        let routeAbsolute = route; // evaluar como eliminar esta linea
        const routeisAbsolute = rutainicialisAbsoluta(route);//retorna un booleando 
        //  if (existsSync(route)) {//recibe una ruta que puede ser una string, un búfer o una URL- retorna una booleano si existe la ruta o no
        if (routeisAbsolute) {
            routeAbsolute = route;
        } else {
            routeAbsolute = convertirRutaRelativaAabsoluta(route);
        }
        if (existsSync(route)) {
            if (routeIsDirectory(routeAbsolute)) {
                arrayLinks = readDirectory(routeAbsolute, arrayLinks);
            } else {
                if (fileExtencionIsMD(routeAbsolute)) {
                    arrayLinks = readFiles(routeAbsolute);
                }
                else {
                    reject("No es un archivo MD");
                }
            }
            if (arrayLinks == '') {
                reject("ARCHIVO NO CONTIENE LINKS");
            }
            else {
                if (options.validate == true) {
                    validateLinks(arrayLinks)
                        .then((response) => {
                            resolve(response);
                        });
                }
                else {
                    resolve(arrayLinks);
                }
            }
        } else {
            reject("RUTA NO EXISTE, POR FAVOR INGRESAR UNA RUTA VÁLIDA");
        }
    });
};

module.exports = {
    mdlinks,
};
