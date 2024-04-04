import {getConnection, sql} from '../database/connection.js'



export const getSoftware = async (req, res) =>{
    try {
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .execute("usp_portal_lista_softs")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "softwares no encontradas"
            })
        }
        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al encontrar los software '+error);
    }

    // console.log(result);
}



export const getSoftInstalado = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_equipo', sql.Int, req.params.id_equipo)
        .execute("usp_portal_lista_soft_instalado")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Instalaciones no encontradas"
            })
        }
        res.json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al encontrar los instalaciones '+error);
    }

    // console.log(result);
}