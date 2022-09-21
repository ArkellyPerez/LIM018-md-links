const {
  rutainicialisAbsoluta,
  convertirRutaRelativaAabsoluta,
  fileExtencionIsMD,
  readFiles,
  validateLinks,
} = require("../methods");

const testRoute = './pruebamd.md'
const testRouteAboluta = 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\pruebamd.md'
const testRouteAboluta2 = 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\prueba1.txt'
const arrayObjLinks=[{
  href: 'https://www.google.com',
  text: 'Esta es una imagen de ejemplo1',
  file: 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\./pruebamd.md',
  statusR: '',
  ok: ''
}]

const arrayResultados=[{
  href: 'https://www.google.com',
  text: 'Esta es una imagen de ejemplo1',
  file: 'D:\\ARKELLY\\CAPACITACIONES\\LABORATORIA\\LIMA-18\\LIM018-md-links\\./pruebamd.md',
  statusR: 200,
  ok: 'OK',
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
    expect(readFiles(testRoute)).toEqual(arrayObjLinks);
  });
});


describe('validateLinks', () => {
  it('is a function', () => {
    expect(typeof validateLinks).toBe('function');
  });

  // it('DeberÍa indicar si tiene links el archivo', () => {
  //   expect(validateLinks(arrayObjLinks)).resolve.toEqual(arrayResultados);
  // });
});
