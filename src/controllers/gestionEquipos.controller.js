export const getEquipos = async (req, res) =>{
    const pool = await getConnection();

    const result = await pool.request()
    .execute("usp_portal_Listado_Inventario_Equipos");

    console.log(result);
    res.json(result.recordset);
}