import {getConnection, sql} from '../database/connection.js'


export const getEquipos = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request()
    .execute("usp_portal_Listado_Inventario_Equipos");

    console.log(result);
    res.json(result.recordset);
}


export const insertEquipoInventario = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_cliente,
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
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_cliente", sql.Int, id_cliente)
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

        
        .execute("usp_portal_Insert_Inventario_Equipos");

        console.log(result);
    
        res.status(200).json({
            message: 'Guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar equipo');
    }

}