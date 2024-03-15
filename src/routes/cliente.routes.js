import { Router } from "express";

import {
    getClientes, 
    getLocales, 
    getInfoLocation, 
    updateLocation, 
    getIndustrias,
    getEmpleados,
    insertCliente,
    updateCliente,
    bajaCliente
} from "../controllers/cliente.controller.js"

const router = Router();

router.get('/clientes', getClientes );
router.get('/locales', getLocales );
router.get('/locales/:id_cli', getInfoLocation );
router.put('/actualizarLocal', updateLocation );
router.get('/selectorIndustria', getIndustrias );
router.get('/Empleados', getEmpleados );
router.put('/AddCliente', insertCliente );
router.put('/UpdateCliente', updateCliente );
router.delete('/DeleteCliente', bajaCliente );




export default router;