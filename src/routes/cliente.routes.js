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
    selectorServicios,
    loginUsuario
} from "../controllers/cliente.controller.js"

import {
    insertLocal,
    updateLocal,
    bajaLocal,
    getInfoLocal,
    selectorLocalesxCliente,
    selectorUsuarioxLocal
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
    bajaProcesador,
    getInfoProcesador,
    getProcesadores,
    insertProcesador,
    updateProcesador
}from "../controllers/procesador.controller.js"


import {
     getEquipos, 
     getEquiposXcliente, 
     getInfoEquipo, 
     insertEquipoInventario,
     searchEquiposFilter,
     selectorMarcaxPeriferico,
     selectorModeloxMarca,
     updateEquipoInvent
} from "../controllers/gestionEquipos.controller.js";


import { insertEquipoAsignacion } from "../controllers/asignacion.controller.js";

const router = Router();
//login usuario
router.get('/Login/:doc_usu/:dsc_clave', loginUsuario );

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
router.put('/AddProcesador', insertProcesador );
router.get('/Procesador/:id_procesador', getInfoProcesador);
router.put('/updateProcesador', updateProcesador );
router.delete('/DeleteProcesador', bajaProcesador );

//crud gestion equipos
router.get('/equiposInventario', getEquipos );
router.put('/AddEquipo', insertEquipoInventario );
router.get('/Equipo/:id_equip', getInfoEquipo);
router.put('/UpdateEquipo', updateEquipoInvent );

router.get('/equipofiltro/:id_client/:id_sucur/:id_usu', searchEquiposFilter );
router.get('/EquipoCliente/:id_client', getEquiposXcliente);

router.put('/AddAsignacion', insertEquipoAsignacion );


//selectors 
router.get('/selectorClientes', selectorClientes );
router.get('/selectorServicios', selectorServicios );
router.get('/selectorLocalCliente/:id_cliente', selectorLocalesxCliente );
router.get('/selectorUsuarioLocal/:id_sucursal', selectorUsuarioxLocal );
router.get('/selectorMarcasXPeriferico/:id_periferico', selectorMarcaxPeriferico );
router.get('/selectorModeloXMarca/:id_marca', selectorModeloxMarca );






export default router;