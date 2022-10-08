import express from "express";
import __dirname from "./utils/utils.js";
import session from "express-session";
import passport from "passport";
import dotenv from 'dotenv';
dotenv.config()
import os from "os";
import cluster from "cluster"

//Mongo
import connectDB from './config/config.js'

//Routes

import loginRouter from './routes/loginRouter.js'
import logoutRouter from './routes/logoutRouter.js'
import rootRouter from './routes/rootRouter.js'
import signupRouter from './routes/signupRouter.js'
import infoRouter from './routes/infoRouter.js'
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import compression from 'compression'
import logger from "./middlewares/logs.js";

const modo = parseInt(process.argv[3]) || 'FORK'
const port = Number(process.argv[2]) || 8080

const app = express();

connectDB()

app.use(compression())

const numCpus = os.cpus();

if (modo == "CLUSTER" && cluster.isPrimary) {
    cpus.map(() => {
        cluster.fork();
    });

    cluster.on("exit", (worker) => {
        console.log(`worker ${worker.process.pid} died :(`);
        cluster.fork();
    })
} else {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const PORT = process.env.PORT || 8080;
    const serverExpress = app.listen(PORT, (err) => err ? logger.error(`Error en el server: ${err}`) : logger.info(`Server listening on PORT: ${PORT}`));

    app.use(express.static(__dirname + "/public"));

    app.set("views", __dirname + "/public/views");
    app.set("view engine", ".ejs");

    app.use('/api', productsRouter);

    const error404 = (request, response, next) => {
        let mensajeError = {
            error: "-2",
            descripcion: `ruta: ${request.url} método: ${request.method} no implementado`
        };
        response.status(404).json(mensajeError);
        next();
    };

    app.use(session({
        secret: 'keyboard cat',
        cookie: {
            httpOnly: false,
            secure: false,
            // maxAge: config.TIEMPO_EXPIRACION
        },
        rolling: true,
        resave: true,
        saveUninitialized: false
    }));

    //Passport

    app.use(passport.initialize());
    app.use(passport.session());

    //INDEX
    app.use('/', rootRouter);
    //LOGIN
    app.use('/login', loginRouter);
    //SIGNUP
    app.use('/signup', signupRouter);
    //LOGOUT
    app.use('/logout', logoutRouter);
    //INFO
    app.use("/information", infoRouter);

    app.use((req, res, next) => {
        console.log(`Ruta: ${req.url} | Método: ${req.method}`);
        next();
    });

}