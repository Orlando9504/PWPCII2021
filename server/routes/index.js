// Importando el router de home
import homeRouter from './home';
import userRouter from './users';

/* GET home page. */
// router.use('/', homeRouter);
// router.use('/users', userRouter);
const addRoutes = (app) => {
  app.use('/', homeRouter);
  app.use('/users', userRouter);
  return app;
};

export default {
  addRoutes,
};
