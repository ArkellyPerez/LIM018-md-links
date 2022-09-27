const {
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

} = require("../methods");
const { mdlinks } = require("../main");

jest.mock("node-fetch");
const fetch = require('node-fetch');


const testRoute = './test.md'
const testRouteAboluta = 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\test.md'
const testRouteAboluta2 = 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\prueba1.txt'
const testRouteAbolutaF = 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\pruebas\\testdir'

const arrayObjLinks= [{
  href: 'https://www.google.com',
  text: 'Esta es una imagen de ejemplo1',
  file: 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\test.md',

}]

const arrayObjLinksresultado = [{
  href: 'https://www.google.com',
  text: 'Esta es una imagen de ejemplo1',
  file: 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\test.md',
  statusR: 200,
  ok: 'OK',
}]
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const arrayLinksFail = [{
  href:  'https://ejemplo.com/imagen.jpg' ,
  text: 'Esta es una imagen de ejemplo',
  file: 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\pruebamd.md',

}]
const arrayLinksFailresultado = [{
  href:  'https://ejemplo.com/imagen.jpg' ,
  text: 'Esta es una imagen de ejemplo',
  file: 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\pruebamd.md',
  statusR:'',
  ok: 'Fail',
}]
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


const arrayResultadosrecursividad = [{
  href: 'https://www.google.com',
  text: 'Esta es una imagen de ejemplo1',
  file: 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\pruebas\\testdir\\testfile\\testrec.md',
}]
const arrayResultados = [{
  href: 'https://www.google.com',
  text: 'Esta es una imagen de ejemplo1',
  file: 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\pruebas\\testdir\\testfile\\testrec.md',
  statusR: 200,
  ok: 'OK',
}]
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const arrayObjLinks11= [{
  href: 'https://www.google.com',
  text: 'Esta es una imagen de ejemplo1',
  file: 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\test.md',

}]

describe('tipoRutafuncion', () => {
  it('deberia ser una funcion', () => {
    expect(typeof rutainicialisAbsoluta).toBe('function');
  });

  it('DeberÍa indicar tru si la ruta es absoluta', () => {
    expect(rutainicialisAbsoluta(testRouteAboluta)).toEqual(true);
  });
  it('DeberÍa indicar false si la ruta no es absoluta', () => {
    expect(rutainicialisAbsoluta(testRoute)).toEqual(false);
  });

});

describe('fileExtencionIsMD', () => {
  it('is a function', () => {
    expect(typeof fileExtencionIsMD).toBe('function');
  });
  it('DeberÍa indicar tru si la extención es .MD', () => {
    expect(fileExtencionIsMD(testRouteAboluta)).toEqual(true);
  });
  it('DeberÍa indicar false si la extención no es .MD', () => {
    expect(fileExtencionIsMD(testRouteAboluta2)).toEqual(false);
  });
});

describe('convertirRutaRelativaAabsoluta', () => {
  it('is a function', () => {
    expect(typeof convertirRutaRelativaAabsoluta).toBe('function');
  });

  it('DeberÍa indicar tru si la extención es .MD', () => {
    expect(convertirRutaRelativaAabsoluta(testRoute)).toEqual(testRouteAboluta);
  });
});

describe('readFiles', () => {
  it('is a function', () => {
    expect(typeof readFiles).toBe('function');
  });

  it('DeberÍa indicar si tiene links el archivo', () => {
    expect(readFiles(testRouteAboluta)).toEqual(arrayObjLinks);
  });
});

describe('routeIsDirectory ', () => {
  it('is a function', () => {
    expect(typeof routeIsDirectory).toBe('function');
  });

  it('DeberÍa indicar sila ruta es directorio o no', () => {
    expect(routeIsDirectory(testRouteAboluta)).toEqual(false);
  });
});

describe('statsTotal  ', () => {
  it('is a function', () => {
    expect(typeof statsTotal).toBe('function');
  });

  it('DeberÍa indicar el total de links encontrados', () => {
    expect(statsTotal(arrayObjLinks)).toEqual(1);
  });
});
//..................................................................
describe(' statsUnique ', () => {
  it('is a function', () => {
    expect(typeof statsUnique).toBe('function');
  });
  it('DeberÍa indicar el total de links únicos encontrados', () => {
    expect(statsUnique(arrayObjLinks)).toEqual(1);
  });
});
//..
//....................................................................

//..................................................................
describe('   statsBroken', () => {
  it('is a function', () => {
    expect(typeof statsBroken).toBe('function');
  });
  it('DeberÍa indicar el total de links rotos encontrados', () => {
    expect(statsBroken(arrayObjLinks)).toEqual(0);
  });
});

//..................................................................
describe('readDirectory', () => {
  it('is a function', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('DeberÍa retornar los links encontrados con recursividad', () => {
    expect(readDirectory(testRouteAbolutaF, [])).toEqual(arrayResultadosrecursividad);
  });
});

//....................................................................

describe('validateLinks', () => {
  it('is a function', () => {
    expect(typeof validateLinks).toBe('function');
  });

  it('DeberÍa indicar retornar Fetch Status y StatusText', () => {
    const objrespta = {
      status: 200,
      statusText: 'OK',
    }
    fetch.mockResolvedValue(objrespta);
    validateLinks(arrayObjLinks)
      .then((response) => {
        expect(response).toEqual(arrayObjLinksresultado)
      });
  });

  it('DeberÍa indicar retornar Fetch: Status  y StatusText  Fail', () => {
    const objrespta = {
      status:'',
      statusText:'Fail',
    }
    fetch.mockResolvedValue(objrespta);
    validateLinks(arrayObjLinksresultado)
      .then((response) => {
        expect(response).toEqual(arrayObjLinksresultado)
      });
  });

  // it('DeberÍa indicar error al no encontrar los links', () => {// catch

  //   validateLinks(arrayLinksFail)
  //     .then((response) => {
  //       expect(response).toEqual(arrayLinksFailresultado)
  //     });
  // });

});

//..................................................................
describe(' mdlinks', () => {
  it('is a function', () => {
    expect(typeof  mdlinks).toBe('function');
  });

  // it('DeberÍa retornar un string de archivo no es MD', () => {
  // return expect( mdlinks(testRouteAboluta2,{ validate: false })).resolves.toContainEqual("No es un archivo MD");
  //  });

  it('DeberÍa retornar un string de archivo no es MD', () => {

    mdlinks('D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\prueba1.txt',{ validate: false })
    .then((response) => {
      expect(response).toEqual("No es un archivo MD")
    });
  });


  it('entrada es un directorio', () => {

    mdlinks(testRouteAbolutaF,{ validate: false })
    .then((response) => {
      expect(response).toEqual(arrayResultadosrecursividad)
    });
  });


  it('entrada es una ruta absoluta', () => {

    mdlinks('D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\test.md',{ validate: false })
    .then((response) => {
      expect(response).toEqual(arrayObjLinks11)
    });
  });


  it('DeberÍa retornar una  array de promesas de link sin validar', () => {

    mdlinks(testRoute,{ validate: false })
    .then((response) => {
      expect(response).toEqual(arrayObjLinks11)
    });
  });

  it('DeberÍa retornar una  array de promesas de link validados', () => {

    mdlinks(testRoute,{ validate: true })
    .then((response) => {
      expect(response).toEqual(arrayObjLinksresultado)
    });
  });


});