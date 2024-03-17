import {getConnection, sql} from '../database/connection.js'

export const insertLocal = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_cli, 
            dsc_sucursal, 
            dsc_direccion, 
            flg_activo, 
            usu_reg, 
            usu_mod 
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_cli", sql.Int, id_cli)
        .input("dsc_sucursal", sql.VarChar, dsc_sucursal)
        .input("dsc_direccion", sql.VarChar, dsc_direccion)
        .input("flg_activo", sql.VarChar, flg_activo)
        .input("usu_reg", sql.Int, usu_reg)
        .input("usu_mod", sql.Int, usu_mod)
    
        .execute("usp_webcli_InsertLocales");

        console.log(result);
    
        res.status(200).json({
            message: 'Guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un local');
    }

}

export const updateLocal = async (req, res) =>{
    // console.log(req.params);
    const {id_sucur, id_cli, dsc_sucursal, dsc_direccion} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('id_sucur', sql.Int, id_sucur)
        .input('id_cli', sql.Int, id_cli)
        .input('dsc_sucursal', sql.VarChar, dsc_sucursal)
        .input('dsc_direccion', sql.VarChar, dsc_direccion)

        .execute("usp_portal_Update_Local");

        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
            id_sucursal: result.recordset[0].id_sucur
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar una localidad');
    }
}


export const bajaLocal = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            idsuc
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("idsuc", sql.Int, idsuc)
        .execute("usp_portal_baja_Local");

        console.log(result);
    
        res.status(200).json({
            message: 'estado de local actualizado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al dar de baja local '+error);
    }

}


export const getInfoLocal = async (req, res) =>{
    console.log(req.params);
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('idsucursal', sql.Int, req.params.idsucursal)
    .execute("usp_webcli_Get_Local")

    if(result.rowsAffected[0] === 0){
        return res.status(400).json({
            message: "Local no encontrado"
        })
    }

    return res.json(result.recordset[0]);
    // console.log(result);
}



export const selectorLocalesxCliente = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_cliente', sql.Int, req.params.id_cliente)
        .execute("usp_webcli_selector_LocalesxCliente")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Locales no encontrados"
            })
        }
        res.json(result.recordset);
        // console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al dar de baja local '+error);
    }

}