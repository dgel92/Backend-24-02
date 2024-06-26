import { Server } from "socket.io";
import Sockets from "./sockets.js";
import __dirname from "./utils.js";
import cartsRouter from "./routes/cartsRouter.js";
import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/productsRouter.js";
import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const port = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//pequeño mod para que me lea las imagenes de public, despues ver si se puede mejorar
app.use("/public", express.static("public"));

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Set up Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

// Start server
const server = app.listen(port, () =>
  console.log(`Servidor corriendo en http://localhost:${port}`)
);

// Set up WebSocket server
const io = new Server(server);
Sockets(io);
