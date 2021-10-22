import ExpHbs from 'express-handlebars';
import path from 'path';

// 1. Exportando una función de configuración
export default (app) => {
  app.engine(
    'hbs',
    ExpHbs({
      extname: '.hbs',
      defaultLayout: 'main',
    }),
  );

  // 2. Seleccionar el motor de plantillas recien registrado
  app.set('view engine', 'hbs');
  // 3. Estableciendo la ruta de la vistas
  app.set('views', path.join(__dirname, '..', 'views'));

  // 4. Retornamos el valor de entrada
  return app;
};
