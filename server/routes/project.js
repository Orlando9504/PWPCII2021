// Importar Router
import { Router } from 'express';

// TODO: Importar el controlador de proyectos
import projectController from '@server/controllers/projectController';

// Creando Instancia de Router
const router = new Router();

// "/projects" "/projects/index"
router.get(['/', '/index'], projectController.index);

// "/projects/add"
// sirve el formulario para agregar proyectos
router.get('/add', projectController.add);

// POST "/projects/add"
// Procesa el formulario
router.post(
    '/add',
    Validate({
      shape: projectValidator.projectSchema,
      getObject: projectValidator.getProject,
    }),
    projectController.addPost,
  );

export default router;