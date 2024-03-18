import {getConnection, sql} from '../database/connection.js'



export const getEmpleados = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_portal_Listar_Empleados");

    console.log(result);
    res.json(result.recordset);
}



export const getInfoEmpleado = async (req, res) =>{
    console.log(req.params);
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('id_empl', sql.Int, req.params.id_empl)
    .execute("usp_portal_Info_Empleado")

    if(result.rowsAffected[0] === 0){
        return res.status(400).json({
            message: "Empleado no encontrado"
        })
    }

    return res.json(result.recordset[0]);
    // console.log(result);
}
