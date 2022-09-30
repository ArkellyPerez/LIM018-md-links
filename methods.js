const { readFileSync } = require('fs');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
//--------------Función que devuelve true si la ruta es absoluta y false si es relativa-----
const rutainicialisAbsoluta = (route) => {
  const routeisAbsolute = path.isAbsolute(route);
  return routeisAbsolute;
}
//--------------Función retorna la ruta absoluta-----
const convertirRutaRelativaAabsoluta = (ruta) => {
  return path.resolve(ruta);
}
// revisar stats para reducir lineas de codigo
//--------------Función retorna true si la ruta es un directorio y false si es un archivo
const routeIsDirectory = (routeAbsolute) => {
  const stats = fs.statSync(routeAbsolute)
  const isdirectory = stats.isDirectory(routeAbsolute);
  return (isdirectory);
}
//--------------Función retorna true si la ruta es un archivo.MD y false si no lo es
const fileExtencionIsMD = (routeAbsolute) => {
  const extencion = path.extname(routeAbsolute);
  //  console.log(" extencion..", extencion)
  if (extencion == '.md') {
    isFileMd = true;
  } else {
    isFileMd = false;
  }
  return (isFileMd);
}
//----Función que lee archivos MD y retorna un arreglo de objetos, donde se crea un objeto por cada link encontrado
const readFiles = (routeAbsolute) => {
  const arrayLinks = [];
  if (routeAbsolute !== '') {
    const fileContent = readFileSync(routeAbsolute, "utf-8");
    const arrayRoutesLinks = fileContent.match(/\[.*\]\(.*\)/g);// guardamos cada link en la constante arrayLinks
    if (routeAbsolute !== '' && arrayRoutesLinks !== null) {
      arrayRoutesLinks.map((url) => {
        const text = url.slice(1, url.indexOf(']'));
        const href = url.slice(url.indexOf(']') + 2, url.indexOf(')'));
        // const file = __dirname +'\\' +routeAbsolute1;
        const file = routeAbsolute;
        const objectLinks = {
          href,
          text,
          file,
        }
        arrayLinks.push(objectLinks);
      });
    }
  }
  return arrayLinks;
}
//----Función que valida cada link utilizando fetch y retorna una promesa
const validateLinks = (arrayLinks) => {
  const validatedLinksArray = arrayLinks.map(links => new Promise((resolve, reject) => {
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
        links.statusR = '';
        links.ok = 'Fail';
        resolve(links);
      });
  })
  );
  return Promise.all(validatedLinksArray);
};

const statsTotal = (arrayLinks) => {
  const totalLinks = arrayLinks.length;
  return totalLinks;
};

const statsUnique = (arrayLinks) => {
  const uniqueLinks = [...new Set(arrayLinks.map((link) => link.href))]
  //const uniqueLinks = arrayLinks.filter((link) => link.ok == 'OK')
  return uniqueLinks.length;
};


const statsBroken = (arrayLinks) => {
  const bloken = arrayLinks.filter((link) => link.ok == 'Fail')
  return bloken.length;
};

//path.join(__d revisar para usarlo si es posible
const readDirectory = (routeAbsolute, arrayLinks) => {
  const subDirectorysAndFiles = fs.readdirSync(routeAbsolute); // devuelve un array 

  subDirectorysAndFiles.forEach(dir => {
    const SubRouteAbsolute = path.join(routeAbsolute, dir);
    if (routeIsDirectory(SubRouteAbsolute)) {
      const DitTemp = readDirectory(SubRouteAbsolute, arrayLinks);
      DitTemp.forEach(dir2 => {
        const x = arrayLinks.push(dir2);
      })
    }
    else {
      if (fileExtencionIsMD(SubRouteAbsolute)) {
        arrayLinks = readFiles(SubRouteAbsolute);
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
  statsBroken,
  statsTotal,
  statsUnique,
  routeIsDirectory,
  readDirectory,
};