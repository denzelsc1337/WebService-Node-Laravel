import {getConnection, sql} from '../database/connection.js'


export const getPerifericos = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().query("select * from ma_perifericos");

    console.log(result);
    
    res.json(result.recordset);
}

export const insertPeriferico = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            dsc_periferico
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("dsc_periferico", sql.VarChar, dsc_periferico)

        .execute("usp_portal_Insert_Perifericos");

        console.log(result);
    
        res.status(200).json({
            message: 'Periferico guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un local');
    }

}