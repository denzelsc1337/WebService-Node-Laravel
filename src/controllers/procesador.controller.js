import {getConnection, sql} from '../database/connection.js';

export const getProcesadores = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().query("select * from ma_procesador");

    console.log(result);
    
    res.json(result.recordset);
}