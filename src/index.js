import express from "express";
import { engine } from 'express-handlebars';

import session from "express-session";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import 'dotenv/config'
import config from "./config/config.js";

import viewsRouter from "./routes/views.router.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import flash from 'express-flash';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = config.server.port;

const app = express();

app.use(
    session({
      secret: "s3cr3t3",
      resave: false,
      saveUninitialized: false,
    })
);
  
app.use(flash());

const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

app.use(express.static(__dirname + "/public"));
app.engine('handlebars', engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewsRouter);

export default app;