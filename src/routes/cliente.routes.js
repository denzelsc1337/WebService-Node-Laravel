import { Router } from "express";

import {getClientes, getLocales} from "../controllers/cliente.controller.js"

const router = Router();

router.get('/clientes', getClientes );
router.get('/locales', getLocales );


export default router;