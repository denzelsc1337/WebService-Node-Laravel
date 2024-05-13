import {getConnection, sql} from '../database/connection.js'


export const getProveedores = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_portal_listar_proveedor");

    console.log(result);
    
    res.json(result.recordset);
}


export const getInfoProveedor = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_prov', sql.Int, req.params.id_prov)
        .execute("usp_portal_info_proveedor")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Proveedor no encontrado"
            })
        }
        return res.json(result.recordset[0]);
    } catch (error) {
        console.log(error);
    }

    // console.log(result);
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



export const updateProveedor = async (req, res) =>{
    const {id_prov, dsc_prov, flg_act} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('id_prov', sql.Int, id_prov)
        .input('dsc_prov', sql.VarChar, dsc_prov)
        .input("flg_act", sql.Char, flg_act)


        .execute("usp_portal_Update_proveedor");

        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar marca' + error.message);
    }
}