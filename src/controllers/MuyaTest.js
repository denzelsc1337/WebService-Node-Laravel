import { getConnection, sql } from "../database/connection.js";

export const ListarVacacionesProgramadas = async (req, res) => {
  try {
    const codTrabajador = "%";
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("cod_trabajador", sql.VarChar, codTrabajador)
      .execute("usp_webppm_Consultar_VacacionesProgramadas");

    if (result.rowsAffected[0] === 0) {
      return res.status(400).json({
        message: "Vacaciones no encontradas",
      });
    }
    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al encontrar los software " + error);
  }

  // console.log(result);
};
