export function checkLogin(req, res, next) {
  if (req.session?.email) {
    return next();
  } else {
    return res.status(403).render("error", { error: "error de autorizacion asd" });
  }
}

export function checkAdmin(req, res, next) {
  if (req.session?.user?.rol == "admin") {
    return next();
  } else {
    //TODO #6
    
    return res.status(403).render("error", {error: "error de autorizacion a"});
  }
}
