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
// //mdlinks('./pruebas', { validate: false });
// //mdlinks('./pruebamd.md', { validate: false});
//md-links-ar ./pruebas/file1.md