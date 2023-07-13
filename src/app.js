import MongoStore from "connect-mongo";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import { __dirname } from "./config.js";
import { cartsApiRouter } from "./routes/carts-api.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { home } from "./routes/home.router.js";
import { productsAdminRouter } from "./routes/products-admin-router.js";
import { productsApiRouter } from "./routes/products-api.router.js";
import { productsRouter } from "./routes/products.router.js";
import { sessionRouter } from "./routes/session.router.js";
import { testChatRouter } from "./routes/test-chat.router.js";
import { usersApiRouter } from "./routes/users-api.router.js";
import { usersRouter } from "./routes/users.router.js";
import { checkAdmin } from "./utils/checkLogin.js";
import { connectMongo } from "./utils/connect-db.js";
import { connectSocketServer } from "./utils/connect-socket.js";
import { iniPassport } from "./utils/passport.js";

// CONFIG BASICAS Y CONEXION A BD
const app = express();
const PORT = 8080;

connectMongo();

// HTTP SERVER
const httpServer = app.listen(PORT, () => {
  console.log(`Levantando en puerto http://localhost:${PORT}`);
});

connectSocketServer(httpServer);
app.use(
  session({
    secret: "jhasdkjh671246JHDAhjd",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://enzostella07:5CWZTaHh5MDAbiIz@codercluster.ykyflk8.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 3600,
    }),
  })
);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// ENDPOINTS
app.use("/api/products", productsApiRouter);
app.use("/api/carts", cartsApiRouter);
app.use("/api/users", usersApiRouter);
app.use("/api/sessions", sessionRouter);


// PLANTILLAS
app.use("/", home);
app.use("/products", productsRouter);
app.use("/products-admin", productsAdminRouter);
app.use("/users", usersRouter);
app.use("/cart", cartsRouter);
app.use("/test-chat", testChatRouter);

app.get(
  "/lugar-super-misterioso-y-secreto-donde-se-guardan-cosas-muy-importantes",
  checkAdmin,
  (req, res) => {
    return res.send("CBU-LAURA-CUIL");
  }
);

app.get("*", (req, res) => {
  // console.log(req.signedCookies);
  return res.status(404).json({
    status: "Error",
    msg: "No se ecuentra la ruta especificada",
    data: {},
  });
});
