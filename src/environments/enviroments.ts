//este archivo reemplaza al environment.ts, se llama asi para que angular lo reconozca como el archivo de configuracion
// de ambiente, y se le asigna el valor de produccion o no dependiendo del ambiente en el que se este trabajando, esto
// se hace para evitar tener que cambiar el valor de produccion manualmente cada vez que se quiera hacer una build
// para produccion o para desarrollo, y asi evitar errores humanos.

export const environment = {
  production: false,
  url_api: 'http://127.0.0.1:8080',
}
