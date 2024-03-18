import {getConnection, sql} from '../database/connection.js'

export const getMarcas = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().query("SELECT * FROM ma_marcas");

    console.log(result);
    
    res.json(result.recordset);
}

export const getInfoMarca = async (req, res) =>{
    console.log(req.params);
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('id_marca', sql.Int, req.params.id_marca)
    .query("SELECT * FROM ma_marcas WHERE id_marca = '" + req.params.id_marca)

    if(result.rowsAffected[0] === 0){
        return res.status(400).json({
            message: "Marca no encontrada"
        })
    }

    return res.json(result.recordset[0]);
    // console.log(result);
}