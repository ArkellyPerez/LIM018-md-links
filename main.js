const { existsSync, readFileSync, readFile } = require('fs');
const path = require('path');
const fetch = require('node-fetch');
//import {  mdLinks } from 'main.js';
//const mdLinks = require("main.js").mdLinks;
//const cosa = require("main.js").cosa;
mdLinks('./pruebamd.md');

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
    console.log(" extencion.. final", isFileMd)
    return (isFileMd);
}

function readFiles(routeAbsolute1) { // funcion para leer archivos
    const arrayLinks = [];
    if (routeAbsolute1 !== '') {
        const fileContent = readFileSync(routeAbsolute1, "utf-8");
        const arrayRoutesLinks = fileContent.match(/\[.*\]\(.*\)/g);// guardamos cada link en la constante arrayLinks

        if (routeAbsolute1 !== '') {
            arrayRoutesLinks.map((url) => {
                const text = url.slice(1, url.indexOf(']'));
                const href = url.slice(url.indexOf(']') + 2, url.indexOf(')'));
                const routeF = __dirname + routeAbsolute1;
                const objectLinks = {
                    href,
                    text,
                    routeF,
                }
                arrayLinks.push(objectLinks);
            });

            // console.log(arrayLinks);
            return arrayLinks;
        }
    }
}


function validateLinks(allLinksPromise) {
    Promise.allSettled(arrayPromesa);
}


function getAllLinksPromise(arrayLinks) {

    const validatedLinksArray = arrayLinks.map(links => new Promise((resolve, reject) => {
        return fetch(links.href)
          .then(response => {
            console.log("then",response)
            if (response.status >= 200 && response.status < 400) {
              links.status = response.status;
              links.statusText = response.statusText;
              resolve(links);
            } else {
              links.status = response.status;
              links.statusText = 'Fail';
              resolve(links);
            }
          }).catch(() => {
            console.log("catch")
            links.status = '';
            links.statusText = 'Not Found';
            resolve(links);
          });
      }));

      return Promise.all(validatedLinksArray);
    };

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


function mdLinks(route) {
    const routeAbsolute = route; // evaluar como eliminar esta linea
    const routeisAbsolute = tipoRutafuncion(route);//retorna un booleando 
    if (existsSync(route)) {//recibe una ruta que puede ser una string, un búfer o una URL- retorna una booleano si existe la ruta o no
        console.log(" ruta si existe");
        if (routeisAbsolute) {
            console.log(" ruta es absoluta..", routeisAbsolute);
            const routeAbsolute = routeisAbsolute;
        } else {
            console.log(" ruta es relativa.");
            const routeAbsolute = convertirRutaRelativaAabsoluta(route);
        }
        const isFileMd = fileExtencion(routeAbsolute);
        if (isFileMd) {
            console.log(" si es un archivo MD")
            const arrayLinks = readFiles(routeAbsolute);
            if (arrayLinks !== "") {
                console.log("arreglo con links")
                const x= getAllLinksPromise(arrayLinks)
//..............otra forma.........................................................
               // getAllLinksPromise(arrayLinks).then((results) => console.log(results));
              
                console.log("arreglo con links2")
            }
            else {
                console.log("arreglo sin links")
            }
        }
        else { console.log(" no es un archivo MD, fin"); }
    } else {
        console.log(" ruta no existe, fin");
    }



    //const objValidarRuta=validarRutaAbsoluta('prueba1.txt');
    //console.log(" leer contendo del archivo",readFileSync(objValidarRuta.rutaAbsoluta, "utf-8"));//leemos el archivo
};











// module.exports = {
//     mdLinks
// };