import {getConnection, sql} from '../database/connection.js'

export const insertLocal = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_cli, 
            dsc_sucursal, 
            flg_activo, 
            usu_reg, 
            usu_mod 
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_cli", sql.Int, id_cli)
        .input("dsc_sucursal", sql.VarChar, dsc_sucursal)
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