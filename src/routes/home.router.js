import express from "express";
export const home = express.Router();

home.get("/", async (req, res) => {
  try {
    const title = "Fuego Burgers®";
    const first_name = req.session.user;
    const rol = req.session.rol;
    return res.status(200).render("home", { title, first_name, rol });
  } catch (err) {
    console.log(err);
    return res.status(500).render("error", {error: "Error en el servidor"});
  }
});
