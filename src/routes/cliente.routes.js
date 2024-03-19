import { Router } from "express";

import {
    getClientes, 
    getLocales, 
    getInfoCliente, 
    getIndustrias,
    insertCliente,
    updateCliente,
    bajaCliente,
    selectorClientes,
    selectorServicios
} from "../controllers/cliente.controller.js"

import {
    insertLocal,
    updateLocal,
    bajaLocal,
    getInfoLocal,
    selectorLocalesxCliente
} from "../controllers/locales.controller.js"


import {
    getEmpleados,
    getInfoEmpleado,
    insertEmpleado,
    updateEmpleado,
    bajaEmpleado
} from "../controllers/empleado.controller.js"


import {
    insertPeriferico,
    updatePeriferico,
    bajaPeriferico,
    getInfoPeriferico
}from "../controllers/periferico.controller.js"


import{
    getMarcas,
    getInfoMarca,
    insertMarca,
    updateMarca,
    bajaMarca
}from "../controllers/marcas.controller.js"


import{
    getModelos,
    insertModelo,
    updateModelo,
    getInfoModelo
}from "../controllers/modelo.controller.js"


import {
    getProcesadores
}from "../controllers/procesador.controller.js"

const router = Router();

router.get('/clientes', getClientes );
router.get('/selectorIndustria', getIndustrias );
router.get('/Empleados', getEmpleados );
router.put('/AddCliente', insertCliente );
router.get('/cliente/:id_cli', getInfoCliente );
router.put('/UpdateCliente', updateCliente );
router.delete('/DeleteCliente', bajaCliente );


// crud locales
router.get('/locales', getLocales );
router.put('/AddLocal', insertLocal );
router.put('/updateLocal', updateLocal );
router.delete('/DeleteLocal', bajaLocal );
router.get('/local/:idsucursal', getInfoLocal );


//crud empleados
router.get('/Empleado/:id_empl', getInfoEmpleado );
router.put('/AddEmpleado', insertEmpleado );
router.put('/updateEmpleado', updateEmpleado );
router.delete('/DeleteEmpleado', bajaEmpleado );

//crud periferico

router.put('/AddPeriferico', insertPeriferico );
router.get('/Periferico/:id_perif', getInfoPeriferico );
router.put('/updatePeriferico', updatePeriferico );
router.delete('/DeletePeriferico', bajaPeriferico );

//crud marcas
router.get('/marcas', getMarcas );
router.get('/Marca/:id_marca', getInfoMarca );
router.put('/AddMarca', insertMarca );
router.put('/updateMarca', updateMarca );
router.delete('/DeleteMarca', bajaMarca );


//crud modelos
router.get('/modelos', getModelos );
router.put('/AddModelo', insertModelo );
router.get('/Modelo/:id_modelo', getInfoModelo);
router.put('/updateModelo', updateModelo );


//crud procesadores
router.get('/procesadores', getProcesadores );


//selectors 
router.get('/selectorClientes', selectorClientes );
router.get('/selectorServicios', selectorServicios );
router.get('/selectorLocalCliente/:id_cliente', selectorLocalesxCliente );




export default router;