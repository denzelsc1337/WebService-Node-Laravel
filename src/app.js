import express from 'express';
import cors from 'cors';
import categoryRoute from './routes/categoria.routes.js';
import clienteRoute from './routes/cliente.routes.js';


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Routes
app.use("/portalKunaq",categoryRoute);
app.use("/portalKunaq", clienteRoute);

export default app;