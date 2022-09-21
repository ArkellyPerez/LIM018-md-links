const { existsSync, readFileSync, readFile } = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const rutainicialisAbsoluta = (route) => {
  const routeisAbsolute = path.isAbsolute(route);
  console.log(" ruta es absoluta..", routeisAbsolute);
  return routeisAbsolute;
}

const convertirRutaRelativaAabsoluta = (ruta) => {
  // console.log(" ruta es  convetida  a absoluta..", path.resolve(ruta));

  return path.resolve(ruta);
}
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
  console.log("rwad", routeAbsolute1);
  const arrayLinks = [];
  if (routeAbsolute1 !== '') {
    const fileContent = readFileSync(routeAbsolute1, "utf-8");
    const arrayRoutesLinks = fileContent.match(/\[.*\]\(.*\)/g);// guardamos cada link en la constante arrayLinks

    if (routeAbsolute1 !== '') {
      arrayRoutesLinks.map((url) => {
        const text = url.slice(1, url.indexOf(']'));
        const href = url.slice(url.indexOf(']') + 2, url.indexOf(')'));
        const file = __dirname +'\\' +routeAbsolute1;
        const statusR = '';
        const ok = '';
        const objectLinks = {
          href,
          text,
          file,
          statusR,
          ok,
        }
        arrayLinks.push(objectLinks);
      });

      // console.log(arrayLinks);
      return arrayLinks;
    }
  }
}

const validateLinks = (arrayLinks) => {
  //console.log("arraylinkss legA",arrayLinks)
  const validatedLinksArray = arrayLinks.map(links => new Promise((resolve, reject) => {
    //  const validatedLinksArray = arrayLinks.map(links => {
    fetch(links.href)
      .then(response => {
        //  console.log("then",response.status)
        if (response.status >= 200 && response.status < 400) {
          links.statusR = response.status;
          links.ok = response.statusText;
          // console.log("then link", links.statusR,validatedLinksArray )

          resolve(links);
        } else {
          links.statusR = response.status;
          links.ok = 'Fail';
          resolve(links);
        }
      }).catch(() => {
        // console.log("catch")
        links.statusR = '';
        links.ok = 'Link no encontrado';
        resolve(links);
      });
  })
  );
  //  console.log("all11",Promise.all(validatedLinksArray))
  //  console.log("alllinkss 222",validatedLinksArray)
  return Promise.all(validatedLinksArray);
};


module.exports = {
  rutainicialisAbsoluta,
  convertirRutaRelativaAabsoluta,
  fileExtencionIsMD,
  readFiles,
  validateLinks,
};