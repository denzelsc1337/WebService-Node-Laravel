import {getConnection, sql} from '../database/connection.js'

export const insertEquipoAsignacion = async (req, res) =>{
    try {
        console.log(req.body);
        const { 
            id_equipo,
            id_cliente,
            id_sucursal,
            id_usuario, 
            // fch_ini,
            // fch_fin,
            obs,
            id_tipo_asign
        } = req.body;

        // {
        //     "id_equipo":  1,
        //     "id_cliente": 1,
        //     "id_sucursal" : 1,
        //     "id_usuario" : 3,
        //     "fch_ini" : "10/03/2024",
        //     "fch_fin" : "26/03/2024", 
        //     "obs" : "test,
        //     "id_tipo_asign" : 1,
        // }
        
        
        // Función para convertir fecha de 'dd/mm/yyyy' a 'yyyy-mm-dd'
        function formatDate(dateString) {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month}-${day}`;
        }

        // Convertir fechas al formato esperado por SQL Server
        // const formatted_fch_ini = formatDate(fch_ini);
        // const formatted_fch_fin = formatDate(fch_fin);

    
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("id_equipo", sql.Int, id_equipo)
        .input("id_cliente", sql.Int, id_cliente)
        .input("id_sucursal", sql.Int, id_sucursal)
        .input("id_usuario", sql.Int, id_usuario)
        // .input("fch_ini", sql.Date, new Date(formatted_fch_ini))
        // .input("fch_fin", sql.Date, new Date(formatted_fch_fin))
        .input("obs", sql.VarChar, obs)
        .input("id_tipo_asign", sql.Int, id_tipo_asign)

        
        .execute("usp_portal_Insert_Asignar_Equipo");

        console.log(result);
    
        res.status(200).json({
            message: 'Guardado',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar equipo');
    }

}


export const getInfoEquipo = async (req, res) =>{
    try {
        console.log(req.params);
        const pool = await getConnection();
    
        const result = await pool
        .request()
        .input('id_equipo', sql.Int, req.params.id_equipo)
        .execute("usp_portal_Listar_Asignar_Equipo")
    
        if(result.rowsAffected[0] === 0){
            return res.status(400).json({
                message: "Asignaciones no encontradas"
            })
        }
        return res.json(result.recordset[0]);
    } catch (error) {
        console.log(error);
    }

    // console.log(result);
}