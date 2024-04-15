
import {getConnection, sql} from '../database/connection.js'


export const createIncidencia = async (req, res) =>{

    const { 
        fch_incidente,
        cod_client,
        cod_sucur,
        cod_usu,
        cod_tipo_inci,
        dsc_detalle,
    } = req.body;

    console.log(req.body);
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("fch_incidente", sql.NVarChar, fch_incidente)
        .input("cod_client", sql.Int, cod_client)
        .input("cod_sucur", sql.Int, cod_sucur)
        .input("cod_usu", sql.Int, cod_usu)
        .input("cod_tipo_inci", sql.Int, cod_tipo_inci)
        .input("dsc_detalle", sql.VarChar, dsc_detalle)

        .execute("usp_insert_incidencia_soporte");

        console.log(result);

        res.status(200).json({
            message: 'Incidencia creada',
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear Incidencia: ' + error.message);
    }

}

export const getTipoIncidencia = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().query("select * from ma_tipo_incidente");

    console.log(result);
    
    res.json(result.recordset);
}



export const getIncidencias = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .execute("usp_listar_incidentes_soporte")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Incidencias no encontradas"
            })
        }
        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al encontrar Incidencias '+error);
    }

    // console.log(result);
}


export const getIncidenciasXestado = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('estado', sql.Int, req.params.estado)
        .execute("usp_listar_incidentes_soporteXestado")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Incidencias no encontradas"
            })
        }
        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al encontrar Incidencias '+error);
    }

    // console.log(result);
}


export const getCountIncidencias = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .execute("usp_portal_count_estados_incidencias")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Incidencias no encontradas"
            })
        }
        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al encontrar Incidencias '+error);
    }

    // console.log(result);
}
