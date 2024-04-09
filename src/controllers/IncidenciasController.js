
import {getConnection, sql} from '../database/connection.js'


export const createIncidencia = async (req, res) =>{

    const { 
        fch_incidente,
        cod_estado_inc,
        cod_client,
        cod_sucur,
        cod_usu,
        cod_tipo_inci,
        dsc_detalle,
        lic
    } = req.body;

    console.log(req.body);
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("fch_incidente", sql.NVarChar, fch_incidente)
        .input("cod_estado_inc", sql.Int, cod_estado_inc)
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