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
