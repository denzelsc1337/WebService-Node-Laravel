import {getConnection, sql} from '../database/connection.js'

export const getMarcas = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().query("SELECT * FROM ma_marcas");

    console.log(result);
    
    res.json(result.recordset);
}