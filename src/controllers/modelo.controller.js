import {getConnection, sql} from '../database/connection.js'

export const getModelos = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_portal_Listar_Modelos");

    console.log(result);
    
    res.json(result.recordset);
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