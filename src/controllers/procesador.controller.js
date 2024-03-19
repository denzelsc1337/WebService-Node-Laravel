import {getConnection, sql} from '../database/connection.js';

export const getProcesadores = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().query("select * from ma_procesador");

    console.log(result);
    
    res.json(result.recordset);
}


export const insertProcesador = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            dsc_procesador
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("dsc_procesador", sql.VarChar, dsc_procesador)

        .execute("usp_portal_Insert_Procesador");

        console.log(result);
    
        res.status(200).json({
            message: 'Procesador guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un local');
    }

}


export const getInfoProcesador = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_procesador', sql.Int, req.params.id_procesador)
        .query("SELECT * FROM ma_procesador WHERE id_procesador = @id_procesador")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Procesador no encontrado"
            })
        }
        return res.json(result.recordset[0]);
    } catch (error) {
        console.log(error);
    }

    // console.log(result);
}


export const updateProcesador = async (req, res) =>{
    const {id_procs, dsc_procs,flg_activo} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('id_procs', sql.Int, id_procs)
        .input('dsc_procs', sql.VarChar, dsc_procs)
        .input('flg_activo', sql.Char, flg_activo)

        .execute("usp_portal_Update_Procesador");

        console.log(result);

        res.status(200).json({
            message: 'Actualizado',
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar un procesador');
    }
}


export const bajaProcesador = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_procs
        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_procs", sql.Int, id_procs)
        .execute("usp_portal_baja_Procesador");

        console.log(result);
    
        res.status(200).json({
            message: 'estado de procesador actualizado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al dar de baja procesador '+error);
    }

}
