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
    bajaCliente,
    selectorClientes,
    selectorServicios
} from "../controllers/cliente.controller.js"

import {
    insertLocal,
    getInfoLocal
} from "../controllers/locales.controller.js"

const router = Router();

router.get('/clientes', getClientes );
router.put('/actualizarLocal', updateLocation );
router.get('/selectorIndustria', getIndustrias );
router.get('/Empleados', getEmpleados );
router.put('/AddCliente', insertCliente );
router.get('/cliente/:id_cli', getInfoCliente );
router.put('/UpdateCliente', updateCliente );
router.delete('/DeleteCliente', bajaCliente );


// crud locales
router.get('/locales', getLocales );
router.put('/AddLocal', insertLocal );
router.get('/local/:idsucursal', getInfoLocal );


//selectors 
router.get('/selectorClientes', selectorClientes );
router.get('/selectorServicios', selectorServicios );

export default router;