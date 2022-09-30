#!/usr/bin/env node
//Indica que este programa se ejecuta con node
const {
    mdlinks,
} = require("./main");
const {
    statsBroken,
    statsTotal,
    statsUnique,
} = require("./methods");

const process = require('node:process');
const arg = process.argv;
const route = process.argv[2];
const validate = arg.includes('--validate');
const stats = arg.includes('--stats');
const help = arg.includes('--help');


if (help) {
    console.log(`
----------------------------------------------------------------------------\n
                                   HELP                                     \n
----------------------------------------------------------------------------\n
Las estructura que debes seguir es la siguiente:  md-links-ar + ruta + options
    Ejemplos:
    md-links-ar ./pruebas/file1.md
    md-links-ar ./pruebas/file1.md --validate
    md-links-ar ./pruebas/file1.md --validate --stats

La descripción de OPTIONS con respecto a los resultados que puedes obtener es la siguiente:

    ＯＰＴＩＯＮＳ\n
     --validate 
        * href: URL encontrada.
        * text: Texto que aparecía dentro del link.
        * file: Ruta del archivo donde se encontró el link.
        * status: Código de respuesta HTTP.
        * ok: Mensaje fail en caso de fallo u ok en caso de éxito.
     --stats
        * Total: total de links encontrados.
        * Unique: total de links unicos encontrados.
     --stats --validate
        * Total: total de links encontrados.
        * Unique: total de links unicos encontrados.
        * Broke: total de links rotos.\n
--------------------------------------------------------------------------------\n
--------------------------------------------------------------------------------`)
}

if (route==null) {
    console.table("Por favor ingresar una ruta");
}else{ 
if (!validate && !stats) {
    mdlinks(route, { validate: false })
        .then(links => {
            console.table(links);
        })
        .catch(error => console.log(error));
}
if (validate && !stats) {
    mdlinks(route, { validate: true })
        .then(links => {
            let i = 2;
            console.table(links);
        })
        .catch(error => console.log(error));
}
if (!validate && stats) {
    mdlinks(route, { validate: false })
        .then(links => {
            console.log("----------------------------");
            console.log("|---------STATS------------|");
            console.log("|        TOTAL:", statsTotal(links), "        |");
            console.log("|        UNIQUE:", statsUnique(links), "        |");
            console.log("|--------------------------|");
        })
        .catch(error => console.log(error));
}
if (validate && stats) {
    mdlinks(route, { validate: true })
        .then(links => {
            console.table(links);
            console.log("------------------------------");
            console.log("|----------STATS-------------|");
            console.log("|        TOTAL:", statsTotal(links), "           |");
            console.log("|        UNIQUE:", statsUnique(links), "          |");
            console.log("|        BROKEN:", statsBroken(links), "          |");
            console.log("|----------------------------|");
        })
        .catch(error => console.log(error));
}
}
// //mdlinks('./pruebas', { validate: false });
// //mdlinks('./pruebamd.md', { validate: false});
//mdlinks-ar ./pruebas/file1.md