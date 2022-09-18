const { existsSync, readFileSync, readFile } = require('fs');
const path = require('path');
//import {  mdLinks } from 'main.js';
//const mdLinks = require("main.js").mdLinks;
//const cosa = require("main.js").cosa;
mdLinks();
// function validarRutaAbsoluta(ruta) {

//     const absolutePath = path.join(__dirname, ruta);//obtenemos la ruta absoluta- __dirname nos da el directorio donde nos encontramos
//     const pathExtension = path.extname(absolutePath);// obtenemos la extencion del archivo
//     console.log(pathExtension, 'The path si existsdd.', absolutePath);
//     console.log('The path existsynk', existsSync(absolutePath));

//     if (existsSync(absolutePath)) {//recibe una ruta que puede ser una string, un búfer o una URL- retorna una booleano si existe la ruta o no
//         const objValidarRuta = {
//             rutaAbsoluta: absolutePath,
//             flagRutaValida: 1
//         };

//         console.log('The path exists. extencion', objValidarRuta);
//         return (objValidarRuta);
//     }
//     else {
//         console.log('The path no existsdd.');
//         const objValidarRuta = {
//             rutaAbsoluta: '',
//             flagRutaValida: 0
//         };
//         return (objValidarRuta);
//     }


// }
function tipoRutafuncion(route) {
    const routeisAbsolute = path.isAbsolute(route);
    console.log(" ruta es absoluta..", routeisAbsolute);
    return routeisAbsolute;
}

function convertirRutaRelativaAabsoluta(ruta) {
    console.log(" ruta es  convetida  a absoluta..", path.resolve(ruta));

    return path.resolve(ruta);
}
function fileExtencion(routeAbsolute1) {
    const extencion = path.extname(routeAbsolute1);
    console.log(" extencion..", extencion)
    if (extencion == '.md') {
        isFileMd = true;
    } else {
        isFileMd = false;
    }
    return (isFileMd);
}


function mdLinks() {
    const routeAbsolute = './pruebamd.md';
    const routeisAbsolute = tipoRutafuncion('pruebamd.md');//retorna un booleando 
    if (existsSync(routeAbsolute)) {//recibe una ruta que puede ser una string, un búfer o una URL- retorna una booleano si existe la ruta o no
        console.log(" ruta si existe");
        if (routeisAbsolute) {
            console.log(" ruta es absoluta..", routeisAbsolute);
            const routeAbsolute = routeisAbsolute;
        } else {
            console.log(" ruta es relativa.");
            const routeAbsolute = convertirRutaRelativaAabsoluta('pruebamd.md');
        }
        const isFileMd = fileExtencion(routeAbsolute);
        if (isFileMd) { readFile(routeAbsolute) }
        else { console.log(" no es un archivo MD"); }
    } else {
        console.log(" ruta no existe");
    }



    //const objValidarRuta=validarRutaAbsoluta('prueba1.txt');
    //console.log(" leer contendo del archivo",readFileSync(objValidarRuta.rutaAbsoluta, "utf-8"));//leemos el archivo
};











// module.exports = {
//     mdLinks
// };