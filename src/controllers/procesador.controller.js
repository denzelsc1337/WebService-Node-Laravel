import {getConnection, sql} from '../database/connection.js';

export const getProcesadores = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().query("select * from ma_procesador");

    console.log(result);
    
    res.json(result.recordset);
}


export const insertProcesador = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            dsc_procesador
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("dsc_procesador", sql.VarChar, dsc_procesador)

        .execute("usp_portal_Insert_Procesador");

        console.log(result);
    
        res.status(200).json({
            message: 'Procesador guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un local');
    }

}