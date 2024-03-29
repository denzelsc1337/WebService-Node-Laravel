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



export const updatePeriferico = async (req, res) =>{
    const {id_perif, dsc_perif} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('id_perif', sql.Int, id_perif)
        .input('dsc_perif', sql.VarChar, dsc_perif)

        .execute("usp_portal_Update_Periferico");

        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar una localidad');
    }
}


export const bajaPeriferico = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_perif
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_perif", sql.Int, id_perif)
        .execute("usp_portal_baja_Periferico");

        console.log(result);
    
        res.status(200).json({
            message: 'estado de periferico actualizado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al dar de baja periferico '+error);
    }

}

export const getInfoPeriferico = async (req, res) =>{
    console.log(req.params);
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('id_perif', sql.Int, req.params.id_perif)
    .execute("usp_portal_Info_Periferico")

    if(result.rowsAffected[0] === 0){
        return res.status(400).json({
            message: "Periferico no encontrado"
        })
    }

    return res.json(result.recordset[0]);
    // console.log(result);
}