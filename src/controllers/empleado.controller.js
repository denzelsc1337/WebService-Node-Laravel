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
            direccion,
            flg_act,
            flg_tec,
            flg_com,
            flg_log,
            pass,
            id_usu_reg, 
            id_rol,
            tipo_trbjo
            
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

        .input("flg_act", sql.Char, flg_act)
        .input("flg_tec", sql.Char, flg_tec)
        .input("flg_com", sql.Char, flg_com)
        .input("flg_log", sql.Char, flg_log)

        .input("pass", sql.VarChar, pass)

        .input("id_usu_reg", sql.Int, id_usu_reg)
        .input("id_rol", sql.Int, id_rol)

        .input("tipo_trbjo", sql.Char, tipo_trbjo)

        .execute("usp_portal_Insert_Empleados");

        console.log(result);
    
        res.status(200).json({
            message: 'Empleado guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear un empleado',
            error: error.message // Envía el mensaje de error al cliente
        });
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
        direccion,
        flg_act,
        flg_tec,
        flg_com,
        flg_log,
        cod_rol,
        pass,
        id_mod,
        tipo_trbjo
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

        .input("flg_act", sql.Char, flg_act)
        .input("flg_tec", sql.Char, flg_tec)
        .input("flg_com", sql.Char, flg_com)
        .input("flg_log", sql.Char, flg_log)
        
        .input("cod_rol", sql.Int, cod_rol)

        .input("pass", sql.VarChar, pass)
        .input("id_mod", sql.Int, id_mod)

        .input("tipo_trbjo", sql.Char, tipo_trbjo)
        
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


export const getRolesxCliente = async (req, res) => {
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('as_flg_kunaq', sql.Char, req.params.as_flg_kunaq)
        .execute("usp_portal_roles_flg")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "roles no encontrados"
            })
        }
        res.json(result.recordset);
        // console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al encontrar los locales '+error);
    }

}



export const changeActivo = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_empl
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_empl", sql.Int, id_empl)
        .execute("usp_portal_cambiar_activo");

        console.log(result);
    
        res.status(200).json({
            message: 'estado de empleado actualizado',
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al cambiar estado '+error.message);
    }

}

export const changeComercial = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_empl
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_empl", sql.Int, id_empl)
        .execute("usp_portal_cambiar_contacto_comerc");

        console.log(result);
    
        res.status(200).json({
            message: 'estado de empleado actualizado',
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al cambiar estado '+error.message);
    }

}

export const changeTecnico = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_empl
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_empl", sql.Int, id_empl)
        .execute("usp_portal_cambiar_contacto_tecnico");

        console.log(result);
    
        res.status(200).json({
            message: 'estado de empleado actualizado',
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al cambiar estado '+error.message);
    }

}



export const changeLogin = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_empl
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_empl", sql.Int, id_empl)
        .execute("usp_portal_cambiar_aut_login");

        console.log(result);
    
        res.status(200).json({
            message: 'estado de empleado actualizado',
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al cambiar estado '+error.message);
    }

}


export const getEmpleadosXcliente = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('cod_cliente', sql.Int, req.params.cod_cliente)
        .execute("usp_portal_Listar_EmpleadosXCliente")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Empleados no encontrados"
            })
        }
        res.json(result.recordset);
        // console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al encontrar los empleados '+error);
    }

}


export const getContactosXcliente = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('cod_cliente', sql.Int, req.params.cod_cliente)
        .execute("usp_portal_Listar_ContactosXCliente")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Contactos no encontrados"
            })
        }
        res.json(result.recordset);
        // console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al encontrar los contactos '+error);
    }

}

export const getLocalesXcliente = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('cod_cliente', sql.Int, req.params.cod_cliente)
        .execute("usp_portal_Listar_LocalesxCliente")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Locales no encontrados"
            })
        }
        res.json(result.recordset);
        // console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al encontrar los locales '+error);
    }

}



export const getConteoLocalesXcliente = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('cod_cliente', sql.Int, req.params.cod_cliente)
        .execute("usp_portal_conteo_localesxCliente")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Locales no encontrados"
            })
        }
        res.json(result.recordset);
        // console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al encontrar los locales '+error);
    }

}



