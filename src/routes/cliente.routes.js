import { Router } from "express";

import {
    getClientes, 
    getLocales, 
    getInfoCliente, 
    updateLocation, 
    getIndustrias,
    getEmpleados,
    insertCliente,
    updateCliente,
    bajaCliente
} from "../controllers/cliente.controller.js"

import {
    insertLocal
} from "../controllers/locales.controller.js"

const router = Router();

router.get('/clientes', getClientes );
router.get('/locales', getLocales );
router.put('/actualizarLocal', updateLocation );
router.get('/selectorIndustria', getIndustrias );
router.get('/Empleados', getEmpleados );
router.put('/AddCliente', insertCliente );
router.get('/cliente/:id_cli', getInfoCliente );
router.put('/UpdateCliente', updateCliente );
router.delete('/DeleteCliente', bajaCliente );


// crud locales
router.put('/AddLocal', insertLocal );


export default router;