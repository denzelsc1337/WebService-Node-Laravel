import {getConnection, sql} from '../database/connection.js'

export const getModelos = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_portal_Listar_Modelos");

    console.log(result);
    
    res.json(result.recordset);
}


export const getInfoModelo = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_modelo', sql.Int, req.params.id_modelo)
        .query("SELECT * FROM ma_modelos WHERE id_modelo = @id_modelo")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Modelo no encontrada"
            })
        }
        return res.json(result.recordset[0]);
    } catch (error) {
        console.log(error);
    }

    // console.log(result);
}



export const insertModelo = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_perif,
            id_marca,
            dsc_modelo
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_perif", sql.Int, id_perif)
        .input("id_marca", sql.Int, id_marca)
        .input("dsc_modelo", sql.VarChar, dsc_modelo)

        .execute("usp_portal_Insert_Modelos");

        console.log(result);
    
        res.status(200).json({
            message: 'Modelo guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un modelo');
    }

}



export const updateModelo = async (req, res) =>{
    const {id_modelo, id_perif, id_marca, dsc_modelo} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('id_modelo', sql.Int, id_modelo)
        .input('id_perif', sql.Int, id_perif)
        .input("id_marca", sql.Int, id_marca)
        .input("dsc_modelo", sql.VarChar, dsc_modelo)

        .execute("usp_portal_Update_Modelo");

        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar modelo');
    }
}