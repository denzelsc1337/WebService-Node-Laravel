import {getConnection, sql} from '../database/connection.js'


export const getClientes = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_webcli_test_Listar_Clientes");

    console.log(result);
    res.json(result.recordset);
}

export const getLocales = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_webcli_Listar_Locales");

    console.log(result);
    res.json(result.recordset);
}


export const getInfoLocation = async (req, res) =>{
    console.log(req.params);
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('id_cli', sql.Int, req.params.id_cli)
    .execute("usp_webcli_test_Get_Local")

    if(result.rowsAffected[0] === 0){
        return res.status(400).json({
            message: "Local no encontrado"
        })
    }

    return res.json(result.recordset[0]);
    // console.log(result);
}