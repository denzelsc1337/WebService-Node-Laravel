import sql from "mssql";

// const dbsettings = {
//   user: "sa_admin",
//   password: "643$$kqAS543",
//   server: "kunaqcontrolador.cgjpxdkt8txc.sa-east-1.rds.amazonaws.com",
//   database: "KQ-PortalClientes",
//   port: 3725,
//   options: {
//     trustedconnection: false,
//     enableArithAbort: true,
//     encrypt: false,
//     trustServerCertificate: false,
//   },
// };

const dbsettings = {
  user: "userclient",
  password: "asociados517",
  server: "192.141.42.144",
  database: "BDUS_CK000050_0213",
  // port: 3725,
  options: {
    trustedconnection: false,
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbsettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
};

export { sql };
