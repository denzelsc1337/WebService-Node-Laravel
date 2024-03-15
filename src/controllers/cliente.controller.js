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

export const updateLocation = async (req, res) =>{
    // console.log(req.params);
    const {id_cli, dsc_nom_razon, dsc_nom_comer, num_ruc , fch_ing, cod_ind} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('id_cli', sql.Int, id_cli)
        .input('dsc_nom_razon', sql.VarChar, dsc_nom_razon)
        .input('dsc_nom_comer', sql.VarChar, dsc_nom_comer)
        .input('num_ruc', sql.VarChar, num_ruc)
        .input('fch_ing', sql.Date, fch_ing)
        .input('cod_ind', sql.VarChar, cod_ind)

        .execute("usp_test_Update_Location");

        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
            id_cli: result.recordset[0].id_cli
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar una localidad');
    }
}


export const getIndustrias = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_webcli_test_selectorIndustria");

    console.log(result);
    res.json(result.recordset);
}

export const getEmpleados = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_webcli_listaEmpleados");

    console.log(result);
    res.json(result.recordset);
}



export const insertCliente = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            dsc_nom_razon, 
            dsc_nom_comer, 
            dsc_tipo_id, 
            cod_ind, 
            fch_ing, 
            usu_reg,
            usu_mod 
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("dsc_nom_razon", sql.VarChar, dsc_nom_razon)
        .input("dsc_nom_comer", sql.VarChar, dsc_nom_comer)
        .input("dsc_tipo_id", sql.VarChar, dsc_tipo_id)
        .input("cod_ind", sql.Int, cod_ind)
        .input("fch_ing", sql.Date, fch_ing)
        .input("usu_reg", sql.Int, usu_reg)
        .input("usu_mod", sql.Int, usu_mod)
    
        .execute("usp_webcli_InsertCliente");

        console.log(result);
    
        res.status(200).json({
            message: 'Guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear una cliente');
    }

}


export const updateCliente = async (req, res) =>{
    // console.log(req.params);
    const {id_cli, dsc_nom_razon, dsc_nom_comer, num_ruc , fch_ing, cod_ind} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('id_cli', sql.Int, id_cli)
        .input('dsc_nom_razon', sql.VarChar, dsc_nom_razon)
        .input('dsc_nom_comer', sql.VarChar, dsc_nom_comer)
        .input('num_ruc', sql.VarChar, num_ruc)
        .input('fch_ing', sql.Date, fch_ing)
        .input('cod_ind', sql.VarChar, cod_ind)

        .execute("usp_portal_Update_Cliente");

        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
            id_cli: result.recordset[0].id_cli
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar una localidad');
    }
}


export const bajaCliente = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_cli
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("idcli", sql.Int, id_cli)
        .execute("usp_portal_bajaCliente");

        console.log(result);
    
        res.status(200).json({
            message: 'estado de cliente actualizado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al dar de baja cliente '+error);
    }

}

