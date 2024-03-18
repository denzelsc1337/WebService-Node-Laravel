import {getConnection, sql} from '../database/connection.js'



export const getEmpleados = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_portal_Listar_Empleados");

    console.log(result);
    res.json(result.recordset);
}
