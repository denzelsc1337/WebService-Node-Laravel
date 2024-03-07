import {getConnection, sql} from '../database/connection.js'

export const getCategories = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request().execute("usp_webcli_node_Listar_Categorias");

    console.log(result);
    // res.send('obteniendo categorias');
    res.json(result.recordset);
}

// req.params.cat_id : es el parametro que establezco en mi ruta 
// router.get('/categorias/:cat_id'

export const getCategoryXID = async (req, res) =>{
    console.log(req.params);
    const pool = await getConnection();

    const result = await pool
    .request()
    .input('cat_id', sql.Int, req.params.cat_id)
    .execute("usp_webcli_node_Listar_CategoriasxID")

    if(result.rowsAffected[0] === 0){
        return res.status(400).json({
            message: "Categoria no encontrada"
        })
    }

    return res.json(result.recordset[0]);
    // console.log(result);
}

export const insertCategoria = async (req, res) =>{
    try {
        console.log(req.body);
        const { cat_id, cat_nom, cat_obs } = req.body;
    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("cat_id", sql.Int, cat_id)
        .input("cat_nom", sql.VarChar, cat_nom)
        .input("cat_obs", sql.VarChar, cat_obs)
    
        .execute("usp_webcli_node_Inserta_Categoria");

        console.log(result);
    
        res.json({
            last_categ: result.recordset[0].last_categ,
            cat_nom: req.body.cat_nom,
            cat_obs: req.body.cat_obs,
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear una categoria');
    }

}

export const updateCategoria = async (req, res) =>{
    // console.log(req.params);
    const {cat_id, cat_nom, cat_obs} = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input('cat_id', sql.Int, cat_id)
        .input('cat_nom', sql.VarChar, cat_nom)
        .input('cat_obs', sql.VarChar, cat_obs)

        .execute("usp_webcli_node_Actualizar_Categoria");

        console.log(result);

        res.status(200).json({
            message: 'Categoria Actualizada correctamente',
            cat_id: result.recordset[0].cat_id
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar una categoria');
    }
}
