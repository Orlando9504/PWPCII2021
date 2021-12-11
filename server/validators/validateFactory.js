// Usando el patron factoru para la creacion de middlewares de validación
const Validator =
  ({ shape, getObject }) =>
  async (req, res, next) => {
    // construyendo el objeto validador
    const dataObject = getObject(req);
    // Realizar Validación
    try {
      // Se valida objeto
      const validData = await shape.validate(dataObject, { abortEarly: false });
      // Inyectar objeto validado a peticion
      req.validData = validData;
      // Se invoca siguiente middleware de cadena
    } catch (error) {
      // En caso error agregar objeto en la peticion
      req.errorData = error;
    }
    return next();
  };

// Eportando validador
export default Validator;
