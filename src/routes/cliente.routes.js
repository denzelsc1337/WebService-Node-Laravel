import { Router } from "express";

import {getClientes, getLocales, getInfoLocation, updateLocation} from "../controllers/cliente.controller.js"

const router = Router();

router.get('/clientes', getClientes );
router.get('/locales', getLocales );
router.get('/locales/:id_cli', getInfoLocation );
router.put('/actualizarLocal', updateLocation );




export default router;