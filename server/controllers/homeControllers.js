const index = (req, res) => {
  /* View Model */
  res.render('index', {
    title: 'ProjNotes',
  });
};
const greeting = (req, res) => {
  res.status(200).json({
    message: 'Hola Campeon del FullStarck',
  });
}

export default {
  index,
  greeting,
};
