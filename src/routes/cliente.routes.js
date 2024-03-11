import { Router } from "express";

import {getClientes, getLocales, getInfoLocation} from "../controllers/cliente.controller.js"

const router = Router();

router.get('/clientes', getClientes );
router.get('/locales', getLocales );
router.get('/location/:id_cli', getInfoLocation );



export default router;