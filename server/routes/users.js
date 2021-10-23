import { Router } from 'express';

// Importando el controlador
import userController from '../controllers/userControllers';

// Creando instancia de router

const router = new Router();

/* GET users listing. */
router.get('/', userController.index);

module.exports = router;
