import {getConnection, sql} from '../database/connection.js'

export const insertEmpleado = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            nom_empl,
            ape_empl,
            id_cli, 
            id_local,
            tipo_doc,
            nro_doc ,
            telf ,
            mail,
            cargo,
            area,
            direccion
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("nom_empl", sql.VarChar, nom_empl)
        .input("ape_empl", sql.VarChar, ape_empl)
        .input("id_cli", sql.Int, id_cli)
        .input("id_local", sql.Int, id_local)
        .input("tipo_doc", sql.Int, tipo_doc)
        .input("nro_doc", sql.VarChar, nro_doc)
        .input("telf", sql.VarChar, telf)
        .input("mail", sql.VarChar, mail)
        .input("cargo", sql.VarChar, cargo)
        .input("area", sql.VarChar, area)
        .input("direccion", sql.VarChar, direccion)

    
        .execute("usp_portal_Insert_Empleados");

        console.log(result);
    
        res.status(200).json({
            message: 'Empleado guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un local');
    }

}



export const updateEmpleado = async (req, res) =>{
    // console.log(req.params);
    const { 
        id_emp,
        nom_empl,
        ape_empl,
        id_cli, 
        id_local,
        tipo_doc,
        nro_doc ,
        telf ,
        mail,
        cargo,
        area,
        direccion
    } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id_emp", sql.Int, id_emp)
        .input("nom_empl", sql.VarChar, nom_empl)
        .input("ape_empl", sql.VarChar, ape_empl)
        .input("id_cli", sql.Int, id_cli)
        .input("id_local", sql.Int, id_local)
        .input("tipo_doc", sql.Int, tipo_doc)
        .input("nro_doc", sql.VarChar, nro_doc)
        .input("telf", sql.VarChar, telf)
        .input("mail", sql.VarChar, mail)
        .input("cargo", sql.VarChar, cargo)
        .input("area", sql.VarChar, area)
        .input("direccion", sql.VarChar, direccion)

    
        .execute("usp_portal_Update_Empleado");


        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
            // id_usuario: result.recordset[0].id_usuario
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar una localidad');
    }
}


export const bajaEmpleado = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            idemp
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("idemp", sql.Int, idemp)
        .execute("usp_portal_baja_Empleado");

        console.log(result);
    
        res.status(200).json({
            message: 'estado de empleado actualizado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al dar de baja empleado '+error);
    }

}



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
