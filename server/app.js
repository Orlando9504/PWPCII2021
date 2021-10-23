/* eslint-disable no-console */

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import winston from '@server/config/winston';

// Importando Router Priciapal
import router from '@server/routes/index';
// import indexRouter from '@s-routes/index';
// import usersRouter from '@s-routes/users';

// importando configuraciones
import configTemplateEngine from '@s-config/template-engine'

// Webpack modulos
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import webpackDevConfig from '../webpack.dev.config';

// Consultar el modo en que se esta ejecutando el programa
const env = process.env.NODE_ENV || 'development';

// Se crea la aplicacion express
const app = express();

// Verificando el modo de ejecución de la aplicación

if (env === 'development') {
  console.log('> Execting in Development Mode: Webpack Hot Reloading');
  //  timeout=1000: Tiempo de espera entre recarga y recarga de la pagina
  //  paso 1 = Agregando la ruta de HMR
  //  reload habilita la recarga del frontend cuando hay cambios en el codigo fuente
  //  fuente del frontend
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Paso 2. Agregamos el plugin
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Paso 3. Crear el compilador de webpack
  const compiler = webpack(webpackConfig);

  // paso 4 Agregamdo el Middleware a la cadena de middlewares de nuestra aplicacion
  app.use(
    WebpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
    }),
  );
  // paso 5. Agregando el webpack hot middleware
  app.use(WebpackHotMiddleware(compiler));
} else {
  console.log('>Executing in Production Mode...');
}

// view engine setup
configTemplateEngine(app);

app.use(morgan('dev', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

router.addRoutes(app);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // Log
  winston.console.error(
    `Code: 404, Mesage: Page Not Found, URL: ${req.originalUrl}, Method: ${req.method}`,
  );
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Logeando con winston
  winston.console.error(
    ` status: ${err.status || 500}, Message: ${err.message}, Method: ${
      req.method
    }, IP: ${req.ip}`,
  );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
