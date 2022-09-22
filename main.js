const {
    rutainicialisAbsoluta,
    convertirRutaRelativaAabsoluta,
    fileExtencionIsMD,
    readFiles,
    validateLinks,
    stats,
} = require("./methods");


const { existsSync, } = require('fs');
//const path = require('path');
const fetch = require('node-fetch');
//import {  mdLinks } from 'main.js';
//const mdLinks = require("main.js").mdLinks;
//const cosa = require("main.js").cosa;
//mdLinks('./pruebamd.md');

const httpPetition = (arrObjLinks) => {
    //   console.log('Desde node', arrObjLinks);
    const arrPromise = arrObjLinks.map((obj) =>
        fetch(obj)
            .then((res) => ({
                href: obj.href,
                text: obj.text,
                file: obj.fileName,
                statusR: res.status,
                ok: res.ok ? "OK" : "FAIL"
            }))
            .catch(() => ({
                href: obj.href,
                text: obj.text,
                file: obj.fileName,
                statusR: 404,
                ok: "FAIL",
            }))
    );
    //  console.log("all11",Promise.all(arrPromise))
    return Promise.all(arrPromise);
};



//.............................................................



//.........................otra forma...............................................
// const arrayPromesa = [];
// console.log("ger",arrayLinks);
// for (let i = 0; i < arrayLinks.length; i++) {
//     const promise = fetch(arrayLinks[i].href).then(console.log).catch(console.log)
//     arrayPromesa.push(promise)
//     //arrayPromesa.push(fetch(arrayLinks[i].href));
// }
// console.log(arrayPromesa);
// //return Promise.allSettled(arrayPromesa);// retorna una promesa
// return Promise.all(arrayPromesa);// retorna una promesa
//};


// function mdLinks(route) {
//     const routeAbsolute = route; // evaluar como eliminar esta linea
//     const routeisAbsolute = tipoRutafuncion(route);//retorna un booleando 
//     if (existsSync(routeAbsolute)) {//recibe una ruta que puede ser una string, un búfer o una URL- retorna una booleano si existe la ruta o no
//         //  console.log(" ruta si existe");
//         if (routeisAbsolute) {
//             console.log(" ruta es absoluta..", routeisAbsolute);
//             const routeAbsolute = routeisAbsolute;
//         } else {
//             console.log(" ruta es relativa.");
//             const routeAbsolute = convertirRutaRelativaAabsoluta(route);
//         }

//         //  if (existsSync(routeAbsolute)) {//recibe una ruta que puede ser una string, un búfer o una URL- retorna una booleano si existe la ruta o no
//         const isFileMd = fileExtencion(routeAbsolute);
//         if (isFileMd) {
//             console.log(" si es un archivo MD")
//             const arrayLinks = readFiles(routeAbsolute);
//             if (arrayLinks !== "") {
//                 validateLinks(arrayLinks).then((response) => {
//                     resolve(response);
//                 });
//                 //...............rubis....................................
//                 //     console.log("arreglo con links")
//                 //     httpPetition(objectLinks).then((response) => {
//                 //         resolve(response);
//                 //         });
//                 //..............otra forma.........................................................
//                 // getAllLinksPromise(arrayLinks).then((results) => console.log(results));

//                 console.log("arreglo con links2 dxxx0")
//             }
//             else {
//                 console.log("arreglo sin links")
//             }
//         }
//         else { console.log(" no es un archivo MD, fin"); }
//     } else {
//         console.log(" ruta no existe, fin");
//     }



//     //const objValidarRuta=validarRutaAbsoluta('prueba1.txt');
//     //console.log(" leer contendo del archivo",readFileSync(objValidarRuta.rutaAbsoluta, "utf-8"));//leemos el archivo
// };

const mdlinks = (route, options = { validate, stats }) => {
    new Promise((resolve, reject) => {
        let routeAbsolute = route; // evaluar como eliminar esta linea
        const routeisAbsolute = rutainicialisAbsoluta(route);//retorna un booleando 
        if (existsSync(route)) {//recibe una ruta que puede ser una string, un búfer o una URL- retorna una booleano si existe la ruta o no
            console.log(" ruta si existe");
            if (routeisAbsolute) {
                console.log(" ruta es absoluta..", routeisAbsolute);
                routeAbsolute = routeisAbsolute;
            } else {
                console.log(" ruta es relativa.");
                routeAbsolute = convertirRutaRelativaAabsoluta(route);
            }
            const isFileMd = fileExtencionIsMD(routeAbsolute);
            if (isFileMd) {
                console.log(" si es un archivo MD")
                const arrayLinks = readFiles(routeAbsolute);
                if (options.validate == true) {
                    if (arrayLinks !== "") {
                        validateLinks(arrayLinks)
                            .then((response) => {
                                // console.log(" validate=true", response);
                                resolve(response);
                                console.log(" validate=true", arrayLinks);
                                if (options.stats == true) {
                                    stats(arrayLinks);
                                }
                            });
                        //...............rs....................................
                        //     console.log("arreglo con links")
                        //     httpPetition(objectLinks).then((response) => {
                        //         resolve(response);
                        //         });
                        //..............otra forma.........................................................
                        // getAllLinksPromise(arrayLinks).then((results) => console.log(results));

                        //  console.log("validate=true", arrayLinks)
                    }
                    else {
                        console.log("archivo sin links")
                        //   reject("ARCHIVO SIN LINKS");
                    }
                } else {
                    console.log(" validate=false", arrayLinks);
                }
            }
            else {
                console.log(" no es un archivo MD, fin");
                // reject("NO ES UN ARCHIVO MD");
            }
        } else {
            console.log(" ruta no existe, fin");
            // reject("RUTA NO EXISTE");
        }
        //   console.log(" fin", arrayLinks);
    });
};
mdlinks('./pruebamd.md', { validate: false, stats: true});
