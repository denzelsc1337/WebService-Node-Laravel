import {getConnection, sql} from '../database/connection.js'


export const getEquipos = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request()
    .execute("usp_portal_Listado_Inventario_Equipos");

    console.log(result);
    res.json(result.recordset);
}


export const getInfoEquipo = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_equipo', sql.Int, req.params.id_equipo)
        .query("SELECT * FROM de_clientes_equipos WHERE id_equipo = @id_equipo")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Marca no encontrada"
            })
        }
    
        return res.json(result.recordset[0]);
    } catch (error) {
        console.log(error);
    }

    // console.log(result);
}


export const insertEquipoInventario = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_equipo,
            id_estado_eqp,
            id_periferico, 
            id_marca,
            id_modelo,
            dsc_equipo,
            dsc_nro_serie,
            dsc_cod_activo,
            id_procesador,
            vel_procesador,
            ctd_memoria,
            ctd_disco_duro,
            ctd_tamaño_pantalla,
            dsc_tipo_propiedad,
            id_proveedor_compra,
            imp_compra,
            dsc_contrato_alq,
            id_proveedor_alq,
            imp_cuota_alq ,
            dsc_observaciones
        } = req.body;

        // {
        //     "id_equipo":  1,
        //     "id_estado_eqp": 1,
        //     "id_periferico" : 1,
        //     "id_marca" : 1,
        //     "id_modelo" : 1,
        //     "dsc_equipo" : "test", 
        //     "dsc_nro_serie" : "LN-00",
        //     "dsc_cod_activo" : "LN-00",
        //     "id_procesador" : 1 , 
        //     "vel_procesador" : 9, 
        //     "ctd_memoria" : 1, 
        //     "ctd_disco_duro" : 2,
        //     "ctd_tamaño_pantalla" :190 ,
        //     "dsc_tipo_propiedad" : "Alquilado", 
        //     "id_proveedor_compra" : 1, 
        //     "imp_compra" : 90, 
        //     "dsc_contrato_alq" : "test alq", 
        //     "id_proveedor_alq" : 1, 
        //     "imp_cuota_alq" : 90,
        //     "dsc_observaciones" : "test obs" 
        // }
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_equipo", sql.Int, id_equipo)
        .input("id_estado_eqp", sql.Int, id_estado_eqp)
        .input("id_periferico", sql.Int, id_periferico)
        .input("id_marca", sql.Int, id_marca)
        .input("id_modelo", sql.Int, id_modelo)
        .input("dsc_equipo", sql.VarChar, dsc_equipo)
        .input("dsc_nro_serie", sql.VarChar, dsc_nro_serie)
        .input("dsc_cod_activo", sql.VarChar, dsc_cod_activo)
        .input("id_procesador", sql.Int, id_procesador)
        .input("vel_procesador", sql.Decimal, vel_procesador)
        .input("ctd_memoria", sql.Decimal, ctd_memoria)
        .input("ctd_disco_duro", sql.Decimal, ctd_disco_duro)
        .input("ctd_tamaño_pantalla", sql.Decimal, ctd_tamaño_pantalla)
        .input("dsc_tipo_propiedad", sql.VarChar, dsc_tipo_propiedad)
        .input("id_proveedor_compra", sql.Int, id_proveedor_compra)
        .input("imp_compra", sql.Decimal, imp_compra)
        .input("dsc_contrato_alq", sql.VarChar, dsc_contrato_alq)
        .input("id_proveedor_alq", sql.Int, id_proveedor_alq)
        .input("imp_cuota_alq", sql.Decimal, imp_cuota_alq)
        .input("dsc_observaciones", sql.VarChar, dsc_observaciones)

        
        .execute("usp_portal_Update_Inventario_Equipos");

        console.log(result);
    
        res.status(200).json({
            message: 'Guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar equipo');
    }

}



export const updateEquipoInvent = async (req, res) =>{
    // console.log(req.params);
    const { 
        id_equipo,
        id_estado_eqp,
        id_periferico, 
        id_marca,
        id_modelo,
        dsc_equipo,
        dsc_nro_serie,
        dsc_cod_activo,
        id_procesador,
        vel_procesador,
        ctd_memoria,
        ctd_disco_duro,
        ctd_tamaño_pantalla,
        dsc_tipo_propiedad,
        id_proveedor_compra,
        imp_compra,
        dsc_contrato_alq,
        id_proveedor_alq,
        imp_cuota_alq ,
        dsc_observaciones
    } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id_equipo", sql.Int, id_equipo)
        .input("id_estado_eqp", sql.Int, id_estado_eqp)
        .input("id_periferico", sql.Int, id_periferico)
        .input("id_marca", sql.Int, id_marca)
        .input("id_modelo", sql.Int, id_modelo)
        .input("dsc_equipo", sql.VarChar, dsc_equipo)
        .input("dsc_nro_serie", sql.VarChar, dsc_nro_serie)
        .input("dsc_cod_activo", sql.VarChar, dsc_cod_activo)
        .input("id_procesador", sql.Int, id_procesador)
        .input("vel_procesador", sql.Decimal, vel_procesador)
        .input("ctd_memoria", sql.Decimal, ctd_memoria)
        .input("ctd_disco_duro", sql.Decimal, ctd_disco_duro)
        .input("ctd_tamaño_pantalla", sql.Decimal, ctd_tamaño_pantalla)
        .input("dsc_tipo_propiedad", sql.VarChar, dsc_tipo_propiedad)
        .input("id_proveedor_compra", sql.Int, id_proveedor_compra)
        .input("imp_compra", sql.Decimal, imp_compra)
        .input("dsc_contrato_alq", sql.VarChar, dsc_contrato_alq)
        .input("id_proveedor_alq", sql.Int, id_proveedor_alq)
        .input("imp_cuota_alq", sql.Decimal, imp_cuota_alq)
        .input("dsc_observaciones", sql.VarChar, dsc_observaciones)


        .execute("usp_portal_Update_Inventario_Equipos");


        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
            // id_usuario: result.recordset[0].id_usuario
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar equipo');
    }
}



export const selectorMarcaxPeriferico = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_periferico', sql.Int, req.params.id_periferico)
        .execute("usp_portal_MarcaXPeriferico_Inventario")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Marcas no encontradas"
            })
        }
        res.json(result.recordset);
        // console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al encontrar los locales '+error);
    }

}



export const selectorModeloxMarca = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_marca', sql.Int, req.params.id_marca)
        .execute("usp_portal_ModeloXMarca_Inventario")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Modelos no encontrados"
            })
        }
        res.json(result.recordset);
        // console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al encontrar los locales '+error);
    }

}