const { existsSync, statSync, readFileSync, readFile, isDirectory, fstat } = require('fs');
const fs = require('fs');
const path = require('path');
//const stats = require('stats');
const fetch = require('node-fetch');

const rutainicialisAbsoluta = (route) => {
  const routeisAbsolute = path.isAbsolute(route);
  // console.log(" ruta es absoluta..", routeisAbsolute);
  return routeisAbsolute;
}

const convertirRutaRelativaAabsoluta = (ruta) => {
  // console.log(" ruta es  convetida  a absoluta..", path.resolve(ruta));

  return path.resolve(ruta);
}
// revisar stats para reducir lineas de codigo
const routeIsDirectory = (routeAbsolute) => {
  const stats = fs.statSync(routeAbsolute)

  const isdirectory = stats.isDirectory(routeAbsolute);
  //console.log(" funcion isDirectory:ruta es  cdorectorio=", routeAbsolute);
  return (isdirectory);
}
// 


const fileExtencionIsMD = (routeAbsolute1) => {
  const extencion = path.extname(routeAbsolute1);
  //  console.log(" extencion..", extencion)
  if (extencion == '.md') {
    isFileMd = true;
  } else {
    isFileMd = false;
  }
  //   console.log(" extencion.. final", isFileMd)
  return (isFileMd);
}

const readFiles = (routeAbsolute1) => { // funcion para leer archivos
  //console.log("rwad", routeAbsolute1);
  const arrayLinks = [];
  if (routeAbsolute1 !== '') {
    const fileContent = readFileSync(routeAbsolute1, "utf-8");
    const arrayRoutesLinks = fileContent.match(/\[.*\]\(.*\)/g);// guardamos cada link en la constante arrayLinks

    if (routeAbsolute1 !== '') {
      arrayRoutesLinks.map((url) => {
        const text = url.slice(1, url.indexOf(']'));
        const href = url.slice(url.indexOf(']') + 2, url.indexOf(')'));
        // const file = __dirname +'\\' +routeAbsolute1;
        const file = routeAbsolute1;
        // const statusR = '';
        // const ok = '';
        const objectLinks = {
          href,
          text,
          file,
          // statusR,
          // ok,
        }
        arrayLinks.push(objectLinks);
      });

      // console.log(arrayLinks);
      return arrayLinks;
    }
  }
}

const validateLinks = (arrayLinks) => {

  const validatedLinksArray = arrayLinks.map(links => new Promise((resolve, reject) => {
    //  const validatedLinksArray = arrayLinks.map(links => {
    fetch(links.href)
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
          links.statusR = response.status;
          links.ok = response.statusText;
          resolve(links);
        } else {
          links.statusR = response.status;
          links.ok = 'Fail';
          resolve(links);
        }
      }).catch(() => {
        // console.log("catch")
        links.statusR = '';
        links.ok = 'Fail';
        resolve(links);
      });
  })
  );
  return Promise.all(validatedLinksArray);
};

const stats = (arrayLinks) => {
  const totalLinks = arrayLinks.length;
  //const uniqueLinks=[...new Set(arrayLinks.map((link) => link.ok=='OK'))]
  const uniqueLinks = arrayLinks.filter((link) => link.ok == 'OK')
  //const bloken=[...new Set(arrayLinks.map((link) => link.ok=='Fail'))]
  const bloken = arrayLinks.filter((link) => link.ok == 'Fail')

  console.log("Stats: ", `total links :${totalLinks}`, ` Unique:${uniqueLinks.length}`, ` Broken :${bloken.length}`);
};
//path.join(__d revisar para usarlo si es posible
const readDirectory = (routeAbsolute, arrayLinks) => {
  const subDirectorysAndFiles = fs.readdirSync(routeAbsolute); // devuelve un array 

  subDirectorysAndFiles.forEach(dir => {
    const SubRouteAbsolute = path.join(routeAbsolute, dir);
    if (routeIsDirectory(SubRouteAbsolute)) {
    //  console.log("es un dir sub", SubRouteAbsolute);
      const DitTemp = readDirectory(SubRouteAbsolute, arrayLinks);
      DitTemp.forEach(dir2 => {
        const x = arrayLinks.push(dir2);
      })
    }
    else {
      console.log("es un archivo sub", SubRouteAbsolute)
      if (fileExtencionIsMD(SubRouteAbsolute)) {
        // console.log(" si es un archivo MD")
        arrayLinks = readFiles(SubRouteAbsolute);
     //   console.log(" si es un archivo MD", arrayLinks)
      }
    }
  });
  return arrayLinks;
};

module.exports = {
  rutainicialisAbsoluta,
  convertirRutaRelativaAabsoluta,
  fileExtencionIsMD,
  readFiles,
  validateLinks,
  stats,
  routeIsDirectory,
  readDirectory,
};