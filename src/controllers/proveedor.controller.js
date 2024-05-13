import {getConnection, sql} from '../database/connection.js'


export const getProveedores = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_portal_listar_proveedor");

    console.log(result);
    
    res.json(result.recordset);
}

export const CreateMarca = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            dsc_prov,
            flg_act,
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("dsc_prov", sql.VarChar, dsc_prov)
        .input("flg_act", sql.Char, flg_act)

        .execute("usp_portal_crear_proveedor");

        console.log(result);
    
        res.status(200).json({
            message: 'Proveedor guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un proveedor');
    }

}