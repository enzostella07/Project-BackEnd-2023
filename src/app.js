import MongoStore from 'connect-mongo';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import env from './config/config.js';
import errorHandler from './middlewares/error.js';
import { __dirname } from './multer.js';
import { cartsApiRouter } from './routes/carts-api.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { home } from './routes/home.router.js';
import { mailRouter } from './routes/mail.router.js';
import { mockRouter } from './routes/mock.router.js';
import { productsAdminRouter } from './routes/products-admin-router.js';
import { productsApiRouter } from './routes/products-api.router.js';
import { productsRouter } from './routes/products.router.js';
import { sessionRouter } from './routes/session.router.js';
import { testChatRouter } from './routes/test-chat.router.js';
import { usersApiRouter } from './routes/users-api.router.js';
import { usersRouter } from './routes/users.router.js';
import { connectMongo } from './utils/connect-db.js';
import { connectSocketServer } from './utils/connect-socket.js';
import { iniPassport } from './utils/passport.js';

// CONFIG BASICAS
const app = express();
const PORT = env.PORT;

// HTTP SERVER
const httpServer = app.listen(PORT, () => {
  console.log(`Levantando en puerto http://localhost:${PORT}`);
});

//CONEXION A DB
connectMongo();

connectSocketServer(httpServer);
app.use(
  session({
    secret: env.MONGO_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 3600,
    }),
  })
);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

//Documentacion de Swagger
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.1',
//     info: {
//       title: 'documentacion remeras',
//       description: 'este proyecto',
//     },
//   },
//   apis: [`${__dirname}/docs/**/*.yaml`],
// };
// const specs = swaggerJSDoc(swaggerOptions);
// app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
//FIN SWAGGER

// ENDPOINTS
app.use('/api/products', productsApiRouter);
app.use('/api/carts', cartsApiRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/mockingProducts', mockRouter);

// PLANTILLAS
app.use('/', home);
app.use('/products', productsRouter);
app.use('/products-admin', productsAdminRouter);
app.use('/users', usersRouter);
app.use('/carts', cartsRouter);
app.use('/test-chat', testChatRouter);
app.use('/mail', mailRouter);

app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'Error',
    msg: 'No se ecuentra la ruta especificada',
    data: {},
  });
});

// app.use(errorHandler);
