import express from "express";
import passport from "passport";
export const sessionRouter = express.Router();

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.email = req.user.email;
    req.session.password = req.user.password;
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.age = req.user.age;
    req.session.rol = req.user.rol;

    res.redirect("/products");
  }
);
sessionRouter.get("/login", async (req, res) => {
  try {
    const title = "Aloha";
    return res.status(200).render("login", { title });
  } catch (err) {
    console.log(err);
    return res.status(500).render("error", { error: "Error en el servidor" });
  }
});

//TODO #4
sessionRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login" }),
  async (req, res) => {
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
);

sessionRouter.get("/register", async (req, res) => {
  try {
    const title = "Fuego Burgers® - Register";
    return res.status(200).render("register", { title });
  } catch (err) {
    console.log(err);
    return res.status(501).render("error", { error: "Error en el servidor" });
  }
});

//TODO #4
sessionRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user) {
      //TODO #5
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
);

sessionRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
    }
    res.redirect("/");
  });
});

sessionRouter.get("/current", (req, res) => {
  console.log("req" + req.session);
  return res.status(200).json({ user: req.session.user });
});
