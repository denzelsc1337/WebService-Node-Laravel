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


export const createSoftware = async (req, res) =>{

    const { 
        cod_cate_soft,
        cod_fabri_soft,
        dsc_version,
        lic
    } = req.body;

    console.log(req.body);
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("cod_cate_soft", sql.Int, cod_cate_soft)
        .input("cod_fabri_soft", sql.Int, cod_fabri_soft)
        .input("dsc_version", sql.NVarChar, dsc_version)
        .input("lic", sql.NVarChar, lic)

        .execute("usp_portal_insert_soft");

        console.log(result);

        res.status(200).json({
            message: 'Software creado',
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear software: ' + error.message);
    }

}



export const insertSoftware = async (req, res) =>{

    const { 
        // id_equipo,
        // id_soft,
        // fch_inst,
        // obs, 
        dsc_cadena

    } = req.body;

    console.log(req.body);
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        // .input("id_equipo", sql.Int, id_equipo)
        // .input("id_soft", sql.Int, id_soft)
        // .input("fch_inst", sql.NVarChar, fch_inst)
        .input("dsc_cadena", sql.VarChar, dsc_cadena)



        .execute("usp_portal_insert_soft_instalado");


        console.log(result);

        res.status(200).json({
            message: 'Software instalado',
            // id_usuario: result.recordset[0].id_usuario
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al instalar software');
    }

}


export const bajaSoftware = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            // id_soft,
            // id_equip
            dsc_cadena

        } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        // .input("id_soft", sql.Int, id_soft)
        // .input("id_equip", sql.Int, id_equip)
        .input("dsc_cadena", sql.VarChar, dsc_cadena)
        .execute("usp_portal_eliminar_soft");

        console.log(result);
    
        res.status(200).json({
            message: 'software desinstalado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al desinstalar software '+error);
    }

}


export const selectorCategSoft = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request()
    .query("SELECT * FROM ma_categoria_software");

    console.log(result);
    res.json(result.recordset);
}
