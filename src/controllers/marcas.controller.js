import {getConnection, sql} from '../database/connection.js'

export const getMarcas = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().query("SELECT * FROM ma_marcas");

    console.log(result);
    
    res.json(result.recordset);
}

export const getInfoMarca = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_marca', sql.Int, req.params.id_marca)
        .query("SELECT * FROM ma_marcas WHERE id_marca = @id_marca")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Marca no encontrada"
            })
        }
    
        return res.json(result.recordset[0]);
    } catch (error) {
        console.log(error);
    }

    // console.log(result);
}



export const insertMarca = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            dsc_marca,
            flg_soft
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("dsc_marca", sql.VarChar, dsc_marca)
        .input("flg_soft", sql.Char, flg_soft)

        .execute("usp_portal_Insert_Marca");

        console.log(result);
    
        res.status(200).json({
            message: 'Marca guardada',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear una marca');
    }

}


export const updateMarca = async (req, res) =>{
    const {id_marca, dsc_marca, flg_soft, flg_hard, flg_activo} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('id_marca', sql.Int, id_marca)
        .input('dsc_marca', sql.VarChar, dsc_marca)
        .input("flg_soft", sql.Char, flg_soft)
        .input("flg_hard", sql.Char, flg_hard)
        .input("flg_activo", sql.Char, flg_activo)

        .execute("usp_portal_Update_Marca");

        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar marca');
    }
}