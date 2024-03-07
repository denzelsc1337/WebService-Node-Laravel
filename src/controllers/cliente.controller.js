import {getConnection, sql} from '../database/connection.js'


export const getClientes = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_webcli_test_Listar_Clientes");

    console.log(result);
    res.json(result.recordset);
}