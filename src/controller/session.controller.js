class sessionController {
  callBack = (req, res) => {
    req.session.email = req.user.email;
    req.session.password = req.user.password;
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.age = req.user.age;
    req.session.rol = req.user.rol;

    res.redirect('/products');
  };

  loginGet = async (req, res) => {
    try {
      const title = "Aloha";
      return res.status(200).render("login", { title });
    } catch (err) {
      console.log(err);
      return res.status(500).render("error", { error: "Error en el servidor" });
    }
  }

  loginPost = async (req, res) => {
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstname: req.user.first_name,
      lastname: req.user.last_name,
      rol: req.user.rol,
      cart: req.user.cart,
    };
    console.log(req.session.user);
    return res.redirect("/products");
  }

  registerGet = async (req, res) => {
    try {
      const title = "Buzos Enzos bordo - Register";
      return res.status(200).render("register", { title });
    } catch (err) {
      console.log(err);
      return res.status(501).render("error", { error: "Error en el servidor" });
    }
  }

  register =  (req, res) => {
    if (!req.user) {
      return res.status(500).render("error", { error: "Error auth" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstname: req.user.first_name,
      lastname: req.user.last_name,
      rol: req.user.rol,
      cart: req.user.cart,
    };
    return res.redirect("/products");
  }

  logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/');
    });
  }

  current = (req, res) => {
    console.log('req' + req.session);
    return res.status(200).json({ user: req.session.user });
  }

}
export default new sessionController();
