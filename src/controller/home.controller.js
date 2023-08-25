class homeController{
  homeTitle = async (req, res) => {
    try {
      const title = "Enzos eShop";
      const first_name = req.session.user;
      const rol = req.session.rol;
      return res.status(200).render("home", { title, first_name, rol });
    } catch (err) {
      console.log(err);
      return res.status(500).render("error", {error: "Error en el servidor"});
    }
  };

  getLoggertest = async (req, res) => {
    try {
      req.logger.debug('Este es un mensaje de depuración.');
      req.logger.http('Este es un mensaje HTTP.');
      req.logger.info('Este es un mensaje de información.');
      req.logger.warn('Este es un mensaje de advertencia.');
      req.logger.error('Este es un mensaje de error.');
      req.logger.fatal('Este es un mensaje fatal.');

      return res.status(200).json({ status: 'success', msg: 'Esto es un test, mirar consola de node.' });
    } catch (error) {
      req.logger.error(error);
    }
  };
}

export default new homeController();
