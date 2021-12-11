// Action Methods
// "/projects"
const index = (req, res) => {
  res.send('Respondiendo a "/Projects/index"');
};

// GET "/projects/add"
const add = (req, res) => {
  res.render('project/addView');
};

// POST "/projects/add"
const addPost = (req, res) => {
  // Rescatando la información del formulario
  const { validData, errorData } = req;
  // Creando view models
  let project = {};
  let errorModel = {};
  // Verificando errores
  if (errorData) {
    // Rescatar objeto validado
    project = errorData.value;
    // Usar reduce y generar errores a partir de inner
    errorModel = errorData.inner.reduce((prev, curr) => {
      // Crear variable temp 
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});
  } else {
    project = validData;
  }
  res.render('project/addView', { project, errorModel });
};

// Pendiente por programar
export default {
  add,
  addPost,
  index,
};
